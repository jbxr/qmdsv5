/**
 * Generates the component rules in `_adherence.oxlintrc.json` from the shipped
 * `.d.ts` files, so the lint config cannot drift from the types it enforces.
 *
 *   node scripts/build-adherence.mjs           rewrite the config
 *   node scripts/build-adherence.mjs --check   fail if the config is stale
 *
 * Two rules decide what a component gets, and they are the whole point:
 *
 *   - A props interface that reaches a DOM attributes interface forwards the
 *     native surface, so it gets NO prop-name allowlist. Any enumerated list
 *     would reject `maxLength`, `aria-*` and every `data-*` — the false
 *     positives that closed allowlists produced for `TextField` before this
 *     generator existed.
 *   - A props interface with no such base is closed, so its own members become
 *     the allowlist.
 *
 * Either way, every prop whose resolved type is a union of string literals gets
 * a value regex. Resolution goes through the type checker, so a union behind a
 * type alias (`Icon.name: QMIconName`) is enumerated like an inline one, and a
 * prop redeclared over an `Omit`ed DOM member (`TextField.size`, `BeatCard.title`)
 * is read as the component's own rather than as the native attribute.
 *
 * It also owns two things it did not use to:
 *
 *   - `x-omelette.tokenKinds`, but only where the declared kind is impossible for
 *     the value in `tokens/*.css`. See `correctTokenKinds`.
 *   - The diagnosis when the external Design app has rewritten this file. The
 *     app regenerates it alongside the bundle and its version reverts #16 and
 *     #11, so `--check` names that cause instead of printing a bare diff (#25).
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONFIG = path.join(ROOT, '_adherence.oxlintrc.json');

/** Props the JSX surface always allows, whatever the interface declares. */
const ALWAYS_ALLOWED = ['key', 'ref', 'className', 'style', 'children'];

/** Presence of either marks a type as carrying React's native attribute surface. */
const NATIVE_MARKERS = ['aria-label', 'dangerouslySetInnerHTML'];

/* ---------------------------------------------------------------- program -- */

function collectDeclarationFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectDeclarationFiles(full));
    else if (entry.name.endsWith('.d.ts')) out.push(full);
  }
  return out.sort();
}

function createProgram(files) {
  const configPath = path.join(ROOT, 'tsconfig.json');
  const read = ts.readConfigFile(configPath, ts.sys.readFile);
  if (read.error) throw new Error(ts.flattenDiagnosticMessageText(read.error.messageText, '\n'));
  const parsed = ts.parseJsonConfigFileContent(read.config, ts.sys, ROOT);
  return ts.createProgram(files, { ...parsed.options, noEmit: true });
}

/* ------------------------------------------------------------- discovery -- */

/** `export declare function Foo(props: FooProps)` / `export declare const Foo: ForwardRefExoticComponent<FooProps & …>`. */
function findComponents(sourceFile, checker) {
  const found = [];

  const propsInterfaceOf = (typeNode) => {
    if (!typeNode || !ts.isTypeReferenceNode(typeNode)) return undefined;
    const symbol = checker.getSymbolAtLocation(typeNode.typeName);
    const target = symbol && (symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol);
    return target?.declarations?.find(ts.isInterfaceDeclaration);
  };

  for (const statement of sourceFile.statements) {
    const exported = ts.getCombinedModifierFlags(statement).valueOf() & ts.ModifierFlags.Export
      || statement.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
    if (!exported) continue;

    if (ts.isFunctionDeclaration(statement) && statement.name) {
      const decl = propsInterfaceOf(statement.parameters[0]?.type);
      if (decl) found.push({ name: statement.name.text, decl });
      continue;
    }

    if (ts.isVariableStatement(statement)) {
      for (const variable of statement.declarationList.declarations) {
        if (!ts.isIdentifier(variable.name) || !variable.type) continue;
        // ForwardRefExoticComponent<XProps & React.RefAttributes<…>>
        if (!ts.isTypeReferenceNode(variable.type)) continue;
        const [first] = variable.type.typeArguments ?? [];
        if (!first || !ts.isIntersectionTypeNode(first)) continue;
        for (const member of first.types) {
          const decl = propsInterfaceOf(member);
          if (decl) { found.push({ name: variable.name.text, decl }); break; }
        }
      }
    }
  }
  return found;
}

/* ------------------------------------------------------------ inspection -- */

const hasNativeSurface = (type) => NATIVE_MARKERS.some((p) => type.getProperty(p) !== undefined);

/** The union members of a string-literal union, or undefined for anything else. */
function stringLiteralUnion(type) {
  const parts = (type.isUnion() ? type.types : [type])
    .filter((t) => !(t.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null)));
  if (parts.length < 2 || !parts.every((t) => t.isStringLiteral())) return undefined;
  return parts.map((t) => t.value);
}

/** Whether a member's own annotation is written as a union of string literals. */
function declaredAsStringLiteralUnion(typeNode) {
  return !!typeNode && ts.isUnionTypeNode(typeNode) && typeNode.types.every((t) =>
    ts.isLiteralTypeNode(t) && ts.isStringLiteral(t.literal));
}

/**
 * The union's members in the order they are written, following one level of type
 * alias (`Icon.name: QMIconName`). The checker orders a union by internal type id,
 * which is stable but arbitrary; the message has to read like the `.d.ts`.
 */
function writtenOrder(typeNode, checker) {
  if (!typeNode) return undefined;
  if (ts.isParenthesizedTypeNode(typeNode)) return writtenOrder(typeNode.type, checker);
  if (ts.isLiteralTypeNode(typeNode)) {
    return ts.isStringLiteral(typeNode.literal) ? [typeNode.literal.text] : undefined;
  }
  if (ts.isUnionTypeNode(typeNode)) {
    const parts = typeNode.types.map((t) => writtenOrder(t, checker));
    return parts.some((p) => p === undefined) ? undefined : parts.flat();
  }
  if (ts.isTypeReferenceNode(typeNode)) {
    const symbol = checker.getSymbolAtLocation(typeNode.typeName);
    const target = symbol && (symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol);
    const alias = target?.declarations?.find(ts.isTypeAliasDeclaration);
    return alias ? writtenOrder(alias.type, checker) : undefined;
  }
  return undefined;
}

const sameMembers = (a, b) => a.length === b.length && [...a].sort().every((v, i) => v === [...b].sort()[i]);

function inspect(component, checker) {
  const { name, decl } = component;
  const propsType = checker.getTypeAtLocation(decl);
  const forwardsNative = hasNativeSurface(propsType);

  const props = [];
  for (const member of decl.members) {
    if (!ts.isPropertySignature(member) || !member.name) continue;
    const propName = ts.isIdentifier(member.name) || ts.isStringLiteral(member.name)
      ? member.name.text
      : undefined;
    if (!propName) continue;

    // Read the prop off the *resolved* props type, not off the annotation, so an
    // `Omit`ed-and-redeclared DOM member resolves to the component's own type.
    const symbol = propsType.getProperty(propName);
    const resolved = symbol
      ? checker.getTypeOfSymbolAtLocation(symbol, member)
      : checker.getTypeFromTypeNode(member.type);
    let values = stringLiteralUnion(resolved);

    // Membership comes from the checker, so an `Omit`ed base member cannot leak
    // in; the order comes from the source, so the message reads like the `.d.ts`.
    if (values) {
      const written = writtenOrder(member.type, checker);
      if (written && sameMembers(written, values)) values = written;
    }

    if (!values && declaredAsStringLiteralUnion(member.type)) {
      throw new Error(
        `${name}.${propName} is written as a union of string literals but resolves to ` +
        `${checker.typeToString(resolved)}. A base member of the same name is widening it — ` +
        `Omit it from the DOM interface so the prop is read as the component's own.`);
    }
    props.push({ name: propName, values });
  }

  return { name, forwardsNative, props };
}

/* --------------------------------------------------------------- emission -- */

const escapeForRegex = (value) => value.replace(/[.*+?^${}()|[\]\\/-]/g, '\\$&');
const quoteList = (values) => values.map((v) => `'${v}'`).join(' | ');

function rulesFor(component) {
  const { name, forwardsNative, props } = component;
  const entries = [];

  if (!forwardsNative) {
    const declared = props.map((p) => p.name);
    const allowed = [...declared, ...ALWAYS_ALLOWED.filter((p) => !declared.includes(p))];
    entries.push({
      selector: `JSXOpeningElement[name.name='${name}'] > JSXAttribute > ` +
        `JSXIdentifier[name!=/^(?:${allowed.map(escapeForRegex).join('|')})$/]`,
      message: `<${name}> doesn't accept that prop. Declared props: ${declared.join(', ')}.`,
    });
  }

  for (const prop of props) {
    if (!prop.values) continue;
    entries.push({
      selector: `JSXOpeningElement[name.name='${name}'] > JSXAttribute[name.name='${prop.name}'] > ` +
        `Literal[value!=/^(?:${prop.values.map(escapeForRegex).join('|')})$/]`,
      message: `<${name}> ${prop.name} must be one of ${quoteList(prop.values)}.`,
    });
  }

  return entries;
}

/* ----------------------------------------------------------- token kinds -- */

/**
 * `x-omelette.tokenKinds` labels every custom property color / font / spacing /
 * radius / shadow / other. The labels are a *role*, not a type: `--qm-text-1` is
 * a hex colour filed under `font` because it is the colour text is set in, and
 * re-deriving kinds from values would flatten that distinction across 76 tokens.
 *
 * So this does not derive the kind. It only rejects the ones the value makes
 * impossible — a two-layer box-shadow cannot be a `color` however it is meant —
 * and rewrites those. Every other entry is left exactly as it was found.
 *
 * `--focus-ring` is the case that prompted it: it aliases `--qm-focus-ring`,
 * which is a shadow, and after #21 a two-layer one.
 */

const TOKEN_DECLARATION = /(--[\w-]+)\s*:\s*([^;}]+)/g;

/** Every custom property in `tokens/*.css`, later declarations winning. */
function readTokens() {
  const dir = path.join(ROOT, 'tokens');
  const values = new Map();
  for (const file of fs.readdirSync(dir).sort()) {
    if (!file.endsWith('.css')) continue;
    const css = fs.readFileSync(path.join(dir, file), 'utf8').replace(/\/\*[\s\S]*?\*\//g, ' ');
    for (const [, name, value] of css.matchAll(TOKEN_DECLARATION)) values.set(name, value.trim());
  }
  return values;
}

/** Follows `var(--other)` to the literal the token really carries. */
function resolve(name, values, seen = new Set()) {
  const value = values.get(name);
  if (value === undefined || seen.has(name)) return value;
  const alias = value.match(/^var\(\s*(--[\w-]+)\s*\)$/);
  return alias ? resolve(alias[1], values, seen.add(name)) : value;
}

/** Splits on commas that are not inside `rgba(…)` / `cubic-bezier(…)`. */
function splitLayers(value) {
  const layers = [];
  let depth = 0, current = '';
  for (const char of value) {
    if (char === '(') depth++;
    else if (char === ')') depth--;
    if (char === ',' && depth === 0) { layers.push(current); current = ''; } else current += char;
  }
  return [...layers, current].map((layer) => layer.trim()).filter(Boolean);
}

const isColor = (v) => /^#[0-9a-f]{3,8}$/i.test(v) || /^(?:rgba?|hsla?)\(/i.test(v)
  || /gradient\(/i.test(v) || v === 'transparent' || v === 'currentColor';
const isLength = (v) => /^-?(?:\d*\.)?\d+(?:px|rem|em|%|vh|vw|ch|ex)$/i.test(v) || v === '0';
const isNumber = (v) => /^-?(?:\d*\.)?\d+$/.test(v);
const allLengths = (v) => splitLayers(v).every((l) => l.split(/\s+/).every(isLength));

/** `0 0 0 1px rgba(…)`, `inset 2px 0 0 rgba(…)` — offsets plus a colour. */
const isShadow = (v) => splitLayers(v).every((layer) => {
  const parts = layer.split(/\s+/).filter(Boolean);
  return parts.filter(isLength).length >= 2 && (parts.some(isColor) || parts.includes('inset'));
});

/** Whether a value could plausibly carry the role the kind names. */
const ADMITS = {
  color: (v) => isColor(v),
  // A colour (text ink), a size, a weight, or a family list.
  font: (v) => isColor(v) || allLengths(v) || isNumber(v) || /[a-z]/i.test(v),
  spacing: (v) => allLengths(v) || isNumber(v),
  radius: (v) => allLengths(v) || isNumber(v),
  shadow: (v) => isShadow(v),
  other: () => true,
};

/** What the value can only be, used when the declared kind is impossible. */
function kindOf(value) {
  if (isShadow(value)) return 'shadow';
  if (isColor(value)) return 'color';
  if (allLengths(value)) return 'spacing';
  return 'other';
}

function correctTokenKinds(kinds) {
  const values = readTokens();
  const corrections = [];
  for (const [name, declared] of Object.entries(kinds ?? {})) {
    const value = resolve(name, values);
    if (value === undefined) continue;
    const admits = ADMITS[declared];
    if (!admits || admits(value)) continue;
    const corrected = kindOf(value);
    if (corrected === declared) continue;
    kinds[name] = corrected;
    corrections.push({ name, declared, corrected, value });
  }
  return corrections;
}

/* ------------------------------------------------------ the app's version -- */

/**
 * The Design app writes this file too, whenever the bundle is regenerated, and
 * its version reintroduces the closed prop allowlists that #11 removed and drops
 * the `Icon.name` value rule that was the whole of #16. Both are visible in the
 * committed config, so a stale check can say which generator wrote it rather
 * than only that the two disagree.
 */
function looksAppWritten(config) {
  const rules = config.rules?.['no-restricted-syntax'] ?? [];
  const selectors = rules.filter((r) => typeof r === 'object' && typeof r.selector === 'string');
  const closed = selectors.filter((r) => /JSXIdentifier\[name!=/.test(r.selector)).length;
  const iconName = selectors.some((r) =>
    /name\.name='Icon'/.test(r.selector) && /JSXAttribute\[name\.name='name'\]/.test(r.selector));
  return { closed, iconName, matches: closed > 0 && !iconName };
}

/* ------------------------------------------------------------------ main -- */

const files = collectDeclarationFiles(path.join(ROOT, 'components'));
const program = createProgram(files);
const checker = program.getTypeChecker();

const components = [];
for (const file of files) {
  const sourceFile = program.getSourceFile(file);
  if (!sourceFile) throw new Error(`${file} is not in the program`);
  for (const component of findComponents(sourceFile, checker)) {
    components.push(inspect(component, checker));
  }
}
components.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

const generated = components.flatMap(rulesFor);

const config = JSON.parse(fs.readFileSync(CONFIG, 'utf8'));
const existing = config.rules['no-restricted-syntax'];
// Everything that is not a per-component JSX rule is hand-maintained and kept.
const kept = existing.filter((entry) => typeof entry === 'string' || !entry.selector.startsWith('JSXOpeningElement['));
config.rules['no-restricted-syntax'] = [...kept, ...generated];

// The x-omelette registry is what the tooling recommends from, so a component
// with rules but no entry here is invisible to it. Add every component we
// found, preserving any data an existing entry carries. Entries we do not
// recognise are left alone: this file is also rewritten by the Design app's
// self-check, which owns names we never see (see #25).
const registry = (config['x-omelette'] ??= {}).components ??= {};
const added = [];
for (const { name } of components) {
  if (!registry[name]) { registry[name] = { replaces: [] }; added.push(name); }
}
config['x-omelette'].components = Object.fromEntries(
  Object.entries(registry).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)));

const corrections = correctTokenKinds(config['x-omelette'].tokenKinds);

const next = JSON.stringify(config, null, 2);
const current = fs.readFileSync(CONFIG, 'utf8');

/** Names the Design app when its fingerprint is on the file we are replacing. */
function diagnose() {
  const { closed, iconName, matches } = looksAppWritten(JSON.parse(current));
  if (!matches) return;
  console.error(
    `\nThe Design app wrote this file. It regenerates _adherence.oxlintrc.json alongside\n` +
    `_ds_bundle.js, and its version is not this repo's: ${closed} closed prop allowlist(s) are back\n` +
    `${iconName ? '' : 'and the Icon.name value rule is gone\n'}` +
    `— reverting #11 and #16. Nothing is wrong with your change.\n\n` +
    `  Fix: run \`npm run adherence:build\` and commit the result.\n\n` +
    `Run it after every bundle download; the app does not know that a component extending a\n` +
    `DOM attributes interface must not get an enumerated prop allowlist.`);
}

if (process.argv.includes('--check')) {
  if (next !== current) {
    console.error('_adherence.oxlintrc.json is stale. Run `npm run adherence:build` and commit the result.');
    diagnose();
    process.exit(1);
  }
  console.log(`_adherence.oxlintrc.json is up to date (${components.length} components, ${generated.length} rules).`);
} else {
  if (next !== current) diagnose();
  fs.writeFileSync(CONFIG, next);
  const open = components.filter((c) => c.forwardsNative).length;
  console.log(
    `${components.length} components → ${generated.length} rules ` +
    `(${open} forward the native surface and take no allowlist, ${components.length - open} are closed).`);
  if (added.length) console.log(`x-omelette: registered ${added.join(', ')}.`);
  for (const { name, declared, corrected, value } of corrections) {
    console.log(`tokenKinds: ${name} ${declared} → ${corrected} (${value})`);
  }
}

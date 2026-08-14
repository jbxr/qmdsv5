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

const next = JSON.stringify(config, null, 2);
const current = fs.readFileSync(CONFIG, 'utf8');

if (process.argv.includes('--check')) {
  if (next !== current) {
    console.error('_adherence.oxlintrc.json is stale. Run `npm run adherence:build` and commit the result.');
    process.exit(1);
  }
  console.log(`_adherence.oxlintrc.json is up to date (${components.length} components, ${generated.length} rules).`);
} else {
  fs.writeFileSync(CONFIG, next);
  const open = components.filter((c) => c.forwardsNative).length;
  console.log(
    `${components.length} components → ${generated.length} rules ` +
    `(${open} forward the native surface and take no allowlist, ${components.length - open} are closed).`);
}

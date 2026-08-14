/**
 * Generates `_ds_bundle.js` and `_ds_manifest.json` from the sources in this
 * repo, so the gallery cards and the UI kits render the components as they are
 * written rather than as some earlier download left them.
 *
 *   node scripts/build-bundle.mjs           rewrite both artifacts
 *   node scripts/build-bundle.mjs --check   fail if either is stale
 *
 * Both files used to arrive from the external Design app. That cost us three
 * releases in a row: a component PR could not show its own fix, because every
 * `*.card.html` and every kit reads the compiled bundle, not the `.jsx`. It also
 * cost us #25, when a download rewrote `_adherence.oxlintrc.json` on its way past.
 * `components/**` is the source of truth now; these two files are its output.
 *
 * The bundle format is not ours to choose — the cards, the kits and the app all
 * read the same global — so this script reproduces it exactly:
 *
 *   - every `.js`/`.jsx` under `components/` and `ui_kits/`, in path order, each
 *     compiled by Babel's classic JSX runtime and wrapped in its own try/catch so
 *     one broken file cannot take the namespace down with it;
 *   - `import React from 'react'` dropped, because the cards load React as a UMD
 *     global, and cross-component imports rewritten to the shared `__ds_scope`;
 *   - every export republished onto `window.<namespace>` at the end.
 *
 * `sourceHashes` covers the exact inputs, so a stale bundle is detectable without
 * recompiling. `--check` regenerates into memory and diffs.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import * as babel from '@babel/core';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BUNDLE = path.join(ROOT, '_ds_bundle.js');
const MANIFEST = path.join(ROOT, '_ds_manifest.json');

/** Read by every card and every kit. Changing it orphans all of them. */
const NAMESPACE = 'QuantumMateriaDesignSystem_488cde';
const FORMAT = 4;

/** Roots whose `.js`/`.jsx` compile into the bundle, in this order. */
const SOURCE_ROOTS = ['components', 'ui_kits'];

/* ----------------------------------------------------------------- inputs -- */

function collectSources() {
  const out = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
      const rel = `${dir}/${entry.name}`;
      if (entry.isDirectory()) walk(rel);
      else if (/\.jsx?$/.test(entry.name)) out.push(rel);
    }
  };
  for (const root of SOURCE_ROOTS) walk(root);
  return out.sort();
}

const sha12 = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex').slice(0, 12);

/* -------------------------------------------------------------- compiling -- */

/**
 * Strips the module surface the bundle has no loader for. `react` is a global,
 * a sibling component is a `__ds_scope` member, and an export is a name we
 * collect here and republish once every file has run.
 */
function dsModulePlugin(exportedNames) {
  return {
    visitor: {
      Program: {
        enter(programPath) {
          const t = babel.types;
          const imports = programPath.get('body').filter((s) => s.isImportDeclaration());
          for (const decl of imports) {
            if (decl.node.source.value !== 'react') {
              for (const spec of decl.node.specifiers) {
                const local = spec.local.name;
                const imported = spec.imported ? spec.imported.name : local;
                const binding = programPath.scope.getBinding(local);
                for (const ref of binding ? binding.referencePaths : []) {
                  // Runs before the JSX transform, so `<Icon/>` is still a JSX
                  // name and has to stay one; anything else is an expression.
                  ref.replaceWith(ref.isJSXIdentifier()
                    ? t.jsxMemberExpression(t.jsxIdentifier('__ds_scope'), t.jsxIdentifier(imported))
                    : t.memberExpression(t.identifier('__ds_scope'), t.identifier(imported)));
                }
              }
            }
            decl.remove();
          }

          for (const stmt of programPath.get('body')) {
            if (!stmt.isExportNamedDeclaration() || !stmt.node.declaration) continue;
            const decl = stmt.node.declaration;
            if (decl.type === 'FunctionDeclaration' || decl.type === 'ClassDeclaration') {
              exportedNames.push(decl.id.name);
            } else if (decl.type === 'VariableDeclaration') {
              for (const d of decl.declarations) exportedNames.push(d.id.name);
            }
            stmt.replaceWith(decl);
          }
        },
      },
    },
  };
}

function compile(rel, source) {
  const exportedNames = [];
  const { code } = babel.transformSync(source, {
    babelrc: false,
    configFile: false,
    sourceType: 'module',
    filename: path.basename(rel),
    presets: [['@babel/preset-react', { runtime: 'classic' }]],
    plugins: [() => dsModulePlugin(exportedNames)],
  });
  return { code, exportedNames };
}

/* --------------------------------------------------------------- emitting -- */

function buildBundle(sources) {
  const components = [];
  const sourceHashes = {};
  const blocks = [];

  for (const rel of sources) {
    const bytes = fs.readFileSync(path.join(ROOT, rel));
    sourceHashes[rel] = sha12(bytes);

    const { code, exportedNames } = compile(rel, bytes.toString('utf8'));
    for (const name of exportedNames) components.push({ name, sourcePath: rel });

    blocks.push(`// ${rel}`);
    blocks.push('try { (() => {');
    blocks.push(code);
    if (exportedNames.length) {
      blocks.push(`Object.assign(__ds_scope, { ${exportedNames.join(', ')} });`);
    }
    blocks.push(
      `})(); } catch (e) { __ds_ns.__errors.push({ path: ${JSON.stringify(rel)}, ` +
      `error: String((e && e.message) || e) }); }`);
    blocks.push('');
  }

  const meta = {
    format: FORMAT,
    namespace: NAMESPACE,
    components,
    sourceHashes,
    inlinedExternals: [],
    unexposedExports: [],
  };

  const lines = [
    `/* @ds-bundle: ${JSON.stringify(meta)} */`,
    '',
    '(() => {',
    '',
    `const __ds_ns = (window.${NAMESPACE} = window.${NAMESPACE} || {});`,
    '',
    'const __ds_scope = {};',
    '',
    '(__ds_ns.__errors = __ds_ns.__errors || []);',
    '',
    ...blocks,
  ];
  for (const { name } of components) {
    lines.push(`__ds_ns.${name} = __ds_scope.${name};`, '');
  }
  lines.push('})();', '');

  return { text: lines.join('\n'), components, sourceHashes };
}

/* --------------------------------------------------------------- manifest -- */

/** Directories the gallery never reads, so nothing inside them is an input. */
const SKIP_DIRS = new Set(['node_modules', '.git', '.github', 'uploads', '.memsearch', '.serena']);

/** Both markers are HTML comments; neither is required to be on the first line. */
const CARD_MARKER = /<!--\s*@dsCard\b([^>]*?)-->/;
const TEMPLATE_MARKER = /<!--\s*@template\b([^>]*?)-->/;

const attr = (text, name) => text.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];

function findHtml(dir, out = []) {
  for (const entry of fs.readdirSync(path.join(ROOT, dir || '.'), { withFileTypes: true })) {
    if (entry.name.startsWith('.') || SKIP_DIRS.has(entry.name)) continue;
    const rel = dir ? `${dir}/${entry.name}` : entry.name;
    if (entry.isDirectory()) findHtml(rel, out);
    else if (entry.name.endsWith('.html')) out.push(rel);
  }
  return out.sort();
}

/**
 * The gallery renders a card in exactly the declared box, so `viewport` stays the
 * string the page wrote. Cards group in the gallery before they order within a
 * group, and that is the order here.
 */
function collectCards(pages) {
  const cards = [];
  for (const rel of pages) {
    const found = fs.readFileSync(path.join(ROOT, rel), 'utf8').match(CARD_MARKER);
    if (!found) continue;
    const [, text] = found;
    cards.push({
      path: rel,
      group: attr(text, 'group'),
      viewport: attr(text, 'viewport'),
      subtitle: attr(text, 'subtitle'),
      name: attr(text, 'name'),
    });
  }
  return cards.sort((a, b) =>
    a.group < b.group ? -1 : a.group > b.group ? 1 : a.path < b.path ? -1 : 1);
}

function collectTemplates(pages) {
  const templates = [];
  for (const rel of pages) {
    if (!rel.startsWith('templates/')) continue;
    const found = fs.readFileSync(path.join(ROOT, rel), 'utf8').match(TEMPLATE_MARKER);
    if (!found) continue;
    const folder = path.posix.dirname(rel);
    const entry = {
      name: attr(found[1], 'name'),
      description: attr(found[1], 'description'),
      folder,
      entryPath: rel,
    };
    if (fs.existsSync(path.join(ROOT, folder, '.thumbnail'))) {
      entry.thumbnail = { path: `${folder}/.thumbnail`, kind: 'captured' };
    }
    templates.push(entry);
  }
  return templates;
}

/**
 * `styles.css` is the only stylesheet consumers link and it is `@import` lines
 * only, so its import order — not the alphabet a directory listing would give —
 * is cascade order, and the sheet itself comes last.
 */
function globalCssPaths() {
  const entry = 'styles.css';
  const text = fs.readFileSync(path.join(ROOT, entry), 'utf8');
  const imported = [...text.matchAll(/@import\s+url\(["']([^"')]+)["']\)/g)]
    .map((m) => m[1])
    .filter((href) => !/^[a-z]+:/i.test(href));
  return [...imported, entry];
}

/** Top-level rule blocks, in source order. At-rules are stepped over: nothing
 *  inside `@media` or `@keyframes` is a token the cascade exposes at rest. */
function* ruleBlocks(css) {
  let depth = 0, selectorStart = 0, bodyStart = 0, selector = '';
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    // A statement at-rule — `@import url(…);` — ends a selector rather than
    // opening a block, and `tokens/fonts.css` opens with one.
    if (c === ';' && depth === 0) selectorStart = i + 1;
    else if (c === '{') {
      if (depth === 0) { selector = stripComments(css.slice(selectorStart, i)).trim(); bodyStart = i + 1; }
      depth++;
    } else if (c === '}') {
      depth--;
      if (depth === 0) {
        if (!selector.startsWith('@')) yield { selector, body: css.slice(bodyStart, i) };
        selectorStart = i + 1;
      }
    }
  }
}

const stripComments = (text) => text.replace(/\/\*[\s\S]*?\*\//g, '');

/**
 * Collapses every comment to either nothing or a bare `@kind` marker, so the
 * scanners below can split on `;` and `{}` without a prose comment doing it for
 * them. `tokens/elevation.css` carries a sentence with a semicolon in it, one
 * line above `--qm-focus-ring`, and that ate the token before this existed.
 */
const normalizeComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, (comment) => {
  const kind = comment.match(/@kind\s+([\w-]+)/)?.[1];
  return kind ? `/*@kind ${kind}*/` : '';
});

/**
 * Every custom property the sheets declare, including the unprefixed semantic
 * aliases — the manifest is an inventory, not a `--qm-*` filter. A property
 * redeclared under a density scope is a separate entry: same name, real
 * different value.
 */
function collectTokens(cssPaths) {
  const tokens = [];
  for (const rel of cssPaths) {
    const css = normalizeComments(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
    for (const { selector, body } of ruleBlocks(css)) {
      const root = selector.split(',').some((s) => s.trim().startsWith(':root'));
      let previous = null;
      for (const raw of body.split(';')) {
        // `/* @kind x */` trails the declaration it describes, and the sheets put
        // it on either side of that declaration's semicolon — so one chunk can
        // carry the previous token's marker and its own. Position decides: before
        // this chunk's `--name:` it belongs to the token before it, after it to this one.
        const declaration = stripComments(raw).trim();
        const start = declaration.startsWith('--') ? raw.indexOf('--') : Infinity;
        let own;
        for (const marker of raw.matchAll(/\/\*\s*@kind\s+([\w-]+)\s*\*\//g)) {
          if (marker.index > start) own = marker[1];
          else if (previous) previous.annotation = marker[1];
        }

        if (!declaration.startsWith('--')) continue;
        const colon = declaration.indexOf(':');
        const token = {
          name: declaration.slice(0, colon).trim(),
          value: declaration.slice(colon + 1).trim(),
          definedIn: rel,
        };
        if (!root) token.scope = selector;
        if (own) token.annotation = own;
        tokens.push(token);
        previous = token;
      }
    }
  }
  // Rebuilt rather than mutated in place: an annotation can land on a token that
  // is already pushed, and the emitted key order is fixed.
  return tokens.map(({ name, value, definedIn, scope, annotation }) => ({
    name,
    value,
    kind: annotation ?? inferKind(name, value),
    definedIn,
    ...(scope ? { scope } : {}),
    ...(annotation ? { annotation } : {}),
  }));
}

/**
 * What a token is for, when it does not say. The name wins over the value for the
 * two families where the value is ambiguous on its own — `--qm-text-1` is a colour
 * literal but a type token, `--qm-radius-round` is a percentage but a radius — and
 * the value decides the rest. Anything genuinely unguessable — durations, easings,
 * `display` values — carries an explicit `@kind` annotation in the sheet, which is
 * why this never has to reach for `other`.
 *
 * Fitted, not documented: it reproduces all 285 unannotated kinds the Design app
 * last emitted. If a new token lands in a shape none of these branches read
 * correctly, annotate it in the sheet rather than bending a rule here.
 */
function inferKind(name, value) {
  if (/radius|corner/.test(name)) return 'radius';
  if (/font|text|type|weight/.test(name)) return 'font';
  // A shadow is a length list that ends in a colour. `inset ...` fails the
  // leading-digit test on purpose: it is a fill, not an elevation.
  if (/^-?\d/.test(value) && /#[0-9a-fA-F]{3,8}|rgba?\(/.test(value)) return 'shadow';
  if (/^(#[0-9a-fA-F]{3,8}|rgba?\(|hsla?\(|color\(|(linear|radial|conic)-gradient\(|var\()/.test(value)) return 'color';
  if (/-?[\d.]+(px|rem|em|%|vh|vw|ch)\b/.test(value)) return 'spacing';
  return 'color';
}

/** Distinct non-root scopes, in the order the sheets introduce them. */
function collectThemes(tokens) {
  const seen = new Map();
  for (const { scope } of tokens) {
    if (!scope || seen.has(scope)) continue;
    const words = scope.replace(/[[\]"']/g, '').replace(/^data-/, '').split(/[-=]/);
    seen.set(scope, words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
  }
  return [...seen].map(([selector, label]) => ({ selector, label }));
}

/** Families a token names, so a missing one is visible as a token rather than as
 *  a rendering nobody looked at. */
function collectBrandFonts(tokens) {
  const families = new Map();
  for (const { name, value, kind, definedIn } of tokens) {
    if (kind !== 'font') continue;
    const family = value.match(/^\s*['"]([^'"]+)['"]/)?.[1];
    if (!family) continue;
    if (!families.has(family)) families.set(family, { family, status: 'ok', tokens: [], path: definedIn });
    families.get(family).tokens.push(name);
  }
  return [...families.values()];
}

/** Self-hosted families. QM declares none — the three brand families arrive over
 *  a Google Fonts `@import` — so this is empty until woff2 binaries land. */
function collectFontFaces(cssPaths) {
  const fonts = [];
  for (const rel of cssPaths) {
    const css = normalizeComments(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
    for (const [, body] of css.matchAll(/@font-face\s*\{([^}]*)\}/g)) {
      const family = body.match(/font-family\s*:\s*['"]?([^;'"]+)['"]?/)?.[1]?.trim();
      if (family) fonts.push({ family, path: rel });
    }
  }
  return fonts;
}

function buildManifest(components) {
  const pages = findHtml('');
  const cssPaths = globalCssPaths();
  const tokens = collectTokens(cssPaths);
  return {
    namespace: NAMESPACE,
    components,
    startingPoints: [],
    cards: collectCards(pages),
    templates: collectTemplates(pages),
    hasThumbnailHtml: fs.existsSync(path.join(ROOT, 'thumbnail.html')),
    globalCssPaths: cssPaths,
    tokens,
    themes: collectThemes(tokens),
    fonts: collectFontFaces(cssPaths),
    brandFonts: collectBrandFonts(tokens),
    source: 'spa',
  };
}

/* ----------------------------------------------------------------- output -- */

const sources = collectSources();
const bundle = buildBundle(sources);
const manifest = buildManifest(bundle.components);

const artifacts = [
  { file: BUNDLE, label: '_ds_bundle.js', next: bundle.text },
  // One line, no trailing newline: the gallery reads it, nobody diffs it by eye.
  { file: MANIFEST, label: '_ds_manifest.json', next: JSON.stringify(manifest) },
];

const stale = artifacts.filter(({ file, next }) => {
  const current = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
  return current !== next;
});

if (process.argv.includes('--check')) {
  if (stale.length) {
    console.error(
      `\n${stale.map((a) => a.label).join(' and ')} ${stale.length > 1 ? 'are' : 'is'} stale.\n\n` +
      `  Fix: run \`npm run bundle:build\` and commit the result.\n`);
    if (stale.some((a) => a.file === BUNDLE)) {
      console.error(
        `_ds_bundle.js no longer matches components/** or ui_kits/**. Every *.card.html and\n` +
        `every UI kit renders from the bundle, never from the .jsx, so this is the gallery\n` +
        `showing code that is not in this repo — the failure that hid three releases of fixes.\n`);
    }
    if (stale.some((a) => a.file === MANIFEST)) {
      console.error(
        `_ds_manifest.json no longer matches the cards, the templates or tokens/*.css. It\n` +
        `carries its own copy of every @dsCard viewport, so a corrected height stays wrong\n` +
        `in the gallery until this is regenerated.\n`);
    }
    process.exit(1);
  }
  console.log(
    `_ds_bundle.js and _ds_manifest.json are up to date ` +
    `(${bundle.components.length} exports from ${sources.length} sources, ` +
    `${manifest.cards.length} cards, ${manifest.tokens.length} tokens).`);
} else {
  for (const { file, next } of artifacts) fs.writeFileSync(file, next);
  console.log(
    `${sources.length} sources → ${bundle.components.length} exports on ` +
    `window.${NAMESPACE}.`);
  console.log(
    `${manifest.cards.length} cards, ${manifest.templates.length} template(s), ` +
    `${manifest.tokens.length} tokens across ${manifest.globalCssPaths.length} stylesheets, ` +
    `${manifest.themes.length} theme scope(s).`);
}

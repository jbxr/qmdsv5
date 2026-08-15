/*
 * `process` is read here and nowhere else, and never as a bare `process.env`.
 * These files are consumed three ways: as `.jsx` by a consumer's bundler, which
 * substitutes the literal below and folds the branch away; as `_ds_bundle.js` by
 * the gallery cards, where `process` does not exist and reading it is a
 * ReferenceError that takes the whole card down; and by Node. Only the
 * try/catch answers all three. `typeof process === 'undefined'` survives the
 * card but not the bundler: a build that defines `process.env.NODE_ENV` alone
 * leaves `process` itself undefined at runtime, and production keeps warning.
 */
let DEV = true;
try { if (process.env.NODE_ENV === 'production') DEV = false; } catch (e) { /* a card: no `process` */ }

/** One entry per (component, prop, value), so a component in a list warns once. */
const said = new Set();

/**
 * Says that a prop value fell outside its union, and what rendered instead.
 * Every table lookup in the system falls back whole rather than throwing or
 * half-rendering, which makes the mistake invisible — this is the only thing
 * that reports it. The types and the adherence lint already reject every
 * literal, so a value reaching here was computed.
 *
 * Silent in production, and silent for `undefined`: a prop left off is not a
 * wrong value, and the destructuring default has already answered it.
 */
export function warnUnknown(component, prop, value, table, fallback) {
  if (!DEV || value === undefined) return;
  if (Object.prototype.hasOwnProperty.call(table, value)) return;
  const line = `${component}.${prop}=${String(value)}`;
  if (said.has(line)) return;
  said.add(line);
  console.warn(
    `[QM] <${component}> ${prop}=${JSON.stringify(value)} is not one of ` +
    `${Object.keys(table).map((k) => `'${k}'`).join(' | ')} — rendering '${fallback}'.`);
}

/**
 * Development-only diagnostic behind the system's one policy for a prop value
 * outside its union: resolve it to the component's default in every respect,
 * render that, and say so once.
 *
 * It is not a component and has no card. Consumers do not call it — it exists
 * so that eleven components do not each hand-roll the same warning, and so that
 * the `process` read that decides development from production happens once, in
 * a place that survives being loaded as `_ds_bundle.js` where `process` is not
 * defined at all.
 */

/**
 * Warns that `value` is not a key of `table`, naming `fallback` as what renders
 * instead. No-op in production and for `undefined`; warns once per distinct
 * `(component, prop, value)`, so a component rendered down a list does not
 * flood the console into being ignored.
 */
export declare function warnUnknown(
  component: string,
  prop: string,
  value: unknown,
  table: Readonly<Record<string, unknown>>,
  fallback: string
): void;

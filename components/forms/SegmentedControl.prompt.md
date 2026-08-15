One-line: The density/mode switch in the top bar — Comfortable, Compact, Focus.

```jsx
<SegmentedControl
  value={density}
  onChange={setDensity}
  options={['Comfortable', 'Compact', { value: 'Focus', label: 'Focus', outline: true }]}
/>
```

Notes
- Density is a token transformation (see `tokens/density.css`), not a per-component prop.
- Focus is ringed rather than filled because it removes chrome instead of resizing it.
- It is a radio group, not a row of buttons: one tab stop, arrows move and select, `aria-checked`
  reports the choice. Pass `aria-label` — a group with no name is announced as an anonymous one.

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

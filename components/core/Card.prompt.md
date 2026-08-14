One-line: The surface container behind every QM panel, scene card and beat card — surface level reads as selection, the left rail reads as material state.

```jsx
<Card surface="panel" hoverable padding={18}>…</Card>
<Card surface="selected" rail="parchment" padding="26px 28px">…</Card>
<Card surface="beat" rail="gold" padding="20px 24px">…</Card>
```

Notes
- Radii: 9 for cards, 12 for panels and overlays. Nothing rounder.
- Shadows are long and low-opacity (`--qm-shadow-card`), never a glow.

One-line: QM's only iconography — an inline 24x24 SVG glyph from the copied `QM_ICONS` path set; never emoji, never a font glyph.

```jsx
<Icon name="plus" size={15} />
<Icon name="play" size={11} color="var(--qm-text-6)" />
```

Notes
- `play`, `grip` and `more` are filled; everything else strokes at 2px with round caps.
- Sizes in use: 16 in controls, 15 inline with text, 13 in dense rows, 11-12 inside chips.
- Colour comes from `currentColor` by default, so put the colour on the parent.

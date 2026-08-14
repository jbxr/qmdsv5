One-line: QM's beat list — one component, one selection model, one dot vocabulary, wherever beats are shown.

```jsx
<BeatSpine
  beats={[
    { text: 'The corridor light shifts white to orange at 1009', state: 'written' },
    { text: 'Briggs kneels. The figure does not move', state: 'here' },
    { text: 'He reads the nameplate', state: 'ahead' }
  ]}
  onSelect={jumpDraft}
/>
```

Notes
- A filled dot means the prose has reached that beat; clicking a row jumps the draft to it.
- Density comes from `--qm-row-py`, so wrap in `[data-qm-density]` rather than passing sizes.

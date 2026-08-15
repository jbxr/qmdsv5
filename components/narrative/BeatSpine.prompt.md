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
- `ahead` means the draft has not reached the beat yet — a position, not a material state — so it renders `unwritten`'s hollow grey ring and dimmed text. Do not map it to `proposed` or `conflict`: nothing is wrong with a beat you have not written.
- Any other state, including none, renders `unwritten`. A beat list never asserts canon it was not given.
- Density comes from `--qm-row-py`, so wrap in `[data-qm-density]` rather than passing sizes.
- `onSelect` is the whole difference between a list and a control: with it the spine is a listbox
  (one tab stop on `here`, ↑↓, ⏎) and without it nothing in it is focusable. An outline rail you
  only read should not be handed a handler to look clickable.

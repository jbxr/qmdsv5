One-line: The 6-9px state glyph that must accompany any semantic colour in QM — filled = canon, hollow = proposed, diamond = suggested, coral = here.

```jsx
<StateDot state="canon" />
<StateDot state="proposed" size={9} />
<StateDot state="here" glow />
<StateDot state="suggested" />
```

Notes
- `unwritten` is a hollow grey ring; `unlinked` is dashed gold; `orphaned` bindings use `conflict`.
- Pulse only for pending work (saving, consulting) at 1.4s — QM never spins.
- The table is closed. A state that is not in it renders `neutral`, never `canon` — an unrecognised state must not be able to claim canonicity. Components with a wider vocabulary than this table (`BeatSpine`'s `ahead`) map it themselves before the dot.

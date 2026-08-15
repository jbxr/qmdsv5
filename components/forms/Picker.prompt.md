One-line: The autocomplete popover for story-time `[` and entities `@` — one component, two vocabularies.

```jsx
<Picker
  query="@sari"
  items={[
    { label: 'Sarita Fernandes', meta: 'character', leading: <Avatar initials="SF" size={24} />, active: true, trailingRight: true },
    { label: 'Luna Station', meta: 'location', leading: <Avatar initials="LS" kind="location" size={24} />, trailingRight: true }
  ]}
  footer="Accepting inserts the canonical label, never the alias."
/>
```

Notes
- Neither vocabulary fetches: candidates come from the document anchor, the room clock and the alias table.
- With nothing to offer, show `teaching` plus dashed specimen chips; accepting one inserts nothing.
- Keymap: ⏎/⇥ accept · ↑↓ wrap · esc dismiss.
- The candidates are a listbox and the keymap is theirs: the tab stop sits on the `active`
  candidate, ↑↓ wrap, ⏎ and Space call its `onSelect`. Esc belongs to whatever opened the
  popover — `Picker` has no dismiss of its own.

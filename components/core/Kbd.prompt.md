One-line: A keyboard key rendered as a token — used inline in copy, in refusals, and in the keyboard-contract modal.

```jsx
<Kbd>⌘S</Kbd> <Kbd>⌥↑</Kbd> <Kbd variant="local">local only</Kbd>
```

Notes
- QM writes real glyphs (⌘ ⌥ ⇧ ⏎ ⌫ ⇥), never spelled-out "Cmd+S".
- Dashed `local` marks data that never reaches the server.
- Every prop the token does not claim reaches the `<span>`, so `title`, `aria-*` and `data-*` behave natively.

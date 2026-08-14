One-line: QM's only overlay shell — used for the keyboard contract, dossiers and confirmations.

```jsx
<Overlay scrim title="Keyboard contract" onClose={close} footer={<>Rows marked <Kbd variant="local">local</Kbd> never leave the browser.</>}>
  …sections of ⌘ rows…
</Overlay>
```

Notes
- Radius 12, 60% scrim, 160ms enter; Esc, ✕ and the backdrop all close it.
- Overlays never carry an accent border.

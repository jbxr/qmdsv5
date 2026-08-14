One-line: QM's only overlay shell — used for the keyboard contract, dossiers and confirmations.

```jsx
<Overlay scrim title="Keyboard contract" onClose={close} footer={<>Rows marked <Kbd variant="local">local</Kbd> never leave the browser.</>}>
  …sections of ⌘ rows…
</Overlay>
```

Notes
- Radius 12, 60% scrim; Esc, ✕ and the backdrop all close it. Esc and ✕ need an
  `onClose`; the backdrop needs `scrim` as well. The shell does not animate itself
  — `--qm-dur-overlay` (160ms) is the duration to bring one in with.
- `scrim` is what makes it a modal, and it is the modal that a confirmation wants:
  the scrim is fixed to the **viewport** (not to a container, and not to the top of
  a scrolled document), the panel is a `role="dialog"` named from `title`, focus
  moves to the panel — deliberately the panel and not the first control, so a
  destructive action is never one ⏎ away — Tab wraps inside it, and focus returns
  to whatever opened it. Without `scrim` it is a popover: it still closes, and it
  claims neither the dialog semantics nor the focus.
- A modal with no `title` has no accessible name. Give it an `aria-label` — one you
  pass yourself always wins over the heading.
- QM ships no z-index scale, so the scrim carries a bare `z-index: 100`. If it lands
  under something, that thing is the one with the scale.
- Overlays never carry an accent border.
- `title` is the heading, not a tooltip. The props omit the DOM `title` attribute,
  so you cannot pass one through to the panel.

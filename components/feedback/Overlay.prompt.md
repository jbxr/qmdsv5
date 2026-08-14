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
  the scrim **portals to `document.body`** and is fixed to the **viewport** (not to
  a container, and not to the top of a scrolled document), the panel is a
  `role="dialog"` named from `title`, focus moves to the panel — deliberately the
  panel and not the first control, so a destructive action is never one ⏎ away —
  Tab wraps inside it, and focus returns to whatever opened it. Without `scrim` it
  is a popover: it renders where you wrote it, it still closes, and it claims
  neither the dialog semantics nor the focus.
- A modal holds the whole page, not just the keyboard. Everything else under the
  body goes `inert` — the trap contains Tab, but only `inert` takes the background
  out of the accessibility tree, where a virtual cursor or a browse-by-heading pass
  would otherwise walk straight through the scrim — and the body stops scrolling,
  with the scrollbar's gutter measured and paid back so nothing shifts sideways as
  it opens. Both come off on unmount, exactly as they were found.
- The portal is what makes "the background" nameable: it is the body's other
  children. It is also why a scrim'd overlay is **client-only** — it reaches for
  `document.body` while it renders.
- Modals stack. Two of them behave as one stack: the second makes the first inert,
  Esc closes only the top one, Tab traps only in the top one, and closing the top
  one hands the page back to the one beneath. They may close in any order — close
  an outer one first and the focus still ends up on whatever opened the first
  modal, because the page's opener is remembered by the stack, not the instance.
- The background stays inert for as long as a modal is up, including body children
  appended after it opened — a late portal, a second app root, a toast.
- Popovers still do not portal. A `Picker` opened inside a modal resolves its
  `--qm-z-popover` against the panel; one portalled to the body leaves that
  stacking context and lands behind the scrim.
- A modal with no `title` has no accessible name. Give it an `aria-label` — one you
  pass yourself always wins over the heading.
- The scrim sits at `--qm-z-scrim` (100), the top of the two-rung scale in
  `tokens/elevation.css`. If it lands under something, that thing is off the scale.
- Overlays never carry an accent border.
- `title` is the heading, not a tooltip. The props omit the DOM `title` attribute,
  so you cannot pass one through to the panel.

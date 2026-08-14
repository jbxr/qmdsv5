One-line: The QM input — a dark inset well with a quiet 13px label above it.

```jsx
<Field label="Title" kind="serif" value="Vera & Cade — the corridor" />
<Field label="Story-time" kind="mono" value="−6" width={92} size="sm" />
<Field label="What happened" value="occurs" select />
<Field label="Search"><input className="qm-control" style={{ flex: 1 }} /></Field>
```

Notes
- Focus is a 2px teal ring outside the control; it never recolours the border. The well is `qm-well`, so whatever control you put in it loses the browser's own outline and takes `--qm-focus-outline` instead — the transparent one that carries the focus state into forced-colors, where the ring is not rendered. A consumer control needs no class of its own for that.
- Story-time and ids always take `kind="mono"`; authored titles take `kind="serif"`.
- Given `value` or `placeholder` the well shows that value and `children` trail it. Given neither, `children` *are* the well — put a control there and the ring lights on its own, with no focus state in the consumer. `focused` overrides the ring in both directions; use it only for a field holding no real control.
- `disabled` drops the well to the disabled ramp and suppresses the ring — and QM puts the reason next to the field, never in a tooltip.
- For the common case reach for `TextField` or `TextArea` instead: they are this wrapper with the control, the reset and the placeholder ramp already in it.

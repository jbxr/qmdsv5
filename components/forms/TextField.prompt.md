One-line: Field with a real `<input>` in the well — use this, not `Field`, wherever the author types a line.

```jsx
<TextField label="Title" kind="serif" value={title} onChange={e => setTitle(e.target.value)} />
<TextField label="Story-time" kind="mono" width={92} size="sm" placeholder="−6" />
<TextField label="Name" hint="38 / 60" placeholder="who is this…" trailing={<Kbd>⏎</Kbd>} />
```

Notes
- The ring is the well's own: it lights on focus with no `focused` prop and no focus state in the consumer. `focused` is inherited from `Field` and should never be passed here — `Field.focused` exists for specimens whose well holds no control, and this component always holds a real `<input>`, so here it can only lie: `true` shows a focus nobody has, `false` hides a real one.
- The input inherits the well's family, size and colour; the placeholder takes `--qm-text-7`, the same treatment `Field` gives an empty value.
- Everything `Field` does not claim goes to the input, so `type`, `name`, `disabled`, `readOnly`, `maxLength` and `onKeyDown` behave natively — as does any other `<input>` attribute, including `aria-*` and `data-*`. The adherence config deliberately carries no prop allowlist for this component for that reason; a closed list could only produce false positives. `controlStyle` reaches the input; `style` stays on the wrapper.
- Forwards a ref to the `<input>`. `label` is a real `<label>`, so clicking it focuses the control.

One-line: `PromptField` with a real `<input>` in the well — use this, not `PromptField`, wherever the author types a line to someone.

```jsx
<PromptTextField audience="character" aria-label="ask vera" placeholder="ask vera…"
  value={ask} onChange={e => setAsk(e.target.value)} />
<PromptTextField audience="direction" aria-label="stage-direct vera" hintKey="stage-direct"
  placeholder="private note for vera's next turn…" />
```

Notes
- This is the pair the consuming app used to hand-roll: an addressed well and an editable control are one component, so a dock composer needs neither its own focus state nor its own copy of the audience borders.
- The ring is the well's own: it lights on focus with no `focused` prop and no focus state in the consumer. Do not pass `caret` — that is `PromptField`'s stand-in for a control that is not there, and this one has a real caret in `--qm-teal`. `focused` is the same shape of thing and goes the same way: it exists for a specimen well with no control in it, so passing it here can only lie — `true` shows a focus nobody has, `false` hides a real one.
- Everything `PromptField` does not claim goes to the input, so `value`, `onChange`, `name`, `disabled`, `readOnly`, `maxLength` and `onKeyDown` behave natively — as does any other `<input>` attribute, including `aria-*` and `data-*`. `controlStyle` reaches the input; `style` stays on the wrapper.
- The well has no label row, so pass `aria-label`. The border and the lock say who will hear it to the eye, not to a screen reader.
- Forwards a ref to the `<input>`.
- `audience` is handed to the well, so an unrecognised one lands on `PromptField`'s `private` fallback rather than throwing.

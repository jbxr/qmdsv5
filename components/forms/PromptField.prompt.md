One-line: An input that says who will hear it — a private line to one character, a stage direction, or the assistant's composer.

```jsx
<PromptField audience="character" placeholder="ask vera…" caret />
<PromptField audience="direction" placeholder="private note for vera's next turn…" trailing={<span>stage-direct</span>} />
<PromptField audience="scene"><input className="qm-control" aria-label="say this in scene" /></PromptField>
```

Notes
- Each field talks to exactly one recipient; the answer pops over the page and is accepted as a turn or kept as a note.
- Nothing typed here is in scene until the author sends it deliberately.
- Presentational when given `value` or `placeholder`; a wrapper when given neither, in which case `children` fill the well. `PromptTextField` is this wrapper with a real `<input>` already in it — reach for that wherever the author types.
- The ring is the well's own: it lights whenever focus lands inside, with no `focused` prop and no focus state in the consumer. `focused` overrides in both directions — reach for it only on a field with no real control in it, as `caret` already does.
- `PromptAudience` is exported from the `.d.ts`; name it rather than copying the union, so a change to the vocabulary lands as a type error.

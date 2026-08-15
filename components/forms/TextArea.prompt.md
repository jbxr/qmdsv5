One-line: The multi-line member of the family — a real `<textarea>` in a well that grows downward instead of being pinned.

```jsx
<TextArea label="Logline" kind="serif" rows={3} value={logline} onChange={e => setLogline(e.target.value)} />
<TextArea label="Private note" hint="only you" rows={5} placeholder="what this scene is really about…" />
```

Notes
- Anything read as prose takes `kind="serif"`; `size` sets the well's floor height, `rows` its resting height.
- No drag handle by default — pass `resize="vertical"` where the author genuinely needs one.
- The ring, the placeholder ramp and the prop split are `TextField`'s — including that every other `<textarea>` attribute is forwarded, so the adherence config carries no prop allowlist here either. Forwards a ref to the `<textarea>`.
- `focused` is `TextField`'s too, and carries the same rule: never pass it. There is always a real `<textarea>` in this well, so the ring is already telling the truth — `true` would show a focus nobody has and `false` would hide a real one.
- `resize` resolves through a table rather than reaching CSS directly: an unrecognised value is a declaration the browser drops, and the textarea fell back to the UA's `resize: both` — the drag handle this prop exists to withhold. It renders `none` and warns in development.

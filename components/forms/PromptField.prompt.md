One-line: An input that says who will hear it — a private line to one character, a stage direction, or the assistant's composer.

```jsx
<PromptField audience="character" placeholder="ask vera…" caret />
<PromptField audience="direction" placeholder="private note for vera's next turn…" trailing={<span>stage-direct</span>} />
```

Notes
- Each field talks to exactly one recipient; the answer pops over the page and is accepted as a turn or kept as a note.
- Nothing typed here is in scene until the author sends it deliberately.

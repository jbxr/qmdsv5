One-line: The callout that explains a validation problem or a state rule, sitting directly above the material it concerns.

```jsx
<Callout tone="conflict" action={<Button variant="ghost" size="xxs" onClick={explain}>Why this matters <Icon name="chevronRight" size={12} /></Button>}>
  Marked <strong>Y−40</strong>, but the room is at <strong>Y0</strong>.
</Callout>
```

- `action` is placed, not wired. Pass a real control — the callout gives it the link colour and
  the spacing, and nothing else. A bare fragment reads as a link and answers to nothing.

Notes
- Validation outranks every other accent while it blocks.
- Empty, offline and unknown are not errors — use EmptyState, never a conflict callout.

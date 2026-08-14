One-line: The callout that explains a validation problem or a state rule, sitting directly above the material it concerns.

```jsx
<Callout tone="conflict" action={<>Why this matters <Icon name="chevronRight" size={12} /></>}>
  Marked <strong>Y−40</strong>, but the room is at <strong>Y0</strong>.
</Callout>
```

Notes
- Validation outranks every other accent while it blocks.
- Empty, offline and unknown are not errors — use EmptyState, never a conflict callout.

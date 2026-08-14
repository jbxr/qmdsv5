One-line: The initials token that stands in for an entity anywhere a face would go.

```jsx
<Avatar initials="VN" />
<Avatar initials="LS" kind="location" size={24} />
<Avatar initials="SF" size={52} />
```

Notes
- Shape carries the entity type: circle = character, rounded square = location/artifact.
- Stack overlapping avatars with `marginLeft: -7`, as the writing room does.
- Every prop the token does not claim reaches the `<span>`, so `onClick`, `title`, `aria-*` and `data-*` behave natively.

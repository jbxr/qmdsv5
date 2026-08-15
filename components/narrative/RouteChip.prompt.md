One-line: The chip on a scene row that opens one of its surfaces — and teaches that the surface exists even when it is empty.

```jsx
<RouteChip icon={<Icon name="play" size={11} />}>prose · 377 words</RouteChip>
<RouteChip state="invitation" icon={<Icon name="list" size={15} />}>start an outline</RouteChip>
<RouteChip state="unknown" icon={<Icon name="list" size={15} />}>outline</RouteChip>
```

Notes
- Never hide the chip when a surface is empty — that is what `invitation` is for.
- `unknown` shows the bare surface name and still opens it; it never claims the scene holds nothing.
- The chip is still a `<span>`, but it no longer asks the consumer for its semantics: given `onClick` it takes `role="button"`, a tab stop, ⏎/Space and the ring on its own. Given none it takes none of them — a chip that opens nothing is not a control. Both, and every other native attribute, remain overridable through the spread.
- A `state` outside the union renders as `unknown` — the state that already means the drafts could not be read — rather than printing a count nobody took. It used to throw. Only a computed value gets there: the type and the lint both reject a literal.

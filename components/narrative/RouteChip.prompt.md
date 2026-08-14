One-line: The chip on a scene row that opens one of its surfaces — and teaches that the surface exists even when it is empty.

```jsx
<RouteChip icon={<Icon name="play" size={11} />}>prose · 377 words</RouteChip>
<RouteChip state="invitation" icon={<Icon name="list" size={15} />}>start an outline</RouteChip>
<RouteChip state="unknown" icon={<Icon name="list" size={15} />}>outline</RouteChip>
```

Notes
- Never hide the chip when a surface is empty — that is what `invitation` is for.
- `unknown` shows the bare surface name and still opens it; it never claims the scene holds nothing.
- The chip is a `<span>`, so a clickable one needs `role="button"` and `tabIndex` from the consumer — those, and every other native attribute, reach the element.

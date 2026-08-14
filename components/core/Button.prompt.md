One-line: The QM action control — use `primary` (gold) for the single filled action in a region, `scene` (parchment) only for actions that reach the room, outlines for everything else.

```jsx
<Button variant="primary" size="md">Save to QM</Button>
<Button variant="secondary">Exit</Button>
<Button variant="scene" leadingIcon={<Icon name="play" size={11} />}>Advance the scene</Button>
<Button variant="canon" leadingIcon={<StateDot state="canon" />}>Make canon</Button>
```

Notes
- Hover brightens the surface by ~6%; press adds an inset shadow and no travel.
- Disabled drops to 38% text with no border — and QM always puts the reason next to the button, never in a tooltip.
- `hint` renders a mono shortcut inside the button ("Highlight H").

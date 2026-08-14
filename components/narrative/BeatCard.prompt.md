One-line: The opened beat — the largest serif line on the page, with its state on a rail and its transitions as outline buttons.

```jsx
<BeatCard
  state="proposed" era="Y−40" entity="Sarita Fernandes"
  title="The student begins by describing the Artifact as a work of art"
  directive="without naming it yet"
  actions={<><Button variant="canon" leadingIcon={<StateDot state="canon" />}>Make canon</Button><Button>Edit here</Button></>}
/>
```

Notes
- Nothing on a beat card is a filled button — the region's one gold action lives in the top bar or the inspector.
- `Make canon` may take teal because teal is where it lands, but it stays a rectangle.

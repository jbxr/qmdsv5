One-line: The app bar every QM surface starts with — mark, breadcrumb, centred locator, and the one gold action on the right.

```jsx
<TopBar tall breadcrumb="Outline" center={<Locator />}>
  <SaveStatus inline>Local draft</SaveStatus>
  <SegmentedControl … />
  <Button variant="primary">Save</Button>
  <Button>Exit</Button>
</TopBar>
```

Notes
- The mark is a gradient tile plus the "QM" wordmark — QM has no logotype (see readme.md > Brand mark).
- Exactly one filled gold button lives here.
- `leading` holds the room's live dot and story-time chip; never absolutely position them over the bar.

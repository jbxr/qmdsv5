One-line: The strip above the prose that carries every version of it — revisions you wrote and candidates a run produced, on one axis.

```jsx
<VersionStrip
  versions={[
    { label: 'this draft', score: '7·5', current: true },
    { label: 'rev 3', score: '6·5' },
    { label: 'candidate B', origin: 'generated', score: '7·4' }
  ]}
  note="one axis · compare any two in Compose"
/>
```

Notes
- Origin is a quiet violet diamond, not a separate feature; `current` is raised and never coloured.
- Compose is this axis widened — not a different mode.
- With `onSelect` the versions are a listbox named by `label`: one tab stop on `current`, ←→
  through the rest, ⏎ to read one. `label` and `note` stay outside it and are never announced as
  versions.

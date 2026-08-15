One-line: A chronology event row for the timeline rail — dot for material state, mono meta, actor initials.

```jsx
<TimelineRow state="canon" who="VN" title="At the Luna Station Incident, Vera Nakamura is on shift" meta="Luna Station · depth 1" />
<TimelineRow state="proposed" selected here who="SF" title="The student begins by describing the Artifact as a work of art" meta="depth 3" />
<TimelineRow state="unlinked" who="—" title="A scene the outline knows about but no canonical event backs" meta="not yet attached" />
```

Notes
- The rail and glyph carry material state; the raised surface carries selection. They never swap.
- `unlinked` — a row with nothing canonical behind it — is dashed gold. It is attention, not fault: use it wherever you would otherwise borrow `conflict`, whose cinnabar says two things disagree.
- `meta` hides itself in compact density through `--qm-meta`.
- With `onClick` the row is a button — its own tab stop, ⏎ and Space, and `aria-current` while
  `selected`. Without one it is a caption and never enters the tab order, so do not pass an empty
  handler to a row that only reports.
- The rail, its glow, the dot and the avatar's kind all come from one row, so a `state` outside
  the union takes the grey `StateDot` itself falls back to — rail and dot together, never
  `canon`. A fallback may not assert canonicity.

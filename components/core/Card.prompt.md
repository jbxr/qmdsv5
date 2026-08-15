One-line: The surface container behind every QM panel, scene card and beat card — surface level reads as selection, the left rail reads as material state.

```jsx
<Card surface="panel" hoverable padding={18}>…</Card>
<Card surface="selected" rail="parchment" padding="26px 28px">…</Card>
<Card surface="beat" rail="gold" padding="20px 24px">…</Card>
```

Notes
- Radii: 9 for cards, 12 for panels and overlays. Nothing rounder.
- Shadows are long and low-opacity (`--qm-shadow-card`), never a glow.
- Card sets only `padding`, `border-radius`, `background`, `border-width`,
  `border-style`, `border-color`, `box-shadow`, `cursor` and `transition`. A card
  **without a rail sets no `position` and no `overflow`**, so your stylesheet can
  make it `position: fixed`/`absolute`/`sticky` or give it `max-height` +
  `overflow-y: auto`, and it will work.
- `hoverable` lifts the edge on every surface, and never across materials: the
  five cool surfaces lift to `--qm-border-hover`, and `scene` — whose rest edge
  is warm parchment — lifts to `--qm-border-parchment`, the next step up the same
  ramp. `panel` is the only surface that also lifts its background, to
  `--qm-surface-panel-hover`. Retheme hover through those three tokens, not
  through the component.
- Rest and hover both come from the surface table, so a `surface` your code
  computed to something outside the union falls back to `panel` entirely — same
  background, same edge, same hover — rather than to a panel that sits inert
  under the pointer.
- The edge is three longhands, never the `border` shorthand, because `hoverable`
  swaps the colour in and out. A shorthand plus a colour longhand that comes and
  goes leaves Chrome resolving `border-color` to `currentColor`, and the hairline
  paints in text ink. `style={{ border: … }}` from a consumer still wins — it is
  spread last — but write your own edge the same way if you swap its colour.
- `rail` is the one exception: any rail but `none` adds `position: relative` and
  `overflow: hidden`, because the rail is an absolutely-positioned span clipped to
  the radius. A railed card you also need to position or scroll should be wrapped
  in your own positioned element rather than positioned directly.
- The `style` prop is spread last, so it beats every value above — but an inline
  style is the only thing that can; a `className` rule cannot override one.

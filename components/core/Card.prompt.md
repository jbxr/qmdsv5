One-line: The surface container behind every QM panel, scene card and beat card — surface level reads as selection, the left rail reads as material state.

```jsx
<Card surface="panel" hoverable padding={18}>…</Card>
<Card surface="selected" rail="parchment" padding="26px 28px">…</Card>
<Card surface="beat" rail="gold" padding="20px 24px">…</Card>
<Card hoverable padding="18px 20px" onClick={open}>…</Card>
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
  style is the only thing that can; a `className` rule cannot override one. The
  focus ring is the single exception, applied after `style` and layered *over*
  whatever `box-shadow` is already there rather than replacing it, so a focused
  `selected` card keeps its elevation and a consumer's own shadow survives. The
  override that hides a real focus indicator is the one direction that cannot be
  right.
- **`onClick` is what makes a card a control.** Give it one and it becomes a tab
  stop with `role="button"`, answers Enter and Space, and takes QM's ring on
  keyboard focus. Give it none and nothing changes: a plain `div`, announced as
  nothing, outside the tab order. Most cards are decorative and render exactly
  the attributes they always did.
- It is a `div` with the role rather than a `<button>`, and deliberately: a
  button may contain no flow content and no control, and a card contains both —
  the earlier-scenes card in the Story Engine kit is a clickable card holding
  two `RouteChip`s. Matching the box would also mean setting `display`, `width`,
  `font`, `color`, `text-align`, `appearance` and `margin`, seven properties the
  list above says a card does not set.
- `hoverable` is the pointer affordance and nothing else. `hoverable` **without**
  an `onClick` is a card that lights under the pointer and answers no press —
  pair them, or use neither.
- Do not put your own control inside a clickable card. The card is one target
  and reads as one name, and a click on the inner control still bubbles to the
  card's `onClick`. Keyboard focus and Enter inside it are handled by the inner
  control alone — the card only answers keys aimed at the card itself — but the
  bubbled click is yours to stop.

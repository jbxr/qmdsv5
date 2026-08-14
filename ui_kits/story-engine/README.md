# QM Story Engine — UI kit

Worked reference implementations of the five surfaces defined in the v5 kit
(`uploads/QM Design System v5.dc.html`). Every screen is assembled from this
design system's own components; nothing is re-implemented locally except an
image `Slot` placeholder (the source used drag-and-drop image slots and ships no
imagery).

**Open the file for the surface you are building before you design your own.**
Each one already answers the composition problem its surface poses — the table
below says which. Open `index.html` to click through them; the top strip
switches surfaces and the screens also link into each other the way the product
does.

| Building… | Open | Because it already solves |
| --- | --- | --- |
| A landing / hub page | `WritingRoom.jsx` | Wide centred page measure, a resume card, three equal entry cards, list rows with route state |
| A form whose result the author must see | `NewScene.jsx` | Form-beside-consequence split, one state driving both, the disabled reason under the button |
| A working canvas with rails | `SceneRoom.jsx` | Three-column rail, two collapse states plus focus mode, audience separated by surface |
| Anything side by side | `Compose.jsx` | Multi-column comparison geometry — equal columns, one aligned header band, per-column scroll, a repeated card shape rows read across |
| A dense tree / timeline / inspector | `Outline.jsx` | Density scopes, token-driven rail widths, ancestry as nested borders, a four-tab inspector |
| Any of the above | `data.jsx` | Fixture content — scenes, roster, beats, candidates, chronology, history, copied from the source kit |

---

## What each file has solved

### `WritingRoom.jsx` — the writing room (the front door)

- **The wide page measure**: `1080px` centred with `maxWidth: calc(100% - 80px)`.
  This is the non-reading measure; the prose columns in `SceneRoom` and
  `Outline` are narrower on purpose.
- **The resume card** is `Card surface="selected" rail="parchment"` — selection
  is a raised surface plus a 3px rail, and the parchment rail says the room has
  been in this scene. Its body is a flexible left column beside a fixed 300px
  action stack.
- **Counts ride on the button, not beside it**: `hint="377 words"`,
  `hint="nothing yet"` — a fact under the label rather than a badge.
- **Three ways in** as a `1fr 1fr 1fr` grid of `hoverable` cards, each icon
  tinted by the accent that owns the action: gold for authored routes, violet
  for the generated one.
- **Route state on list rows**: `RouteChip` carries `count`, `invitation` and
  `unknown` states, so a row can admit it could not read a scene's drafts and
  still open it. The `EmptyState kind="unknown"` beneath spells that rule out.

### `NewScene.jsx` — new scene (the configurator)

- **Form beside its consequence**: a `1fr 400px` grid, the summary `Card` set to
  `alignSelf: 'start'` so it stays a card rather than stretching to the form.
- **One piece of state drives both sides.** The roster checkboxes, the summary
  card's cast list and the primary button's `disabled` all read the same `cast`
  array. There is no second model of "who is in this scene".
- **The reason sits under the button**, and changes with the state — one string
  when nothing is chosen, another stating the standing rule. Never a tooltip.
- **Chosen is never colour alone**: a teal check chip *plus* a 5% teal row wash.
- **Story-time** as two narrow mono `Field`s (`width={92}`, `size="sm"`) using
  the real minus sign, `−6`.

### `SceneRoom.jsx` — the scene room (the v5 three-column rail)

- **Two collapse states plus a focus mode that overrides both**:
  `stageOpen = stage && !focus`. Read this before writing your own rail logic.
- **Collapsed rails keep identity.** At 56px they still show avatars, a `3/7`
  progress chip and a vertical label — a narrow rail, not an empty gutter.
- **Only the middle reflows**: fixed 320px stage and 468px assistant rails
  around a `flex: 1, minWidth: 0` prose column.
- **Audience is structural, not decorative.** `PanelHeader audience="scene"` on
  the warm bar, `audience="private"` on the assistant rail, and
  `PromptField audience="character"` under each portrait — three surfaces, three
  temperatures, each with its own note explaining who hears it.
- **The private reply** is an absolutely positioned card with a rotated-square
  tail anchored to the stage rail, dismissible, and rendered only while that
  rail is open.
- **Focus changes the measure, not just the chrome**: 720px/19px/1.85 becomes
  760px/20px/1.9.
- **The beat gutter**: 26px left padding with `StateDot` absolutely positioned
  at `left: 0`, and for HERE an added 3px coral rail with `--qm-glow-here`.
- **The in-scene bar has three states** — open, collapsed to a single clickable
  strip that still reports the turn, and absent under focus.
- `Slot` is the one thing here that is not from the design system: a dashed
  placeholder for author-supplied imagery.

### `Compose.jsx` — compose (candidate comparison)

The multi-column geometry lives here. If you are laying out anything side by
side, this is the file.

- **Equal columns that cannot blow out**: each candidate column is
  `flex: 1, minWidth: 0` inside one flex row. Without `minWidth: 0` a long serif
  paragraph widens its own track and the comparison stops being a comparison.
- **One header band across all columns**, same padding and therefore same
  height, so slot / run / rank metadata lines up horizontally. Each column body
  scrolls independently *below* that band.
- **The ranked column is marked three ways at once** — a darker column ground, a
  teal `inset 0 2px 0` rule with a gradient header, and an `AnnotationMark` on
  the rank — never by hue alone.
- **Every beat is the same three-part card**: meta strip → serif prose → action
  strip. The repeated shape is what lets the eye read across columns; the chosen
  card adds `inset 3px 0 0` teal rather than a fill.
- **Annotation does not reflow the prose.** Highlight is a parchment tint with
  an `inset 0 -1px 0` underline on the span; strike is `line-through` plus
  `--qm-text-8`. Both are span-level, so the text does not move when marked.
- **Deterministic signals stay signals**: `lint`, `tell`, `fn`, `cut mid-clause`
  are toned `AnnotationMark`s, and the status line says so outright — nothing
  sorts on an aggregate.
- The left rail is a `BeatSpine` with `showSpine={false}`, used as the index
  into the set.

### `Outline.jsx` — the outline (the densest surface)

- **Density is a scope, not a prop cascade.** `data-qm-density` on the root
  switches the token block in `tokens/density.css`; one `SegmentedControl` value
  sets it, and `Focus` additionally drops both rails.
- **Rail widths come from tokens**: `--qm-rail-w-live`, `--qm-insp-w`,
  `--qm-col`, `--qm-beat-gap`, `--qm-prose-size`. Nothing here is a literal.
- **`display: var(--qm-meta, inline)`** — density can switch metadata *off*
  rather than shrink it below the type floor. Copy this pattern instead of
  reducing font sizes.
- **The timeline rail**: year headers whose hairline runs to the edge, a 1px
  spine absolutely positioned at `left: 5` carrying a coral→white gradient over
  the current era, and `TimelineRow`s beneath it.
- **Collapse-all is a different rendering, not a hidden one** — one row per year
  with a dot-per-event strip and a count, so the shape of the chronology
  survives the collapse.
- **Ancestry is nested left borders**: `--qm-border-ancestry` for the structural
  level, a gold-tinted border around the proposed subtree, and a 14px absolutely
  positioned tick joining each child row to its parent.
- **The inspector** is four tabs sharing one scroll body, with the conflict
  `Callout` above the fields it explains rather than beside them.

### `data.jsx`

Fixture content for all five screens — scenes, roster, stage beats, prose,
compose beats, candidates, chronology (expanded and collapsed), outline rows and
history. Copied from the source kit, so specimens read like the real product.
Assigned onto `window`; each screen reads what it needs.

---

## Also here

| File | What it is |
| --- | --- |
| `index.html` | The click-through. Loads `../../_ds_bundle.js`, then the five screens, and routes between them. |
| `index-print.html` | A paged/printable rendering of the same set. |
| `doc-page.js` | The `<doc-page>` print shell used by `index-print.html`. Copied scaffold — not part of the design system. |

## Deliberate omissions

- **Imagery.** Locations and character portraits are dashed placeholders. The
  source defines slots, not artwork.
- **The two-column scene room (screen 02).** v5 supersedes it with the
  three-column rail (02B); only the current direction is recreated.
- **Real persistence.** Save, Apply and Make canon are cosmetic.
- **Cross-column beat banding in Compose.** The left `BeatSpine` moves its own
  marker; it does not band the matching row in every candidate column. The
  columns hold different numbers of beats, so the shared card shape carries the
  comparison instead.

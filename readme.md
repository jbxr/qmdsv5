# QuantumMateria (QM) Story Engine — Design System

QM is a **story engine**: a writing environment for one long-form science-fiction
work, where an author drafts prose, runs a live "room" of AI-played characters,
outlines against a strict chronology, and compares generated candidates. The
product's whole design problem is **audience and provenance** — who can hear a
line, whether material is canon or merely proposed, whether a version was
written or generated — and the visual system exists to answer those questions
before the author reads a word.

## Source of truth

| Source | What it gave us |
| --- | --- |
| `uploads/QM Design System v5.dc.html` (uploaded Design Component, ~1,970 lines) | The entire system: five product surfaces, the shared-parts inventory, the colour/type/spacing/density tokens, the interaction-state table, the signal grammar, and the product's own copy. |

No Figma file, GitHub repository or running codebase was provided. Everything in
this project is derived from that one document — values are copied verbatim
(13.5px stays 13.5px, radius 7 stays 7), not snapped to a grid. Its sample
content (Luna Station, Vera Nakamura, Cade Briggs, Sarita Fernandes, the
Chrysalis) is reused so specimens read like the real product.

### Surfaces the source defines

1. **The writing room** — the front door. A resume card for the last scene, three
   ways in (new scene, new outline, compose from candidates), earlier scenes as rows.
2. **The scene room** — prose in the centre, the stage rail (location, cast,
   linked outline) on the left, a plain assistant on the right, and the warm
   in-scene bar beneath the prose. v5 supersedes the earlier two-column version.
3. **Compose** — generated candidates side by side; annotate, don't rank.
4. **New scene** — a form whose consequence (the summary card) sits on the page.
5. **The outline** — the densest surface and the reference implementation:
   timeline rail, beat tree, inspector with Details / Character / Consult / History.

### Brand mark

**The source ships no logo file.** Wherever a mark belongs, QM sets the wordmark
"QM" in IBM Plex Sans 600 next to a 24px gradient tile
(`linear-gradient(145deg,#4E8FA0,#2C4A5C)`), saved here as `assets/qm-mark.svg`.
Do not draw, reconstruct or invent a QuantumMateria logotype.

---

## CONTENT FUNDAMENTALS

**Voice.** The interface talks like a careful collaborator who respects the
author's material. Plain, lower-case, declarative, occasionally aphoristic. It
explains its own rules in one line and then gets out of the way.

- **Sentence case everywhere.** UPPERCASE is reserved for 12.5px module labels
  (`IN SCENE`, `PRESENT`, `INSPECTOR`, `EPIGRAPHS`) and mono flags (`HERE`,
  `PROPOSED`, `DIRECTIVE`).
- **Second person, implied.** "Pick up where the room left off." "Leave both
  blank for the latest canon." Rarely "you"; never "we"; never "I".
- **No emoji. No exclamation marks. No apologies.** There is no "Oops" and no
  "Something went wrong" anywhere in QM.
- **Rules are stated as short imperatives**, often as a headline over the surface
  they govern: "Annotate, don't rank." "Illuminate what matters now." "Colour
  explains, never decorates." "Unknown is not empty."
- **Failure copy has a fixed shape**: *what happened · why · what to press
  instead.* "3 rows sit under this one. Use ⌘⌫ to delete the subtree."
- **Absence is described honestly, in three different tones**: empty invites
  ("The room is quiet. Press ⏎ to let it begin."), offline reassures ("Room
  offline — writing is unaffected."), unknown admits ("Couldn't read this
  scene's drafts — opening still works.").
- **Explanations sit under the control, never in a tooltip**: "Disabled until at
  least one character is chosen and the story-time parses — the reason sits under
  the button, not in a tooltip."
- **Entity names keep the author's own casing** — lower-case handles (`vera`,
  `cade-briggs`, `mira-sorokina`) in UI lists, canonical full names ("Vera
  Nakamura", "Sarita Fernandes") in prose and dossiers.
- **Typography of copy**: curly quotes (“ ”), em dashes with spaces, the real
  minus sign in story-time (`Y−6`, not `Y-6`), middot separators in mono meta
  (`outline · epigraphs · depth 3`), and `·` inside lint scores (`lint 7·5`).
- **Counts are facts, not praise**: "377 words", "3 of 7 written", "57 canon · 1
  proposed", "8 rows". Nothing is congratulated.
- **Narrative content is never paraphrased by the UI.** Prose is shown as
  written; the interface annotates around it.

---

## VISUAL FOUNDATIONS

**The metaphor is an illuminated observatory**: a dark graphite room where the
thing you are working on is lit and everything else recedes. Three principles
from the source: *illuminate what matters now*, *let authored material breathe*,
*colour explains, never decorates*.

### Colour

- **Surfaces are a four-step lighting ramp, never black**: `#0E1217` app →
  `#141A21` rails and inspector → `#1B242E` active content → `#232C38` selected
  (a cooler blue cast). Two radial glows soften the top of scrollable canvases
  (`--qm-surface-app-glow`, `--qm-surface-canvas-glow`); top bars are a subtle
  vertical gradient `#1A222C → #151C24`.
- **Warm/cool is meaning, not decoration.** Anything the room hears sits on the
  warm parchment-lit surface `#241F18 → #1E1A15`; anything private stays on the
  cool unlit `#10161C` behind a **dashed** edge.
- **Seven accents, one meaning each**: gold `#E2A544` = proposed + the single
  primary action; teal `#55B7A6` = canonical/written + focus rings; blue-green
  `#5FA8BC` = entity identity; violet `#A292F2` = suggested / generated /
  consult; coral `#F17B54` = HERE, the reader's position; cinnabar `#C4553A` =
  conflict and damaged material only; parchment `#E8DCC0` = in-scene.
- **Accents fill shapes only as 12–20% tints with 28–45% borders.** The only
  solid fills in the product are the gold primary and the parchment in-scene
  action.
- **Colour never travels alone.** Every accent is paired with a shape: filled dot
  (canon), hollow ring (proposed), rotated diamond (suggested), coral pin
  (here), triangle (conflict).
- **Text is a nine-step structural grey ramp** (`#F0F3F7` → `#5A6472`) for the
  app, and a separate warm parchment ramp (`#F5EEE0` → `#DCD5C7`) for authored
  prose. Sans body floor 14px, mono floor 12.5px, contrast floor 4.5:1 — below
  that, information moves to hover or selection rather than shrinking.

### Type

Three families, three jobs: **Spectral** (serif) for everything the author wrote,
**IBM Plex Sans** for the application, **IBM Plex Mono** for chronology, ids,
keys, run hashes and deterministic signals. Serif sizes run 40 / 30 / 26 / 23 /
19 / 18 / 16.5 with generous line-heights (1.65–1.9); sans runs 14.5 / 14 / 13.5
/ 13 / 12.5; mono 12.5 / 12 / 11.5. Module labels are 12.5px semibold at 0.16em
tracking. Italic Spectral is reserved for notes, directives and consult reads.

### Space, shape, borders

- Spacing means something: **4** within a control, **8** between related
  controls, **16** between groups, **24** between sections, **40** between regions.
- **Four radii only**: 4 chip · 7 control · 9 card · 12 panel (plus 5 for key
  tokens, 16 for cast pills, 50% for avatars). Nothing is rounder.
- **Four divider weights**: structural `rgba(255,255,255,.09)`, group `.07`, list
  `.05`, ancestry `.12`. A **dashed** hairline is never decorative — it means
  unknown, unparsed, local-only or private.
- **Left accent rails are 3px** and always mean material state; a raised surface
  always means selection. The two never swap.
- Fixed chrome: 48px top bar (56 on the outline), 32px mono status line, 306px
  timeline rail, 404px inspector, 56px collapsed rails, 720–860px reading column.

### Cards, shadows, transparency

Cards are flat surfaces with a 1px hairline and radius 9; the only "lift" is a
long, very soft black shadow (`0 24px 50px -34px #000` for cards,
`0 60px 120px -60px #000` for a whole app shell, `0 40px 80px -40px` for
overlays). **No coloured shadows** except three deliberate glows: teal for live,
parchment for in-scene, coral for HERE — plus a 6px gold glow under the primary
button. Transparency does the work blur would do elsewhere: white at 2.8–9% for
fills, black at 28–32% for inset wells. **There is no backdrop blur and no
frosted glass anywhere in QM.** Overlays use a flat 60% black scrim.

### Motion, hover, press

120–200ms `ease-out`, and **none at all** under `prefers-reduced-motion`. Hover
brightens a surface ~6% and may lighten text; it may never introduce semantic
colour. Press is an inset shadow with **no travel and no scale**. Selection =
raised surface + 3px rail. Focus = 2px teal ring **outside** the control, which
never replaces state. Disabled = 38% text, no border, with the reason next to it.
Pending states **pulse** (`qmBreathe`, 1.4s) — QM never spins.

### Imagery

QM ships **no illustrations, no photography and no textures**. Locations and
character portraits are author-supplied drop slots; in this project they are
dashed placeholders. If imagery is ever added, the source implies cool,
desaturated, quiet material that sits behind the parchment prose rather than
competing with it. Backgrounds are flat graphite with the two soft radial glows —
no patterns, no noise, no decorative gradients.

---

## ICONOGRAPHY

- **No icon font, no sprite sheet, no emoji, no unicode-glyph icons** (with one
  exception below). Every icon in the source is an **inline 24×24 SVG**, stroke
  `currentColor`, `stroke-width` 2, round caps and joins — the Lucide drawing
  convention.
- The path data used by QM lives in `components/core/Icon.jsx` (`QM_ICONS`, 22
  glyphs: plus, list, check, x, pencil, sliders, image, lock, message, maximize,
  highlighter, help, arrowLeft, chevrons, unfold, play, grip, more). **Most are
  copied from Lucide unchanged, but not all**: `play`, `message`, `chevronUp` and
  `unfold` have no Lucide ancestor in any release, and `grip` and `more` are
  Lucide shapes re-drawn filled. `guidelines/brand-iconography.card.html` carries
  the full 22-row provenance table, key by key — read it before re-pointing
  `Icon` at `lucide-react`, because those six will change appearance silently.
  No CDN is required at runtime. Three glyphs are filled — play, grip, more; the
  rest stroke.
- **Sizes**: 16 in controls, 15 inline with text, 13 in dense rows, 11–12 inside
  chips. Status meaning belongs to the 8px state glyph (`StateDot`), never to an
  icon.
- **Keyboard glyphs are the one unicode exception** and are typographic, not
  iconographic: ⌘ ⌥ ⇧ ⏎ ⌫ ⇥ ↑ ↓ ⌘\\ set in Plex Mono inside a `Kbd` token.
- Substitution flagged: if a glyph QM needs is missing from `QM_ICONS`, copy it
  from Lucide (ISC licence, same stroke convention) rather than drawing one.

---

## Fonts — substitution note

Spectral, IBM Plex Sans and IBM Plex Mono are all open-licence Google fonts and
are exactly what the source specifies, so **no visual substitution was made**.
They are loaded in `tokens/fonts.css` via a Google Fonts `@import`; **no local
font binaries were provided**, so there are no `@font-face` rules in this
project. If you need offline/air-gapped rendering or self-hosted files, send the
woff2 binaries and they will be dropped into `assets/fonts/` with real
`@font-face` rules.

---

## Index

Read in the order `SKILL.md` gives: this guide → the UI kit → the guidelines →
the tokens → the components → the surface template. A worked surface answers
more, sooner, than the rules it was built from.

### Root

| File | What it is |
| --- | --- |
| `readme.md` | This guide. |
| `SKILL.md` | Agent-skill entry point for using this system elsewhere. |
| `styles.css` | The only stylesheet consumers link — `@import` lines only. |
| `thumbnail.html` | Project tile. |
| `assets/qm-mark.svg` | The app-bar gradient tile (not a logo). |
| `assets/icons/README.md` | How QM's glyph set works and how to extend it. |

### UI kit (`ui_kits/story-engine/`) — worked reference implementations

Not a leftover demo: all five surfaces built end to end out of this system's own
components, and the first place to look before designing a new screen. Each file
already answers the composition problem its surface poses.

| File | Surface it implements |
| --- | --- |
| `WritingRoom.jsx` | The writing room — resume card, three ways in, earlier scenes as rows |
| `NewScene.jsx` | New scene — the roster picker beside the summary card it feeds |
| `SceneRoom.jsx` | The scene room — three-column rail, focus mode, the warm in-scene bar |
| `Compose.jsx` | Compose — equal-width candidate columns, annotate-don't-rank |
| `Outline.jsx` | The outline — timeline rail, beat tree, four-tab inspector, three densities |
| `data.jsx` | The fixture content all five share |

`index.html` is a click-through of the set. The kit's own `README.md` says, per
file, which problems it has already solved and what it deliberately omits.

### Guidelines (`guidelines/`)

22 specimen cards feeding the Design System tab, grouped **Colors** (surfaces,
accents, state grammar, text ramp, prose ramp, audience temperature, tints,
dividers), **Type** (serif, sans, mono, roles, floors), **Spacing** (scale,
radii, control heights, density), **Brand** (mark, interaction states,
elevation, iconography, voice).

### Tokens (`tokens/`)

`fonts.css` · `colors.css` · `typography.css` · `spacing.css` · `shape.css` ·
`elevation.css` · `motion.css` · `density.css` · `semantic.css`
(302 custom properties; density scopes `[data-qm-density="compact"|"focus"]`).

### Components

**`components/core/`** — `Button`, `Icon` (+ `QM_ICONS`), `StateDot`, `Kbd`,
`Avatar`, `Card`
**`components/narrative/`** — `EntityToken`, `EraChip`, `AnnotationMark`,
`RouteChip`, `BeatSpine`, `BeatCard`, `NoteBlock`, `VersionStrip`, `TimelineRow`
**`components/forms/`** — `Field`, `TextField`, `TextArea`, `PromptField`,
`SegmentedControl`, `Tabs`, `Picker`
**`components/feedback/`** — `Callout`, `ModeBar`, `Refusal`, `SaveStatus`,
`EmptyState`, `Overlay`
**`components/navigation/`** — `TopBar`, `PanelHeader`, `StatusBar`

Each directory carries a `@dsCard` HTML showing its variants and states; each
component has a `.d.ts` props contract and a `.prompt.md` usage note.

**Mapping to the source's own inventory.** The v5 document names nine shared
parts — panel + audience, entity token, era chip, key token + refusal, picker,
mode bar, annotation mark, beat spine, version strip. All nine are here
(`PanelHeader`, `EntityToken`, `EraChip`, `Kbd` + `Refusal`, `Picker`,
`ModeBar`, `AnnotationMark`, `BeatSpine`, `VersionStrip`). The rest are the
primitives those screens are visibly built from.

**Intentional additions** (not named as shared parts in the source, but used on
every screen):

- `Icon` — a wrapper over the source's own copied glyph data, so icons are not
  re-drawn per screen.
- `Card`, `Button`, `Field`, `Tabs`, `SegmentedControl`, `TopBar`, `StatusBar`,
  `Overlay`, `Avatar`, `StateDot`, `EmptyState`, `SaveStatus`, `NoteBlock`,
  `BeatCard`, `TimelineRow`, `RouteChip`, `PromptField`, `Callout` — each
  appears verbatim across two or more surfaces in the source; they are extracted,
  not invented.
- `TextField`, `TextArea` — the one exception to the line above, and invented on
  purpose. `Field` is the inset well; these are that well with a real `<input>`
  or `<textarea>` already inside it. Consumers were otherwise rebuilding the
  control against `Field`'s ring by hand and getting it wrong.

### Templates (`templates/qm-surface/`)

`QmSurface.dc.html` — the page-level shell: app bar, mono status line, timeline
rail, reading column, inspector. It answers the frame around a surface; the UI
kit above answers the composition inside it.

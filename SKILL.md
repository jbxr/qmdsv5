---
name: quantummateria-design
description: Use this skill to generate well-branded interfaces and assets for QuantumMateria (QM) Story Engine, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for protoyping.
user-invocable: true
---

Read in this order. Steps 1 and 2 are not optional — most of the cost of getting
QM wrong comes from starting at the tokens.

1. **`readme.md`** — what QM is, the five surfaces the product has, and the whole
   brand in one pass: voice, colour, type, spacing, elevation, motion,
   iconography. Read it before anything else.
2. **`ui_kits/story-engine/`** — the five surfaces built end to end out of this
   system's own components. If what you are designing resembles one of them —
   a prose canvas, a room with collapsible rails, a dense outline, a
   side-by-side comparison, a configurator whose consequence sits on the page —
   open that file and follow its geometry rather than deriving your own. Its
   `README.md` maps each file to its surface and to the layout problems it has
   already solved. A worked surface is a faster route to correct output than the
   principles it was derived from.
3. **`guidelines/*.card.html`** — 22 specimen cards, one rule each, grouped
   colors / type / spacing / brand. Go here when the kit does not cover your
   case, or to check a decision before you commit to it: which accent carries
   which meaning, which radius, which divider weight, when a dashed edge is
   allowed, what hover and press may and may not change.
4. **`tokens/*.css`** — every colour, size, radius, duration and shadow is a
   `--qm-*` custom property. Look the value up; never invent a hex.
5. **`components/`** — the primitives the kit is assembled from, in `core/`,
   `narrative/`, `forms/`, `feedback/` and `navigation/`. Each component has a
   `.d.ts` props contract and a `.prompt.md` usage note; each directory has a
   `*.card.html` showing its variants and states.
6. **`templates/qm-surface/`** — the page-level shell (app bar, mono status
   line, timeline rail, reading column, inspector) when you need a whole surface
   stack rather than one screen. It answers the frame, not the composition
   inside it — step 2 answers that.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

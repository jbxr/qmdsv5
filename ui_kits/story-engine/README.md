# QM Story Engine — UI kit

A click-through recreation of the five surfaces defined in the v5 kit
(`uploads/QM Design System v5.dc.html`). Every screen is assembled from this
design system's own components; nothing is re-implemented locally except an
image `Slot` placeholder (the source used drag-and-drop image slots and ships
no imagery).

Open `index.html`. The top strip switches surfaces; the screens also link into
each other the way the product does.

| File | Surface | Interactions |
| --- | --- | --- |
| `WritingRoom.jsx` | The front door — resume card, three ways in, earlier scenes | Resume opens the room · New scene opens the configurator · Compose and outline chips route |
| `NewScene.jsx` | The configurator | Toggle cast from the roster; the summary card and the disabled/enabled primary react |
| `SceneRoom.jsx` | The room (v5 three-column rail) | Focus mode (⌘\ equivalent button), collapse stage and assistant rails, collapse the in-scene bar, dismiss/reopen vera's private reply |
| `Compose.jsx` | Candidate comparison | Select a beat (banded across columns), Highlight / Strike a selection |
| `Outline.jsx` | The densest surface | Comfortable / Compact / Focus density, Collapse all → one row per year, inspector tabs Details / Character / Consult / History |
| `data.jsx` | Fixture content | Scenes, roster, beats, candidates, chronology, history — all copied from the source kit |

## Deliberate omissions

- **Imagery.** Locations and character portraits are dashed placeholders. The
  source defines slots, not artwork.
- **The two-column scene room (screen 02).** v5 supersedes it with the
  three-column rail (02B); only the current direction is recreated.
- **Real persistence.** Save, Apply and Make canon are cosmetic.

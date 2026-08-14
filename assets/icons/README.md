# QM icon glyphs

QM has no icon font and no sprite sheet. Every glyph in the source is an inline
24x24 SVG at 1.5-2px stroke, round caps and joins — the Lucide drawing
convention. The exact path data used across QM surfaces is inlined in
`components/core/Icon.jsx` (`QM_ICONS`), so no CDN is required at runtime.

Add a glyph by copying its 24x24 path data from Lucide (lucide.dev, ISC) into
`QM_ICONS`; keep `strokeWidth` at 2 for outline glyphs and set `fill: true`
for the three solid ones (play, grip, more).

`../qm-mark.svg` is the app-bar tile from the source kit — a gradient rounded
square, not a real logo. See readme.md > Brand mark.

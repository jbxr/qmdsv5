import React from 'react';
import { warnUnknown } from './warn.js';

/**
 * Path data is copied from lucide (ISC licence, same 24x24 / 2px / round-cap convention) and
 * inlined so QM carries no runtime icon dependency. Keys annotated below are renames or QM
 * originals; guidelines/brand-iconography.card.html holds the full key -> lucide-name table.
 */
export const QM_ICONS = {
  play: { fill: true, d: '<path d="M7 4l13 8-13 8z"/>' }, // QM original, filled — not lucide play
  grip: { fill: true, d: '<circle cx="9" cy="5" r="1.4"/><circle cx="9" cy="12" r="1.4"/><circle cx="9" cy="19" r="1.4"/><circle cx="15" cy="5" r="1.4"/><circle cx="15" cy="12" r="1.4"/><circle cx="15" cy="19" r="1.4"/>' }, // lucide grip-vertical, filled at r1.4
  more: { fill: true, d: '<circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/>' }, // lucide ellipsis, filled at r1.5
  list: { fill: false, d: '<path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/>' },
  sliders: { fill: false, d: '<path d="M19 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>' }, // lucide settings-2
  pencil: { fill: false, d: '<path d="M21.2 6.8a1 1 0 0 0-4-4L3.8 16.2a2 2 0 0 0-.5.8l-1.3 4.4a.5.5 0 0 0 .6.6l4.4-1.3a2 2 0 0 0 .8-.5z"/><path d="m15 5 4 4"/>' },
  x: { fill: false, d: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>' },
  plus: { fill: false, d: '<path d="M5 12h14"/><path d="M12 5v14"/>' },
  check: { fill: false, d: '<path d="M20 6 9 17l-5-5"/>' },
  chevronRight: { fill: false, d: '<path d="m9 18 6-6-6-6"/>' },
  chevronLeft: { fill: false, d: '<path d="m15 18-6-6 6-6"/>' },
  chevronDown: { fill: false, d: '<path d="m6 9 6 6 6-6"/>' },
  chevronUp: { fill: false, d: '<path d="m18 15-6-6-6 6"/>' },
  chevronsUpDown: { fill: false, d: '<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>' },
  unfold: { fill: false, d: '<path d="M3 10h14"/><path d="M3 14h14"/><path d="m21 5-3 3-3-3"/><path d="m15 19 3-3 3 3"/>' }, // QM original — outline rows plus a fold control; intentionally not lucide unfold-vertical
  arrowLeft: { fill: false, d: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>' },
  image: { fill: false, d: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>' },
  lock: { fill: false, d: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>' },
  message: { fill: false, d: '<path d="M12 20a8 8 0 1 0-8-8 8 8 0 0 0 1.2 4.2L4 20z"/>' }, // QM original — not lucide message-circle
  maximize: { fill: false, d: '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>' },
  highlighter: { fill: false, d: '<path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/>' },
  help: { fill: false, d: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>' } // lucide circle-question-mark
};

/** Inline 24x24 SVG glyph. QM has no icon font: glyphs are copied path data. */
export function Icon({ name, size = 16, strokeWidth = 2, color = 'currentColor', style, ...rest }) {
  const g = QM_ICONS[name];
  // The one lookup in the system with no default to fall back to: a substitute
  // glyph would draw the wrong picture, so an unrecognised name renders nothing
  // and says so rather than disappearing quietly.
  warnUnknown('Icon', 'name', name, QM_ICONS, 'nothing');
  if (!g) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={g.fill ? color : 'none'}
      stroke={g.fill ? 'none' : color}
      strokeWidth={g.fill ? undefined : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flex: 'none', display: 'block', ...style }}
      dangerouslySetInnerHTML={{ __html: g.d }}
      {...rest}
    />
  );
}

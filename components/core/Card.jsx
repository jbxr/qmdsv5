import React from 'react';
import { warnUnknown, pick } from './warn.js';

// Edges are longhands, never the `border` shorthand: the hover colour has to be
// swapped in and out, and a colour longhand removed next to a shorthand leaves
// Chrome resolving border-color to currentColor — the hairline paints in text ink.
// Hover is in the table rather than in a branch on the `surface` prop, so an
// unrecognised surface falls back to `panel` whole instead of to a panel that
// never brightens. `scene` is the one warm material: its edge lifts along the
// parchment ramp, never to cold white.
const SURFACES = {
  panel:    { background: 'var(--qm-surface-panel)', backgroundHover: 'var(--qm-surface-panel-hover)', edge: 'solid', border: 'var(--qm-border-panel)', borderHover: 'var(--qm-border-hover)', shadow: 'none' },
  raised:   { background: 'var(--qm-surface-raised)', backgroundHover: null, edge: 'solid', border: 'var(--qm-border-panel)', borderHover: 'var(--qm-border-hover)', shadow: 'none' },
  selected: { background: 'var(--qm-card-raised)', backgroundHover: null, edge: 'solid', border: 'var(--qm-border-structural)', borderHover: 'var(--qm-border-hover)', shadow: 'var(--qm-shadow-card)' },
  beat:     { background: 'var(--qm-beat-raised)', backgroundHover: null, edge: 'solid', border: 'var(--qm-border-group)', borderHover: 'var(--qm-border-hover)', shadow: 'var(--qm-shadow-beat)' },
  scene:    { background: 'var(--qm-scene-surface)', backgroundHover: null, edge: 'solid', border: 'var(--qm-scene-border)', borderHover: 'var(--qm-border-parchment)', shadow: 'none' },
  quiet:    { background: 'var(--qm-fill-quiet)', backgroundHover: null, edge: 'dashed', border: 'var(--qm-border-dashed)', borderHover: 'var(--qm-border-hover)', shadow: 'none' }
};

const RAILS = {
  parchment: 'var(--qm-parchment-rail)',
  gold: 'var(--qm-gold-rail)',
  teal: 'var(--qm-teal)',
  coral: 'var(--qm-coral)',
  none: null
};

/**
 * Surface container. `rail` is material state; the surface itself is selection.
 * A card given an `onClick` is a control and ships as one — tab stop, button
 * role, Enter and Space, QM's ring — and a card given none stays a plain `div`
 * outside the tab order. The role stands in for a real `<button>` because the
 * element has to keep taking flow content and controls, which a button may not
 * hold, and because a button's box only matches this one after seven UA
 * overrides — `display` and `width` among them, which a card does not set.
 */
export function Card({
  surface = 'panel', rail = 'none', radius = 'card', padding = 22,
  hoverable, children, style, onClick, onFocus, onBlur, onKeyDown, ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [ring, setRing] = React.useState(false);
  const s = pick(SURFACES, surface, SURFACES.panel);
  // `none` is a real key carrying `null`, so membership decides here rather
  // than truthiness — a `||` would read `rail="none"` as unrecognised.
  const railBg = Object.prototype.hasOwnProperty.call(RAILS, rail) ? RAILS[rail] : RAILS.none;
  warnUnknown('Card', 'surface', surface, SURFACES, 'panel');
  warnUnknown('Card', 'rail', rail, RAILS, 'none');
  const interactive = Boolean(onClick);
  // A card holds other things, so every focus and key signal is read only when
  // the card itself is the target: focus bubbles, and a control nested inside
  // would otherwise ring the card and answer Enter twice.
  const self = (e) => e.target === e.currentTarget;
  const box = {
    // Only a railed card contains and clips its rail; a plain one leaves
    // position and overflow to the consumer.
    position: railBg ? 'relative' : undefined,
    overflow: railBg ? 'hidden' : undefined,
    padding,
    borderRadius: radius === 'panel' ? 'var(--qm-radius-panel)' : 'var(--qm-radius-card)',
    background: hover && s.backgroundHover ? s.backgroundHover : s.background,
    borderWidth: 1,
    borderStyle: s.edge,
    borderColor: hover ? s.borderHover : s.border,
    boxShadow: s.shadow,
    cursor: hoverable || interactive ? 'pointer' : undefined,
    transition: 'background var(--qm-dur-hover) var(--qm-ease), border-color var(--qm-dur-hover) var(--qm-ease)',
    ...style
  };
  // The ring is the one value a consumer `style` does not outrank, because the
  // direction of that override that hides a real focus indicator cannot be the
  // right one. It layers over whatever shadow is already there rather than
  // replacing it, so a focused `selected` or `beat` card keeps its elevation.
  if (ring) {
    box.boxShadow = box.boxShadow && box.boxShadow !== 'none'
      ? `var(--qm-focus-ring), ${box.boxShadow}`
      : 'var(--qm-focus-ring)';
    box.outline = 'var(--qm-focus-outline,2px solid transparent)';
    box.outlineOffset = 'var(--qm-focus-outline-offset,1px)';
  }
  return (
    <div
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onMouseEnter={hoverable ? () => setHover(true) : undefined}
      onMouseLeave={hoverable ? () => setHover(false) : undefined}
      onFocus={(e) => {
        if (interactive && self(e) && e.target.matches(':focus-visible')) setRing(true);
        if (onFocus) onFocus(e);
      }}
      onBlur={(e) => {
        if (self(e)) setRing(false);
        if (onBlur) onBlur(e);
      }}
      // Sampled again on keydown, not only on focus: a card reached by pointer
      // and then typed at becomes `:focus-visible` where it stands.
      onKeyDown={(e) => {
        if (interactive && self(e)) {
          if (e.target.matches(':focus-visible')) setRing(true);
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e); }
        }
        if (onKeyDown) onKeyDown(e);
      }}
      style={box}
      {...rest}
    >
      {railBg ? (
        <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 'var(--qm-rail-w-accent)', background: railBg }} />
      ) : null}
      {children}
    </div>
  );
}

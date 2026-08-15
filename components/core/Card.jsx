import React from 'react';

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

/** Surface container. `rail` is material state; the surface itself is selection. */
export function Card({
  surface = 'panel', rail = 'none', radius = 'card', padding = 22,
  hoverable, children, style, ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const s = SURFACES[surface] || SURFACES.panel;
  const railBg = RAILS[rail];
  return (
    <div
      onMouseEnter={hoverable ? () => setHover(true) : undefined}
      onMouseLeave={hoverable ? () => setHover(false) : undefined}
      style={{
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
        cursor: hoverable ? 'pointer' : undefined,
        transition: 'background var(--qm-dur-hover) var(--qm-ease), border-color var(--qm-dur-hover) var(--qm-ease)',
        ...style
      }}
      {...rest}
    >
      {railBg ? (
        <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 'var(--qm-rail-w-accent)', background: railBg }} />
      ) : null}
      {children}
    </div>
  );
}

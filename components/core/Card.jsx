import React from 'react';

const SURFACES = {
  panel:    { background: 'var(--qm-surface-panel)', border: '1px solid var(--qm-border-panel)', shadow: 'none' },
  raised:   { background: 'var(--qm-surface-raised)', border: '1px solid var(--qm-border-panel)', shadow: 'none' },
  selected: { background: 'var(--qm-card-raised)', border: '1px solid var(--qm-border-structural)', shadow: 'var(--qm-shadow-card)' },
  beat:     { background: 'var(--qm-beat-raised)', border: '1px solid var(--qm-border-group)', shadow: 'var(--qm-shadow-beat)' },
  scene:    { background: 'var(--qm-scene-surface)', border: '1px solid var(--qm-scene-border)', shadow: 'none' },
  quiet:    { background: 'var(--qm-fill-quiet)', border: '1px dashed var(--qm-border-dashed)', shadow: 'none' }
};

const RAILS = {
  parchment: 'linear-gradient(180deg,#E8DCC0,#A08E6A)',
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
        background: hover && surface === 'panel' ? '#171E26' : s.background,
        border: s.border,
        borderColor: hover ? 'rgba(255,255,255,0.20)' : undefined,
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

import React from 'react';

const STATES = {
  canon:     { color: 'var(--qm-teal)',     fill: 'var(--qm-teal)',     shape: 'circle' },
  written:   { color: 'var(--qm-teal)',     fill: 'var(--qm-teal)',     shape: 'circle' },
  proposed:  { color: 'var(--qm-gold)',     fill: 'transparent',        shape: 'circle' },
  suggested: { color: 'var(--qm-violet)',   fill: 'var(--qm-violet)',   shape: 'diamond' },
  here:      { color: 'var(--qm-coral)',    fill: 'var(--qm-coral)',    shape: 'circle' },
  conflict:  { color: 'var(--qm-cinnabar)', fill: 'rgba(196,85,58,0.25)', shape: 'circle' },
  unwritten: { color: 'var(--qm-text-hairline)', fill: 'transparent',   shape: 'circle' },
  unlinked:  { color: 'var(--qm-gold)',     fill: 'transparent',        shape: 'circle', dashed: true },
  entity:    { color: 'var(--qm-blue)',     fill: 'var(--qm-blue)',     shape: 'circle' },
  neutral:   { color: 'var(--qm-text-6)',   fill: 'var(--qm-text-6)',   shape: 'circle' },
  private:   { color: 'var(--qm-text-8)',   fill: 'transparent',        shape: 'circle' },
  scene:     { color: 'var(--qm-parchment)', fill: 'var(--qm-parchment)', shape: 'circle' }
};

/** The state glyph. Colour never travels without this shape. */
export function StateDot({ state = 'canon', size = 8, glow, pulse, style, ...rest }) {
  const s = STATES[state] || STATES.neutral;
  const diamond = s.shape === 'diamond';
  const glows = {
    here: 'var(--qm-glow-here)', canon: 'var(--qm-glow-live)',
    written: 'var(--qm-glow-live)', scene: 'var(--qm-glow-scene)'
  };
  return (
    <span
      style={{
        width: size, height: size, flex: 'none', display: 'inline-block',
        background: s.fill,
        border: `var(--qm-dot-w) ${s.dashed ? 'dashed' : 'solid'} ${s.color}`,
        borderRadius: diamond ? 1 : '50%',
        transform: diamond ? 'rotate(45deg)' : undefined,
        boxShadow: glow ? glows[state] || 'none' : undefined,
        animation: pulse ? 'qmBreathe var(--qm-breathe-fast) ease-in-out infinite' : undefined,
        ...style
      }}
      {...rest}
    />
  );
}

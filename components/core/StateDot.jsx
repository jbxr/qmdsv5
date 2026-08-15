import React from 'react';
import { warnUnknown } from './warn.js';

// The glow is a column of this table rather than a second lookup on the raw
// prop: two lookups can disagree, and the one keyed on the prop answered a
// state the resolved one had already fallen back from.
const STATES = {
  canon:     { color: 'var(--qm-teal)',     fill: 'var(--qm-teal)',     shape: 'circle', glow: 'var(--qm-glow-live)' },
  written:   { color: 'var(--qm-teal)',     fill: 'var(--qm-teal)',     shape: 'circle', glow: 'var(--qm-glow-live)' },
  proposed:  { color: 'var(--qm-gold)',     fill: 'transparent',        shape: 'circle' },
  suggested: { color: 'var(--qm-violet)',   fill: 'var(--qm-violet)',   shape: 'diamond' },
  here:      { color: 'var(--qm-coral)',    fill: 'var(--qm-coral)',    shape: 'circle', glow: 'var(--qm-glow-here)' },
  conflict:  { color: 'var(--qm-cinnabar)', fill: 'rgba(196,85,58,0.25)', shape: 'circle' },
  unwritten: { color: 'var(--qm-text-hairline)', fill: 'transparent',   shape: 'circle' },
  unlinked:  { color: 'var(--qm-gold)',     fill: 'transparent',        shape: 'circle', dashed: true },
  entity:    { color: 'var(--qm-blue)',     fill: 'var(--qm-blue)',     shape: 'circle' },
  neutral:   { color: 'var(--qm-text-6)',   fill: 'var(--qm-text-6)',   shape: 'circle' },
  private:   { color: 'var(--qm-text-8)',   fill: 'transparent',        shape: 'circle' },
  scene:     { color: 'var(--qm-parchment)', fill: 'var(--qm-parchment)', shape: 'circle', glow: 'var(--qm-glow-scene)' }
};

/** The state glyph. Colour never travels without this shape. */
export function StateDot({ state = 'canon', size = 8, glow, pulse, style, ...rest }) {
  const s = STATES[state] || STATES.neutral;
  warnUnknown('StateDot', 'state', state, STATES, 'neutral');
  const diamond = s.shape === 'diamond';
  return (
    <span
      style={{
        width: size, height: size, flex: 'none', display: 'inline-block',
        background: s.fill,
        border: `var(--qm-dot-w) ${s.dashed ? 'dashed' : 'solid'} ${s.color}`,
        borderRadius: diamond ? 1 : '50%',
        transform: diamond ? 'rotate(45deg)' : undefined,
        boxShadow: glow ? s.glow || 'none' : undefined,
        animation: pulse ? 'qmBreathe var(--qm-breathe-fast) ease-in-out infinite' : undefined,
        ...style
      }}
      {...rest}
    />
  );
}

import React from 'react';
import { Card } from '../core/Card.jsx';
import { StateDot } from '../core/StateDot.jsx';
import { warnUnknown, pick } from '../core/warn.js';

// The chip's label, ink and dot were six separate `state === 'canon'` tests, so
// the rail came from the table and everything beside it from the raw prop. They
// are one row now. `none` is the fallback: it is the entry that claims no
// material state, and it is what an unrecognised state already rendered.
const STATES = {
  proposed: { rail: 'gold', label: 'PROPOSED', dot: 'proposed', breathe: true, ink: 'var(--qm-gold-text)', tint: 'var(--qm-tint-gold)', edge: 'var(--qm-border-gold)' },
  canon:    { rail: 'teal', label: 'CANON', dot: 'canon', ink: 'var(--qm-teal-text-quiet)', tint: 'var(--qm-tint-teal)', edge: 'var(--qm-border-teal)' },
  here:     { rail: 'coral', label: 'PROPOSED', dot: 'proposed', ink: 'var(--qm-gold-text)', tint: 'var(--qm-tint-gold)', edge: 'var(--qm-border-gold)' },
  // Claims nothing, and so carries no chip at all: a gold dot reading PROPOSED
  // over a beat nobody proposed is the assertion this entry exists to withhold.
  none:     { rail: 'none', label: null, dot: null, ink: null, tint: null, edge: null }
};

/** The selected beat, in the outline and in Compose. Material state owns the rail. */
export function BeatCard({
  state = 'proposed', era, entity, title, directive, signals, actions, children, style, ...rest
}) {
  const s = pick(STATES, state, STATES.none);
  warnUnknown('BeatCard', 'state', state, STATES, 'none');
  return (
    <Card surface="beat" rail={s.rail} padding="20px 24px 18px" style={{ marginBottom: 'var(--qm-beat-gap,16px)', ...style }} {...rest}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, fontFamily: 'var(--qm-font-mono)', fontSize: 'var(--qm-type-mono-chip)', letterSpacing: 'var(--qm-ls-mono-tight)' }}>
        {s.label ? (
          <span style={{
            display: 'flex', alignItems: 'center', gap: 6,
            color: s.ink, background: s.tint,
            border: `1px solid ${s.edge}`,
            borderRadius: 'var(--qm-radius-key)', padding: '3px 8px'
          }}>
            <StateDot state={s.dot} size={7} style={{ animation: s.breathe ? 'qmBreathe 3s ease-in-out infinite' : undefined }} />
            {s.label}
          </span>
        ) : null}
        {era ? (<><span style={{ color: 'var(--qm-text-9)' }}>·</span><span style={{ color: 'var(--qm-coral-text)' }}>{era}</span></>) : null}
        {entity ? (<><span style={{ color: 'var(--qm-text-9)' }}>·</span><span style={{ color: 'var(--qm-blue-text)' }}>{entity}</span></>) : null}
      </div>

      <div style={{ fontFamily: 'var(--qm-font-serif)', fontSize: 'var(--qm-type-beat-selected)', lineHeight: 'var(--qm-type-beat-selected-lh)', color: 'var(--qm-prose-1)', textWrap: 'pretty' }}>{title}</div>

      {directive ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
          <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 10.5, letterSpacing: 'var(--qm-ls-mono)', color: 'var(--qm-text-6)' }}>DIRECTIVE</span>
          <span style={{ fontSize: 'var(--qm-type-row)', color: 'var(--qm-text-4)', fontStyle: 'italic' }}>{directive}</span>
        </div>
      ) : null}

      {signals ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>{signals}</div> : null}
      {children}
      {actions ? <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>{actions}</div> : null}
    </Card>
  );
}

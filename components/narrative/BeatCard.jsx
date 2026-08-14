import React from 'react';
import { Card } from '../core/Card.jsx';
import { StateDot } from '../core/StateDot.jsx';

const RAIL = { proposed: 'gold', canon: 'teal', here: 'coral', none: 'none' };

/** The selected beat, in the outline and in Compose. Material state owns the rail. */
export function BeatCard({
  state = 'proposed', era, entity, title, directive, signals, actions, children, style, ...rest
}) {
  return (
    <Card surface="beat" rail={RAIL[state] || 'none'} padding="20px 24px 18px" style={{ marginBottom: 'var(--qm-beat-gap,16px)', ...style }} {...rest}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, fontFamily: 'var(--qm-font-mono)', fontSize: 'var(--qm-type-mono-chip)', letterSpacing: 'var(--qm-ls-mono-tight)' }}>
        <span style={{
          display: 'flex', alignItems: 'center', gap: 6,
          color: state === 'canon' ? 'var(--qm-teal-text-quiet)' : 'var(--qm-gold-text)',
          background: state === 'canon' ? 'var(--qm-tint-teal)' : 'var(--qm-tint-gold)',
          border: `1px solid ${state === 'canon' ? 'var(--qm-border-teal)' : 'var(--qm-border-gold)'}`,
          borderRadius: 'var(--qm-radius-key)', padding: '3px 8px'
        }}>
          <StateDot state={state === 'canon' ? 'canon' : 'proposed'} size={7} style={{ animation: state === 'proposed' ? 'qmBreathe 3s ease-in-out infinite' : undefined }} />
          {state === 'canon' ? 'CANON' : 'PROPOSED'}
        </span>
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

import React from 'react';
import { StateDot } from '../core/StateDot.jsx';

/* A beat's state is not always a glyph state: `ahead` is a position in the
   draft, not a material state, so it borrows `unwritten`'s hollow grey ring.
   Anything unrecognised lands there too — a beat list never invents canon. */
const DOT_STATE = {
  written: 'written', canon: 'canon', proposed: 'proposed',
  suggested: 'suggested', here: 'here', ahead: 'unwritten', unwritten: 'unwritten'
};

/**
 * The one beat list, at three depths of detail: the outline rail, the stage
 * rail and Compose's beat column are all this component.
 */
export function BeatSpine({ beats = [], onSelect, showSpine = true, style, ...rest }) {
  return (
    <div style={{ position: 'relative', paddingLeft: showSpine ? 14 : 0, ...style }} {...rest}>
      {showSpine ? (
        <div style={{ position: 'absolute', left: 3, top: 8, bottom: 8, width: 1, background: 'var(--qm-border-panel)' }} />
      ) : null}
      {beats.map((b, i) => {
        const here = b.state === 'here';
        const dot = DOT_STATE[b.state] || 'unwritten';
        return (
          <div
            key={b.id ?? i}
            onClick={onSelect ? () => onSelect(b, i) : undefined}
            style={{
              position: 'relative', display: 'flex', gap: 10,
              padding: 'var(--qm-row-py,9px) 10px', marginBottom: 1,
              borderRadius: 'var(--qm-radius-control)',
              background: here ? 'var(--qm-surface-selected)' : 'transparent',
              cursor: onSelect ? 'pointer' : 'default'
            }}
          >
            {showSpine ? (
              <StateDot state={dot} size={7} style={{ position: 'absolute', left: -14, top: 14 }} />
            ) : (
              <StateDot state={dot} size={7} style={{ marginTop: 6 }} />
            )}
            {b.n != null ? (
              <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 'var(--qm-type-module)', width: 14, flex: 'none', color: here ? 'var(--qm-gold)' : 'var(--qm-text-8)' }}>{b.n}</span>
            ) : null}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 'var(--qm-type-secondary)', lineHeight: 1.5,
                color: here ? 'var(--qm-prose-2)' : dot === 'unwritten' ? 'var(--qm-text-6)' : 'var(--qm-text-emph)'
              }}>{b.text}</div>
              {b.meta ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 7, fontFamily: 'var(--qm-font-mono)', fontSize: 'var(--qm-type-mono)', color: 'var(--qm-text-6)' }}>{b.meta}</div>
              ) : null}
              {here ? (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 7,
                  padding: '2px 7px 2px 6px', borderRadius: 'var(--qm-radius-chip)',
                  background: 'var(--qm-tint-coral-strong)', fontFamily: 'var(--qm-font-mono)',
                  fontSize: 'var(--qm-type-mono-chip)', letterSpacing: 'var(--qm-ls-mono-tight)',
                  color: 'var(--qm-coral-text)'
                }}>
                  <StateDot state="here" size={6} />HERE
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

import React from 'react';
import { StateDot } from '../core/StateDot.jsx';
import { warnUnknown, pick } from '../core/warn.js';

// `glow` sits beside `dot` and `pulse` rather than in a `state === 'saved'`
// test, so all three of the dot's inputs come from the same resolved row.
const S = {
  local:  { dot: 'neutral', border: 'var(--qm-border-panel)', text: 'var(--qm-text-3)', tag: 'var(--qm-text-6)' },
  saving: { dot: 'proposed', border: 'rgba(226,165,68,0.28)', text: 'var(--qm-gold-text)', tag: 'var(--qm-gold-dim)', pulse: true },
  saved:  { dot: 'canon', border: 'rgba(85,183,166,0.30)', text: 'var(--qm-teal-text)', tag: 'var(--qm-teal-deep)', glow: true },
  offline:{ dot: 'private', border: 'var(--qm-border-panel)', text: 'var(--qm-text-6)', tag: 'var(--qm-text-7)' }
};

/** Local drafting and the fan-out to QM are different promises, so different indicators. */
export function SaveStatus({ state = 'local', children, tag, inline, style, ...rest }) {
  const s = pick(S, state, S.local);
  warnUnknown('SaveStatus', 'state', state, S, 'local');
  if (inline) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 'var(--qm-type-label)', color: 'var(--qm-text-5)', ...style }} {...rest}>
        <StateDot state={s.dot} size={7} glow={s.glow} pulse={s.pulse} />{children}
      </span>
    );
  }
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
        borderRadius: 'var(--qm-radius-callout)', background: 'var(--qm-surface-raised)',
        border: `1px solid ${s.border}`, ...style
      }}
      {...rest}
    >
      <StateDot state={s.dot} size={7} pulse={s.pulse} />
      <span style={{ flex: 1, fontSize: 'var(--qm-type-row)', color: s.text }}>{children}</span>
      {tag ? <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 'var(--qm-type-mono)', color: s.tag }}>{tag}</span> : null}
    </div>
  );
}

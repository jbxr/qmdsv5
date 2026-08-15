import React from 'react';
import { StateDot } from '../core/StateDot.jsx';
import { warnUnknown } from '../core/warn.js';

const MODES = {
  linking: { bg: 'var(--qm-tint-gold-soft)', border: 'var(--qm-border-gold)', text: 'var(--qm-gold-text)', key: 'var(--qm-gold-dim)', dot: 'proposed', pulse: true },
  inspect: { bg: 'rgba(95,168,188,0.10)', border: 'var(--qm-border-blue)', text: 'var(--qm-blue-text)', key: 'var(--qm-blue-deep)', dot: 'entity' },
  peek:    { bg: 'rgba(241,123,84,0.10)', border: 'rgba(241,123,84,0.28)', text: 'var(--qm-coral-text)', key: 'var(--qm-cinnabar-dim)', dot: 'here' }
};

/** A mode is never invisible: it takes a hint bar in the accent of what it waits on. */
export function ModeBar({ mode = 'linking', children, exitKey = 'esc', style, ...rest }) {
  const m = MODES[mode] || MODES.linking;
  warnUnknown('ModeBar', 'mode', mode, MODES, 'linking');
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px',
        borderRadius: 'var(--qm-radius-callout)', background: m.bg,
        border: `1px solid ${m.border}`, ...style
      }}
      {...rest}
    >
      <StateDot state={m.dot} size={8} pulse={m.pulse} />
      <span style={{ flex: 1, fontSize: 'var(--qm-type-secondary)', color: m.text }}>{children}</span>
      <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 'var(--qm-type-mono)', color: m.key }}>{exitKey}</span>
    </div>
  );
}

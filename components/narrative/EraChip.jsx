import React from 'react';
import { warnUnknown, pick } from '../core/warn.js';

const KINDS = {
  time:     { color: 'var(--qm-blue-text)', bg: 'var(--qm-tint-blue)', border: 'var(--qm-border-blue)' },
  timeless: { color: 'var(--qm-text-6)', bg: 'var(--qm-fill-chip)', border: 'var(--qm-border-control-quiet)' },
  peek:     { color: 'var(--qm-coral-text)', bg: 'var(--qm-tint-coral)', border: 'var(--qm-border-coral)' },
  teaching: { color: 'var(--qm-blue-text)', bg: 'var(--qm-tint-blue-soft)', border: 'rgba(95,168,188,0.34)', dashed: true }
};

/** Story-time marker. Chronology is always mono. */
export function EraChip({ children, kind = 'time', size = 'md', style, ...rest }) {
  const k = pick(KINDS, kind, KINDS.time);
  warnUnknown('EraChip', 'kind', kind, KINDS, 'time');
  return (
    <span
      style={{
        fontFamily: 'var(--qm-font-mono)',
        fontSize: size === 'sm' ? 'var(--qm-type-mono-chip)' : 'var(--qm-type-module)',
        color: k.color, background: k.bg,
        border: `1px solid ${k.border}`, borderStyle: k.dashed ? 'dashed' : 'solid',
        borderRadius: 'var(--qm-radius-chip)',
        padding: size === 'sm' ? '2px 6px' : '3px 8px',
        whiteSpace: 'nowrap', ...style
      }}
      {...rest}
    >{children}</span>
  );
}

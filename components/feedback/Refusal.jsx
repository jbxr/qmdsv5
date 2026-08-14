import React from 'react';
import { Kbd } from '../core/Kbd.jsx';

/** what happened · why · what to press instead. Structural grey, never cinnabar. */
export function Refusal({ pressed, children, style, ...rest }) {
  return (
    <div
      style={{
        display: 'flex', gap: 12, padding: '13px 15px',
        borderRadius: 'var(--qm-radius-callout)', background: 'var(--qm-surface-raised)',
        border: '1px solid var(--qm-border-control-quiet)', ...style
      }}
      {...rest}
    >
      {pressed ? <Kbd style={{ height: 24, minWidth: 0, flex: 'none', fontSize: 'var(--qm-type-mono)', boxShadow: 'none', color: 'var(--qm-text-3)' }}>{pressed}</Kbd> : null}
      <div style={{ fontSize: 'var(--qm-type-row)', lineHeight: 1.55, color: 'var(--qm-text-3)' }}>{children}</div>
    </div>
  );
}

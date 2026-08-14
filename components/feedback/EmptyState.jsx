import React from 'react';

/** Empty invites, offline reassures, unknown admits. None of the three is an error. */
export function EmptyState({ kind = 'empty', children, icon, style, ...rest }) {
  const dashed = kind === 'unknown';
  return (
    <div
      style={{
        display: 'flex', gap: 12, padding: dashed ? '14px 16px' : '11px 13px',
        borderRadius: dashed ? 'var(--qm-radius-card)' : 'var(--qm-radius-control)',
        background: 'var(--qm-fill-quiet)',
        border: dashed ? '1px dashed var(--qm-border-dashed)' : 'none',
        fontSize: 'var(--qm-type-secondary)', lineHeight: 1.6, color: 'var(--qm-text-6)', ...style
      }}
      {...rest}
    >
      {icon ? <span style={{ flex: 'none', marginTop: 2, color: 'var(--qm-text-6)' }}>{icon}</span> : null}
      <div>{children}</div>
    </div>
  );
}

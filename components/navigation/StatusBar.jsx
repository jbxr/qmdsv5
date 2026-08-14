import React from 'react';

/** 32px mono status line: where you are on the left, counts on the right. */
export function StatusBar({ left, right, style, ...rest }) {
  return (
    <div
      style={{
        height: 'var(--qm-statusbar-h)', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 18px',
        background: 'var(--qm-surface-status)',
        borderBottom: '1px solid var(--qm-border-group)',
        fontFamily: 'var(--qm-font-mono)', fontSize: 'var(--qm-type-mono)',
        color: 'var(--qm-text-6)', ...style
      }}
      {...rest}
    >
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

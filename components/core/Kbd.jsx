import React from 'react';

/** Key token. Keys are a token; refusals name the key that works instead. */
export function Kbd({ children, variant = 'key', style, ...rest }) {
  const local = variant === 'local';
  return (
    <span
      style={{
        fontFamily: 'var(--qm-font-mono)', fontSize: 'var(--qm-type-module)',
        minWidth: local ? undefined : 26, height: 26,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        padding: '0 8px', borderRadius: 'var(--qm-radius-key)',
        color: local ? 'var(--qm-text-6)' : 'var(--qm-text-field)',
        background: local ? 'rgba(255,255,255,0.03)' : 'var(--qm-fill-hover)',
        border: local ? '1px dashed var(--qm-border-dashed)' : '1px solid var(--qm-border-key)',
        boxShadow: local ? 'none' : 'var(--qm-shadow-key)',
        ...style
      }}
      {...rest}
    >{children}</span>
  );
}

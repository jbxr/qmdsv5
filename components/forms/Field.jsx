import React from 'react';
import { Icon } from '../core/Icon.jsx';

/** Inset field. Every input in QM is a dark inset well, never a raised box. */
export function Field({
  label, hint, value, placeholder, kind = 'text', select, width, size = 'md',
  focused, children, style, ...rest
}) {
  const mono = kind === 'mono';
  const serif = kind === 'serif';
  const height = size === 'lg' ? 44 : size === 'sm' ? 36 : 38;
  const empty = value == null || value === '';
  return (
    <div style={{ width, ...style }} {...rest}>
      {label ? (
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 7 }}>
          <span style={{ fontSize: 'var(--qm-type-label)', color: 'var(--qm-text-6)' }}>{label}</span>
          {hint ? <span style={{ fontSize: 'var(--qm-type-label)', color: 'var(--qm-text-6)' }}>{hint}</span> : null}
        </div>
      ) : null}
      <div style={{
        height, display: 'flex', alignItems: 'center', gap: 10,
        padding: '0 12px', borderRadius: 'var(--qm-radius-control)',
        background: 'var(--qm-fill-inset-soft)',
        border: '1px solid var(--qm-border-control-quiet)',
        boxShadow: focused ? 'var(--qm-focus-ring)' : undefined,
        fontFamily: mono ? 'var(--qm-font-mono)' : serif ? 'var(--qm-font-serif)' : 'var(--qm-font-sans)',
        fontSize: serif ? 'var(--qm-type-body)' : 'var(--qm-field-size,14.5px)',
        color: empty ? 'var(--qm-text-7)' : 'var(--qm-text-field)',
        cursor: select ? 'pointer' : 'text'
      }}>
        <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {empty ? placeholder : value}
        </span>
        {children}
        {select ? <Icon name="chevronDown" size={13} color="var(--qm-text-6)" /> : null}
      </div>
    </div>
  );
}

import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * Inset field. Every input in QM is a dark inset well, never a raised box.
 * The well is `qm-well`, which is how whatever a consumer puts in it loses the
 * browser's focus outline and gains QM's own — the class the control would have
 * to carry itself is one the consumer does not know to pass.
 */
export function Field({
  label, labelFor, hint, value, placeholder, kind = 'text', select, width, size = 'md',
  focused, multiline, disabled, children, style, ...rest
}) {
  const [inner, setInner] = React.useState(false);
  const mono = kind === 'mono';
  const serif = kind === 'serif';
  const height = size === 'lg' ? 44 : size === 'sm' ? 36 : 38;
  const padY = size === 'lg' ? 10 : size === 'sm' ? 6 : 7;
  const wraps = value == null && placeholder == null;
  const empty = value == null || value === '';
  const ring = disabled ? false : focused === undefined ? inner : focused;
  const Label = labelFor ? 'label' : 'span';
  return (
    <div style={{ width, ...style }} {...rest}>
      {label ? (
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 7 }}>
          <Label htmlFor={labelFor} style={{ fontSize: 'var(--qm-type-label)', color: 'var(--qm-text-6)' }}>{label}</Label>
          {hint ? <span style={{ fontSize: 'var(--qm-type-label)', color: 'var(--qm-text-6)' }}>{hint}</span> : null}
        </div>
      ) : null}
      <div
        className="qm-well"
        onFocus={() => setInner(true)}
        onBlur={() => setInner(false)}
        style={{
          height: multiline ? undefined : height,
          minHeight: multiline ? height : undefined,
          display: 'flex', alignItems: multiline ? 'stretch' : 'center', gap: 10,
          padding: multiline ? `${padY}px 12px` : '0 12px',
          borderRadius: 'var(--qm-radius-control)',
          background: 'var(--qm-fill-inset-soft)',
          border: `1px solid ${disabled ? 'var(--qm-border-disabled)' : 'var(--qm-border-control-quiet)'}`,
          boxShadow: ring ? 'var(--qm-focus-ring)' : undefined,
          transition: 'box-shadow var(--qm-dur-hover) var(--qm-ease)',
          fontFamily: mono ? 'var(--qm-font-mono)' : serif ? 'var(--qm-font-serif)' : 'var(--qm-font-sans)',
          fontSize: serif ? 'var(--qm-type-body)' : 'var(--qm-field-size,14.5px)',
          lineHeight: multiline ? 'var(--qm-type-body-lh)' : undefined,
          color: disabled ? 'var(--qm-text-9)' : empty && !wraps ? 'var(--qm-text-7)' : 'var(--qm-text-field)',
          // A pointer promises a click, so only a field that has one gets it. A
          // presentational `select` well holds no control and answers to nothing.
          cursor: disabled ? 'not-allowed' : select && rest.onClick ? 'pointer' : 'text'
        }}
      >
        {wraps ? null : (
          <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {empty ? placeholder : value}
          </span>
        )}
        {children}
        {select ? <Icon name="chevronDown" size={13} color="var(--qm-text-6)" /> : null}
      </div>
    </div>
  );
}

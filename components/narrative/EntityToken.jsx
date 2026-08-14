import React from 'react';
import { Avatar } from '../core/Avatar.jsx';
import { Icon } from '../core/Icon.jsx';

/** One blue-green for entities at every scale: inline name, chip, or avatar+chip. */
export function EntityToken({
  name, initials, role, kind = 'character', variant = 'chip',
  onDismiss, onClick, style, ...rest
}) {
  if (variant === 'inline') {
    return (
      <span
        onClick={onClick}
        style={{
          color: 'var(--qm-blue-text)',
          borderBottom: '1px solid rgba(95,168,188,0.35)',
          cursor: onClick ? 'pointer' : 'inherit', ...style
        }}
        {...rest}
      >{name}</span>
    );
  }
  const tinted = kind === 'character';
  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, height: 32,
        padding: initials ? '0 10px 0 6px' : '0 11px',
        borderRadius: 'var(--qm-radius-pill)',
        background: tinted ? 'var(--qm-tint-blue-soft)' : 'var(--qm-fill-chip)',
        border: `1px solid ${tinted ? 'var(--qm-border-blue)' : 'var(--qm-border-control-quiet)'}`,
        cursor: onClick ? 'pointer' : 'default', ...style
      }}
      {...rest}
    >
      {initials ? <Avatar initials={initials} kind={kind} size={22} /> : null}
      <span style={{ fontSize: 'var(--qm-type-secondary)', color: 'var(--qm-text-3)' }}>{name}</span>
      {role ? <span style={{ fontSize: 'var(--qm-type-module)', color: 'var(--qm-text-7)' }}>{role}</span> : null}
      {onDismiss ? (
        <span onClick={(e) => { e.stopPropagation(); onDismiss(e); }} style={{ display: 'inline-flex', color: 'var(--qm-text-6)', cursor: 'pointer' }}>
          <Icon name="x" size={13} />
        </span>
      ) : null}
    </span>
  );
}

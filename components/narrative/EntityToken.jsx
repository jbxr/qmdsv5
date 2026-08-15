import React from 'react';
import { Avatar } from '../core/Avatar.jsx';
import { Icon } from '../core/Icon.jsx';

/* The ring the whole system draws, on the two targets a token can carry. It is
   sampled on keydown as well as on focus for the reason `Button` gives: a token
   reached by mouse and then typed at becomes `:focus-visible` where it stands. */
function ringStyle(on) {
  return on ? {
    boxShadow: 'var(--qm-focus-ring)',
    outline: 'var(--qm-focus-outline,2px solid transparent)',
    outlineOffset: 'var(--qm-focus-outline-offset,1px)'
  } : null;
}

/**
 * One blue-green for entities at every scale: inline name, chip, or
 * avatar+chip. A token is a control only when it is given `onClick`, and its
 * dismiss ✕ is a second control that the keyboard reaches on its own — Enter
 * there dismisses without also firing the token, the way the pointer already
 * did.
 */
export function EntityToken({
  name, initials, role, kind = 'character', variant = 'chip',
  onDismiss, onClick, style, ...rest
}) {
  const [ring, setRing] = React.useState(false);
  const [dismissRing, setDismissRing] = React.useState(false);
  // `role` is the narrative rank, so the ARIA role is never a prop: a token
  // announces itself as a button exactly when it has something to do.
  const control = onClick ? {
    role: 'button', tabIndex: 0,
    onFocus: (e) => { if (e.target.matches(':focus-visible')) setRing(true); },
    onBlur: () => setRing(false),
    onKeyDown: (e) => {
      if (e.target.matches(':focus-visible')) setRing(true);
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e); }
    }
  } : null;

  if (variant === 'inline') {
    return (
      <span
        onClick={onClick}
        {...control}
        style={{
          color: 'var(--qm-blue-text)',
          borderBottom: '1px solid rgba(95,168,188,0.35)',
          cursor: onClick ? 'pointer' : 'inherit',
          ...ringStyle(ring), ...style
        }}
        {...rest}
      >{name}</span>
    );
  }
  const tinted = kind === 'character';
  return (
    <span
      onClick={onClick}
      {...control}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, height: 32,
        padding: initials ? '0 10px 0 6px' : '0 11px',
        borderRadius: 'var(--qm-radius-pill)',
        background: tinted ? 'var(--qm-tint-blue-soft)' : 'var(--qm-fill-chip)',
        border: `1px solid ${tinted ? 'var(--qm-border-blue)' : 'var(--qm-border-control-quiet)'}`,
        cursor: onClick ? 'pointer' : 'default',
        ...ringStyle(ring), ...style
      }}
      {...rest}
    >
      {initials ? <Avatar initials={initials} kind={kind} size={22} /> : null}
      <span style={{ fontSize: 'var(--qm-type-secondary)', color: 'var(--qm-text-3)' }}>{name}</span>
      {role ? <span style={{ fontSize: 'var(--qm-type-module)', color: 'var(--qm-text-7)' }}>{role}</span> : null}
      {onDismiss ? (
        <span
          role="button" tabIndex={0} aria-label={`Dismiss ${name}`}
          onClick={(e) => { e.stopPropagation(); onDismiss(e); }}
          onFocus={(e) => { if (e.target.matches(':focus-visible')) setDismissRing(true); }}
          onBlur={() => setDismissRing(false)}
          onKeyDown={(e) => {
            if (e.target.matches(':focus-visible')) setDismissRing(true);
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); onDismiss(e); }
          }}
          style={{
            display: 'inline-flex', borderRadius: 'var(--qm-radius-chip)',
            color: 'var(--qm-text-6)', cursor: 'pointer', ...ringStyle(dismissRing)
          }}
        >
          <Icon name="x" size={13} />
        </span>
      ) : null}
    </span>
  );
}

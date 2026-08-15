import React from 'react';
import { warnUnknown } from '../core/warn.js';

// Hoisted so the fallback and the warning read the same table, and so it is not
// rebuilt on every render. `unknown` is the fallback because it is already the
// state that means the drafts could not be read — falling back to `count` would
// print a chip claiming material nobody counted, and `invitation` is the gold
// one that asks for attention.
const STATES = {
  count:      { color: 'var(--qm-text-3)', bg: 'var(--qm-fill-rest)', border: 'var(--qm-border-control-quiet)' },
  invitation: { color: 'var(--qm-gold-text)', bg: 'var(--qm-fill-rest)', border: 'var(--qm-border-gold)' },
  unknown:    { color: 'var(--qm-text-6)', bg: 'rgba(255,255,255,0.03)', border: 'var(--qm-border-panel)' }
};

/**
 * Three states, never two: a count, an invitation, or the bare surface name.
 * A chip that opens something is a button and answers Enter and Space; a chip
 * given no `onClick` opens nothing, so it stays out of the tab order and is
 * never announced as a control.
 */
export function RouteChip({ children, state = 'count', icon, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const [ring, setRing] = React.useState(false);
  const s = STATES[state] || STATES.unknown;
  warnUnknown('RouteChip', 'state', state, STATES, 'unknown');
  const base = {
    height: 32, display: 'inline-flex', alignItems: 'center', gap: 9,
    padding: '0 12px', borderRadius: 'var(--qm-radius-control)',
    fontSize: 'var(--qm-type-secondary)', color: s.color,
    background: hover ? 'var(--qm-fill-hover)' : s.bg,
    border: `1px solid ${s.border}`,
    cursor: onClick ? 'pointer' : 'default', whiteSpace: 'nowrap'
  };
  if (ring) {
    base.boxShadow = 'var(--qm-focus-ring)';
    base.outline = 'var(--qm-focus-outline,2px solid transparent)';
    base.outlineOffset = 'var(--qm-focus-outline-offset,1px)';
  }
  return (
    <span
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onFocus={onClick ? (e) => { if (e.target.matches(':focus-visible')) setRing(true); } : undefined}
      onBlur={onClick ? () => setRing(false) : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.target.matches(':focus-visible')) setRing(true);
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e); }
      } : undefined}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ ...base, ...style }}
      {...rest}
    >
      {icon ? <span style={{ display: 'inline-flex', color: 'var(--qm-text-6)' }}>{icon}</span> : null}
      {children}
    </span>
  );
}

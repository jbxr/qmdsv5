import React from 'react';

/** Three states, never two: a count, an invitation, or the bare surface name. */
export function RouteChip({ children, state = 'count', icon, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const s = {
    count:      { color: 'var(--qm-text-3)', bg: 'var(--qm-fill-rest)', border: 'var(--qm-border-control-quiet)' },
    invitation: { color: 'var(--qm-gold-text)', bg: 'var(--qm-fill-rest)', border: 'var(--qm-border-gold)' },
    unknown:    { color: 'var(--qm-text-6)', bg: 'rgba(255,255,255,0.03)', border: 'var(--qm-border-panel)' }
  }[state];
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        height: 32, display: 'inline-flex', alignItems: 'center', gap: 9,
        padding: '0 12px', borderRadius: 'var(--qm-radius-control)',
        fontSize: 'var(--qm-type-secondary)', color: s.color,
        background: hover ? 'var(--qm-fill-hover)' : s.bg,
        border: `1px solid ${s.border}`,
        cursor: onClick ? 'pointer' : 'default', whiteSpace: 'nowrap', ...style
      }}
      {...rest}
    >
      {icon ? <span style={{ display: 'inline-flex', color: 'var(--qm-text-6)' }}>{icon}</span> : null}
      {children}
    </span>
  );
}

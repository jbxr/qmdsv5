import React from 'react';

/** One popover for [ story-time and @ entities: same keymap, same selection model. */
export function Picker({ query, items = [], footer, teaching, width, style, ...rest }) {
  return (
    <div
      style={{
        width, borderRadius: 'var(--qm-radius-card)', background: 'var(--qm-surface-raised)',
        border: '1px solid rgba(255,255,255,0.12)', boxShadow: 'var(--qm-shadow-popover)',
        overflow: 'hidden', ...style
      }}
      {...rest}
    >
      <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--qm-border-group)', fontFamily: 'var(--qm-font-mono)', fontSize: 'var(--qm-type-module)', color: 'var(--qm-text-6)' }}>
        {query}<span style={{ color: 'var(--qm-teal)' }}>▌</span>
      </div>
      {teaching ? (
        <div style={{ padding: '13px 14px 0', fontSize: 'var(--qm-type-secondary)', lineHeight: 1.55, color: 'var(--qm-text-4)' }}>{teaching}</div>
      ) : null}
      {items.map((it, i) => (
        <div
          key={it.id ?? i} onClick={it.onSelect}
          style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: it.leading ? '10px 14px' : '11px 14px',
            background: it.active ? 'var(--qm-fill-hover)' : 'transparent',
            borderTop: it.separated ? '1px solid var(--qm-border-group)' : undefined,
            cursor: 'pointer'
          }}
        >
          {it.leading}
          <span style={{
            fontFamily: it.mono ? 'var(--qm-font-mono)' : 'var(--qm-font-sans)',
            fontSize: it.mono ? 'var(--qm-type-label)' : 'var(--qm-type-row)',
            color: it.color || (it.mono ? 'var(--qm-blue-text)' : 'var(--qm-text-3)')
          }}>{it.label}</span>
          <span style={{ fontSize: 'var(--qm-type-label)', color: 'var(--qm-text-6)', marginLeft: it.trailingRight ? 'auto' : undefined }}>{it.meta}</span>
        </div>
      ))}
      {footer ? (
        <div style={{ padding: '10px 14px', borderTop: '1px solid var(--qm-border-group)', fontSize: 'var(--qm-type-module)', color: 'var(--qm-text-6)' }}>{footer}</div>
      ) : null}
    </div>
  );
}

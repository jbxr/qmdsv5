import React from 'react';

/**
 * One popover for [ story-time and @ entities: same keymap, same selection
 * model. The candidates are a listbox — one tab stop, ↑↓ wrap, ⏎ accepts — and
 * the popover clips its own rounded corners, so the ring is drawn on an inset
 * layer rather than outside a row that `overflow: hidden` would cut in half.
 */
export function Picker({ query, items = [], footer, teaching, width, style, ...rest }) {
  const [ring, setRing] = React.useState(-1);
  const refs = React.useRef([]);
  // The tab stop follows the active candidate — the one ⏎ would accept — and
  // falls back to the first, so a picker with nothing marked is still reachable.
  const active = items.findIndex((it) => it.active);
  const stop = active < 0 ? 0 : active;

  const go = (i) => {
    const n = items.length;
    if (!n) return;
    refs.current[((i % n) + n) % n]?.focus();
  };

  return (
    <div
      style={{
        width, borderRadius: 'var(--qm-radius-card)', background: 'var(--qm-surface-raised)',
        border: '1px solid var(--qm-border-raised)', boxShadow: 'var(--qm-shadow-popover)',
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
      <div role="listbox">
        {items.map((it, i) => (
          <div
            key={it.id ?? i}
            ref={(el) => { refs.current[i] = el; }}
            role="option" aria-selected={!!it.active} tabIndex={i === stop ? 0 : -1}
            onClick={it.onSelect}
            onFocus={(e) => { if (e.target.matches(':focus-visible')) setRing(i); }}
            onBlur={() => setRing(-1)}
            onKeyDown={(e) => {
              if (e.target.matches(':focus-visible')) setRing(i);
              if (e.key === 'ArrowDown') { e.preventDefault(); go(i + 1); }
              else if (e.key === 'ArrowUp') { e.preventDefault(); go(i - 1); }
              else if (e.key === 'Home') { e.preventDefault(); go(0); }
              else if (e.key === 'End') { e.preventDefault(); go(items.length - 1); }
              else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (it.onSelect) it.onSelect(); }
            }}
            style={{
              position: 'relative',
              display: 'flex', alignItems: 'center', gap: 10, padding: it.leading ? '10px 14px' : '11px 14px',
              background: it.active ? 'var(--qm-fill-hover)' : 'transparent',
              borderTop: it.separated ? '1px solid var(--qm-border-group)' : undefined,
              cursor: 'pointer'
            }}
          >
            {ring === i ? (
              <span style={{
                position: 'absolute', inset: 3, borderRadius: 'var(--qm-radius-key)',
                boxShadow: 'var(--qm-focus-ring)',
                outline: 'var(--qm-focus-outline,2px solid transparent)',
                outlineOffset: 'var(--qm-focus-outline-offset,1px)',
                pointerEvents: 'none'
              }} />
            ) : null}
            {it.leading}
            <span style={{
              fontFamily: it.mono ? 'var(--qm-font-mono)' : 'var(--qm-font-sans)',
              fontSize: it.mono ? 'var(--qm-type-label)' : 'var(--qm-type-row)',
              color: it.color || (it.mono ? 'var(--qm-blue-text)' : 'var(--qm-text-3)')
            }}>{it.label}</span>
            <span style={{ fontSize: 'var(--qm-type-label)', color: 'var(--qm-text-6)', marginLeft: it.trailingRight ? 'auto' : undefined }}>{it.meta}</span>
          </div>
        ))}
      </div>
      {footer ? (
        <div style={{ padding: '10px 14px', borderTop: '1px solid var(--qm-border-group)', fontSize: 'var(--qm-type-module)', color: 'var(--qm-text-6)' }}>{footer}</div>
      ) : null}
    </div>
  );
}

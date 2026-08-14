import React from 'react';
import { StateDot } from '../core/StateDot.jsx';
import { Avatar } from '../core/Avatar.jsx';

/* The selection rail carries the same state the dot does, so it follows the
   dot's hue. `unlinked` is dimmed gold — attention, not fault. */
const RAIL = {
  canon: 'var(--qm-teal)', proposed: 'var(--qm-gold)', suggested: 'var(--qm-violet)',
  here: 'var(--qm-coral)', conflict: 'var(--qm-cinnabar)', unlinked: 'var(--qm-gold-dim)'
};

/** A chronology row in the timeline rail. Selection is a surface; state is the dot. */
export function TimelineRow({
  title, meta, who, state = 'canon', selected, here, onClick, style, ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', display: 'flex', gap: 10,
        padding: 'var(--qm-row-py,12px) 12px', borderRadius: 'var(--qm-radius-control)',
        background: selected
          ? 'linear-gradient(90deg, #232C38, rgba(35,44,56,0.30))'
          : hover ? 'var(--qm-fill-hover)' : 'transparent',
        cursor: onClick ? 'pointer' : 'default', ...style
      }}
      {...rest}
    >
      {selected ? (
        <span style={{
          position: 'absolute', left: -11, top: 6, bottom: 6, width: 'var(--qm-rail-w-accent)',
          borderRadius: 2,
          background: RAIL[state] || 'var(--qm-text-6)',
          boxShadow: state === 'proposed' ? 'var(--qm-glow-gold-rail)' : 'none'
        }} />
      ) : null}
      <StateDot
        state={state} size={9}
        style={{ marginTop: 5, boxShadow: selected && state === 'proposed' ? '0 0 0 3px var(--qm-tint-gold)' : undefined }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 'var(--qm-type-row)', lineHeight: 'var(--qm-type-row-lh)', color: selected ? 'var(--qm-prose-2)' : 'var(--qm-text-3)' }}>{title}</div>
        {here ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 8, fontFamily: 'var(--qm-font-mono)', fontSize: 'var(--qm-type-mono)', color: 'var(--qm-text-5)' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5, padding: '2px 7px 2px 6px',
              borderRadius: 'var(--qm-radius-chip)', background: 'var(--qm-tint-coral-strong)',
              color: 'var(--qm-coral-text)', letterSpacing: 'var(--qm-ls-mono-tight)'
            }}><StateDot state="here" size={6} />HERE</span>
            {meta}
          </div>
        ) : meta ? (
          <div style={{ marginTop: 5, fontFamily: 'var(--qm-font-mono)', fontSize: 'var(--qm-type-module)', color: 'var(--qm-text-6)', display: 'var(--qm-meta,block)' }}>{meta}</div>
        ) : null}
      </div>
      {who ? <Avatar initials={who} kind={state === 'canon' && !selected ? 'neutral' : 'character'} size={24} style={{ marginTop: 1 }} /> : null}
    </div>
  );
}

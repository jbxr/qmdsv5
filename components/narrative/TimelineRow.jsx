import React from 'react';
import { StateDot } from '../core/StateDot.jsx';
import { Avatar } from '../core/Avatar.jsx';
import { warnUnknown } from '../core/warn.js';

/* The selection rail carries the same state the dot does, so it follows the
   dot's hue. `unlinked` is dimmed gold — attention, not fault.

   The rail's glow, the dot it hands to `StateDot` and the avatar's kind are all
   in the row too. They were four separate reads of the raw `state`, so an
   unrecognised one took the grey rail from the table and then the gold glow,
   the halo and the character avatar from the prop. */
const STATES = {
  canon:     { rail: 'var(--qm-teal)', dot: 'canon', quietWho: true },
  proposed:  { rail: 'var(--qm-gold)', dot: 'proposed', glow: 'var(--qm-glow-gold-rail)', halo: '0 0 0 3px var(--qm-tint-gold)' },
  suggested: { rail: 'var(--qm-violet)', dot: 'suggested' },
  here:      { rail: 'var(--qm-coral)', dot: 'here' },
  conflict:  { rail: 'var(--qm-cinnabar)', dot: 'conflict' },
  unlinked:  { rail: 'var(--qm-gold-dim)', dot: 'unlinked' }
};

/* A state we cannot read claims nothing: the grey the dot itself falls back to,
   so rail and dot still agree. Never `canon` — a fallback must not be able to
   assert canonicity — which is why this is not one of the six above. */
const NEUTRAL = { rail: 'var(--qm-text-6)', dot: 'neutral' };

/**
 * A chronology row in the timeline rail. Selection is a surface; state is the
 * dot. A row owns no list, so a clickable one is a button rather than an
 * option — and a row with no `onClick` stays out of the tab order entirely.
 */
export function TimelineRow({
  title, meta, who, state = 'canon', selected, here, onClick, style, ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [ring, setRing] = React.useState(false);
  const s = STATES[state] || NEUTRAL;
  warnUnknown('TimelineRow', 'state', state, STATES, 'neutral');
  const base = {
    position: 'relative', display: 'flex', gap: 10,
    padding: 'var(--qm-row-py,12px) 12px', borderRadius: 'var(--qm-radius-control)',
    background: selected
      ? 'linear-gradient(90deg, #232C38, rgba(35,44,56,0.30))'
      : hover ? 'var(--qm-fill-hover)' : 'transparent',
    cursor: onClick ? 'pointer' : 'default', ...style
  };
  if (ring) {
    base.boxShadow = 'var(--qm-focus-ring)';
    base.outline = 'var(--qm-focus-outline,2px solid transparent)';
    base.outlineOffset = 'var(--qm-focus-outline-offset,1px)';
  }
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-current={onClick && selected ? 'true' : undefined}
      onFocus={onClick ? (e) => { if (e.target.matches(':focus-visible')) setRing(true); } : undefined}
      onBlur={onClick ? () => setRing(false) : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.target.matches(':focus-visible')) setRing(true);
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e); }
      } : undefined}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={base}
      {...rest}
    >
      {selected ? (
        <span style={{
          position: 'absolute', left: -11, top: 6, bottom: 6, width: 'var(--qm-rail-w-accent)',
          borderRadius: 2,
          background: s.rail,
          boxShadow: s.glow || 'none'
        }} />
      ) : null}
      <StateDot
        state={s.dot} size={9}
        style={{ marginTop: 5, boxShadow: selected ? s.halo : undefined }}
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
      {who ? <Avatar initials={who} kind={s.quietWho && !selected ? 'neutral' : 'character'} size={24} style={{ marginTop: 1 }} /> : null}
    </div>
  );
}

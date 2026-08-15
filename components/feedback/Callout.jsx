import React from 'react';
import { StateDot } from '../core/StateDot.jsx';
import { warnUnknown, pick } from '../core/warn.js';

// The shape is a column here too: `conflict` is the only tone that takes the
// triangle, and the rest name the dot they carry. Reading the raw `tone` for
// the glyph let an unrecognised tone pick a mark the resolved tone had not.
const TONES = {
  conflict: { bg: 'var(--qm-tint-cinnabar-soft)', border: 'var(--qm-border-cinnabar)', text: 'var(--qm-cinnabar-text)', strong: 'var(--qm-cinnabar-text-strong)', link: 'var(--qm-cinnabar-dim)', triangle: true },
  canon:    { bg: 'var(--qm-tint-teal-soft)', border: 'var(--qm-border-teal)', text: 'var(--qm-teal-text)', strong: 'var(--qm-teal-text-strong)', link: 'var(--qm-teal-deep)', dot: 'canon' },
  proposed: { bg: 'var(--qm-tint-gold-soft)', border: 'var(--qm-border-gold)', text: 'var(--qm-gold-text)', strong: 'var(--qm-prose-2)', link: 'var(--qm-gold-dim)', dot: 'proposed' },
  consult:  { bg: 'rgba(162,146,242,0.10)', border: 'rgba(162,146,242,0.26)', text: 'var(--qm-violet-text)', strong: 'var(--qm-violet-prose)', link: 'var(--qm-violet-dim)', dot: 'neutral' },
  neutral:  { bg: 'var(--qm-fill-quiet)', border: 'transparent', text: 'var(--qm-text-6)', strong: 'var(--qm-text-emph)', link: 'var(--qm-text-6)', dot: 'neutral' }
};

/** Advisory or blocking surface. Cinnabar is reserved for material that is wrong. */
export function Callout({ tone = 'neutral', glyph, children, action, style, ...rest }) {
  const t = pick(TONES, tone, TONES.neutral);
  warnUnknown('Callout', 'tone', tone, TONES, 'neutral');
  const mark = glyph !== undefined ? glyph
    : t.triangle
      ? <span style={{ flex: 'none', width: 0, height: 0, marginTop: 4, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderBottom: '13px solid var(--qm-cinnabar)' }} />
      : <StateDot state={t.dot} size={7} style={{ marginTop: 6 }} />;
  return (
    <div
      style={{
        display: 'flex', gap: 12, padding: '13px 15px',
        borderRadius: 'var(--qm-radius-callout)', background: t.bg,
        border: t.border === 'transparent' ? 'none' : `1px solid ${t.border}`, ...style
      }}
      {...rest}
    >
      {mark}
      <div style={{ flex: 1, fontSize: 'var(--qm-type-row)', lineHeight: 1.55, color: t.text }}>
        {children}
        {action ? (
          // No cursor and no handler here: the wrapper only places the action.
          // Anything clickable is the caller's, and has to be a real control.
          <div style={{ fontSize: 'var(--qm-type-secondary)', color: t.link, marginTop: 6 }}>{action}</div>
        ) : null}
      </div>
    </div>
  );
}

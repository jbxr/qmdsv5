import React from 'react';
import { StateDot } from '../core/StateDot.jsx';

const TONES = {
  conflict: { bg: 'var(--qm-tint-cinnabar-soft)', border: 'var(--qm-border-cinnabar)', text: 'var(--qm-cinnabar-text)', strong: 'var(--qm-cinnabar-text-strong)', link: 'var(--qm-cinnabar-dim)' },
  canon:    { bg: 'var(--qm-tint-teal-soft)', border: 'var(--qm-border-teal)', text: 'var(--qm-teal-text)', strong: 'var(--qm-teal-text-strong)', link: 'var(--qm-teal-deep)' },
  proposed: { bg: 'var(--qm-tint-gold-soft)', border: 'var(--qm-border-gold)', text: 'var(--qm-gold-text)', strong: 'var(--qm-prose-2)', link: 'var(--qm-gold-dim)' },
  consult:  { bg: 'rgba(162,146,242,0.10)', border: 'rgba(162,146,242,0.26)', text: 'var(--qm-violet-text)', strong: 'var(--qm-violet-prose)', link: 'var(--qm-violet-dim)' },
  neutral:  { bg: 'var(--qm-fill-quiet)', border: 'transparent', text: 'var(--qm-text-6)', strong: 'var(--qm-text-emph)', link: 'var(--qm-text-6)' }
};

/** Advisory or blocking surface. Cinnabar is reserved for material that is wrong. */
export function Callout({ tone = 'neutral', glyph, children, action, style, ...rest }) {
  const t = TONES[tone] || TONES.neutral;
  const mark = glyph !== undefined ? glyph
    : tone === 'conflict'
      ? <span style={{ flex: 'none', width: 0, height: 0, marginTop: 4, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderBottom: '13px solid var(--qm-cinnabar)' }} />
      : <StateDot state={tone === 'canon' ? 'canon' : tone === 'proposed' ? 'proposed' : 'neutral'} size={7} style={{ marginTop: 6 }} />;
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
          <div style={{ fontSize: 'var(--qm-type-secondary)', color: t.link, marginTop: 6, cursor: 'pointer' }}>{action}</div>
        ) : null}
      </div>
    </div>
  );
}

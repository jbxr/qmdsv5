import React from 'react';
import { warnUnknown } from '../core/warn.js';

// Hoisted out of the render, and the well and the ink join the rule in it: an
// unrecognised tone used to take the neutral rule with a transparent well, so
// it rendered as none of the three tones the component declares.
const TONES = {
  neutral: { rule: 'rgba(255,255,255,0.16)', well: 'var(--qm-fill-quiet)', ink: 'var(--qm-text-4)' },
  consult: { rule: 'rgba(162,146,242,0.5)', well: 'transparent', ink: 'var(--qm-violet-quiet)' },
  scene: { rule: 'linear-gradient(180deg,#E8DCC0,rgba(232,220,192,0.2))', well: 'transparent', ink: 'var(--qm-text-4)' }
};

/** Author note or aside: italic serif behind a 2px rule. Never prose, never a card. */
export function NoteBlock({ children, tone = 'neutral', size = 'md', style, ...rest }) {
  const t = TONES[tone] || TONES.neutral;
  warnUnknown('NoteBlock', 'tone', tone, TONES, 'neutral');
  return (
    <div
      style={{
        display: 'flex', gap: 12, padding: '10px 14px',
        borderRadius: 'var(--qm-radius-control)',
        background: t.well, ...style
      }}
      {...rest}
    >
      <span style={{ width: 2, flex: 'none', borderRadius: 2, background: t.rule }} />
      <span style={{
        fontFamily: 'var(--qm-font-serif)', fontStyle: 'italic',
        fontSize: size === 'sm' ? 'var(--qm-type-secondary)' : 'var(--qm-type-note)',
        lineHeight: 'var(--qm-type-note-lh)',
        color: t.ink
      }}>{children}</span>
    </div>
  );
}

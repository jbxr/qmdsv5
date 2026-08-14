import React from 'react';

/** Author note or aside: italic serif behind a 2px rule. Never prose, never a card. */
export function NoteBlock({ children, tone = 'neutral', size = 'md', style, ...rest }) {
  const rules = {
    neutral: 'rgba(255,255,255,0.16)',
    consult: 'rgba(162,146,242,0.5)',
    scene: 'linear-gradient(180deg,#E8DCC0,rgba(232,220,192,0.2))'
  };
  return (
    <div
      style={{
        display: 'flex', gap: 12, padding: '10px 14px',
        borderRadius: 'var(--qm-radius-control)',
        background: tone === 'neutral' ? 'var(--qm-fill-quiet)' : 'transparent', ...style
      }}
      {...rest}
    >
      <span style={{ width: 2, flex: 'none', borderRadius: 2, background: rules[tone] || rules.neutral }} />
      <span style={{
        fontFamily: 'var(--qm-font-serif)', fontStyle: 'italic',
        fontSize: size === 'sm' ? 'var(--qm-type-secondary)' : 'var(--qm-type-note)',
        lineHeight: 'var(--qm-type-note-lh)',
        color: tone === 'consult' ? 'var(--qm-violet-quiet)' : 'var(--qm-text-4)'
      }}>{children}</span>
    </div>
  );
}

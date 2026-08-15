import React from 'react';
import { warnUnknown, pick } from '../core/warn.js';

const TONES = {
  measure:  { color: 'var(--qm-text-6)', bg: 'var(--qm-fill-chip)', border: 'transparent' },
  good:     { color: 'var(--qm-teal-text)', bg: 'var(--qm-tint-teal)', border: 'var(--qm-border-teal)' },
  advisory: { color: 'var(--qm-gold-text)', bg: 'var(--qm-tint-gold)', border: 'transparent' },
  damaged:  { color: 'var(--qm-cinnabar-text)', bg: 'var(--qm-tint-cinnabar)', border: 'transparent' },
  unparsed: { color: 'var(--qm-text-4)', bg: 'rgba(255,255,255,0.04)', border: 'var(--qm-border-dashed)', dashed: true },
  provenance:{ color: 'var(--qm-violet-text)', bg: 'var(--qm-tint-violet)', border: 'transparent' }
};

/** Deterministic signal on a beat: a measurement, an advisory, or damage. */
export function AnnotationMark({ children, tone = 'measure', glyph, style, ...rest }) {
  const t = pick(TONES, tone, TONES.measure);
  warnUnknown('AnnotationMark', 'tone', tone, TONES, 'measure');
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        fontFamily: 'var(--qm-font-mono)', fontSize: 'var(--qm-type-mono)',
        color: t.color, background: t.bg,
        border: t.border === 'transparent' ? 'none' : `1px ${t.dashed ? 'dashed' : 'solid'} ${t.border}`,
        borderRadius: 'var(--qm-radius-chip)', padding: '3px 8px', whiteSpace: 'nowrap', ...style
      }}
      {...rest}
    >{glyph}{children}</span>
  );
}

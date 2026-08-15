import React from 'react';
import { warnUnknown } from './warn.js';

const KINDS = {
  character: { color: 'var(--qm-blue-text)', bg: 'rgba(95,168,188,0.18)', border: 'var(--qm-border-blue-strong)', radius: '50%' },
  location:  { color: 'var(--qm-teal-text)', bg: 'rgba(85,183,166,0.14)', border: 'rgba(85,183,166,0.34)', radius: 6 },
  artifact:  { color: 'var(--qm-violet-text)', bg: 'rgba(162,146,242,0.14)', border: 'rgba(162,146,242,0.34)', radius: 6 },
  author:    { color: 'var(--qm-gold-text)', bg: 'rgba(226,165,68,0.14)', border: 'rgba(226,165,68,0.36)', radius: '50%' },
  neutral:   { color: 'var(--qm-text-5)', bg: 'var(--qm-fill-chip)', border: 'var(--qm-border-control-quiet)', radius: '50%' }
};

/** Initials token. Entity identity is blue-green at every scale. */
export function Avatar({ initials, kind = 'character', size = 26, style, ...rest }) {
  const k = KINDS[kind] || KINDS.character;
  warnUnknown('Avatar', 'kind', kind, KINDS, 'character');
  return (
    <span
      style={{
        width: size, height: size, flex: 'none', display: 'inline-flex',
        alignItems: 'center', justifyContent: 'center',
        borderRadius: typeof k.radius === 'number' ? Math.max(5, Math.round(size / 4)) : k.radius,
        background: k.bg, border: `1px solid ${k.border}`, color: k.color,
        fontFamily: 'var(--qm-font-sans)', fontSize: Math.max(10.5, Math.round(size * 0.42)),
        letterSpacing: '0.02em', ...style
      }}
      {...rest}
    >{initials}</span>
  );
}

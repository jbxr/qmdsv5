import React from 'react';
import { StateDot } from '../core/StateDot.jsx';

/** One axis, two origins: written revisions and generated candidates. */
export function VersionStrip({ versions = [], label = 'VERSION', note, onSelect, style, ...rest }) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '10px 22px',
        borderBottom: '1px solid var(--qm-border-group)', background: 'rgba(255,255,255,0.015)', ...style
      }}
      {...rest}
    >
      <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 'var(--qm-type-mono-micro)', letterSpacing: 'var(--qm-ls-mono)', color: 'var(--qm-text-6)' }}>{label}</span>
      {versions.map((v, i) => {
        const generated = v.origin === 'generated';
        return (
          <span
            key={v.id ?? i}
            onClick={onSelect ? () => onSelect(v, i) : undefined}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, height: 28,
              flex: 'none', whiteSpace: 'nowrap', padding: '0 10px',
              borderRadius: 'var(--qm-radius-key)', fontSize: 'var(--qm-type-module)',
              color: v.current ? 'var(--qm-text-1)' : generated ? 'var(--qm-violet-text)' : 'var(--qm-text-4)',
              background: v.current ? 'var(--qm-surface-selected)' : 'transparent',
              border: `1px solid ${v.current ? 'rgba(255,255,255,0.14)' : generated ? 'var(--qm-border-violet)' : 'var(--qm-border-control-quiet)'}`,
              cursor: onSelect ? 'pointer' : 'default'
            }}
          >
            {generated ? <StateDot state="suggested" size={6} /> : null}
            {v.label}
            {v.score ? (
              <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 'var(--qm-type-mono-chip)', color: v.current ? 'var(--qm-teal-text)' : generated ? 'var(--qm-violet-dim)' : 'var(--qm-text-7)' }}>{v.score}</span>
            ) : null}
          </span>
        );
      })}
      <span style={{ flex: 1 }} />
      {note ? (
        <span style={{ minWidth: 0, textAlign: 'right', fontSize: 'var(--qm-type-module)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--qm-text-7)' }}>{note}</span>
      ) : null}
    </div>
  );
}

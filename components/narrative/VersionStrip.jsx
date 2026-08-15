import React from 'react';
import { StateDot } from '../core/StateDot.jsx';

/**
 * One axis, two origins: written revisions and generated candidates. With
 * `onSelect` the versions themselves are a listbox — one tab stop, ←→ through
 * them, ⏎ reads one — and the label and the note stay outside it, so neither is
 * announced as a candidate.
 */
export function VersionStrip({ versions = [], label = 'VERSION', note, onSelect, style, ...rest }) {
  const [ring, setRing] = React.useState(-1);
  const refs = React.useRef([]);
  // The tab stop follows the version being read, and falls back to the first.
  const at = versions.findIndex((v) => v.current);
  const stop = at < 0 ? 0 : at;

  const go = (i) => {
    const n = versions.length;
    if (!n) return;
    refs.current[((i % n) + n) % n]?.focus();
  };

  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '10px 22px',
        borderBottom: '1px solid var(--qm-border-group)', background: 'rgba(255,255,255,0.015)', ...style
      }}
      {...rest}
    >
      <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 'var(--qm-type-mono-micro)', letterSpacing: 'var(--qm-ls-mono)', color: 'var(--qm-text-6)' }}>{label}</span>
      <span role={onSelect ? 'listbox' : undefined} aria-label={onSelect ? label : undefined} style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 'none' }}>
        {versions.map((v, i) => {
          const generated = v.origin === 'generated';
          const base = {
            display: 'inline-flex', alignItems: 'center', gap: 8, height: 28,
            flex: 'none', whiteSpace: 'nowrap', padding: '0 10px',
            borderRadius: 'var(--qm-radius-key)', fontSize: 'var(--qm-type-module)',
            color: v.current ? 'var(--qm-text-1)' : generated ? 'var(--qm-violet-text)' : 'var(--qm-text-4)',
            background: v.current ? 'var(--qm-surface-selected)' : 'transparent',
            border: `1px solid ${v.current ? 'rgba(255,255,255,0.14)' : generated ? 'var(--qm-border-violet)' : 'var(--qm-border-control-quiet)'}`,
            cursor: onSelect ? 'pointer' : 'default'
          };
          if (ring === i) {
            base.boxShadow = 'var(--qm-focus-ring)';
            base.outline = 'var(--qm-focus-outline,2px solid transparent)';
            base.outlineOffset = 'var(--qm-focus-outline-offset,1px)';
          }
          return (
            <span
              key={v.id ?? i}
              ref={(el) => { refs.current[i] = el; }}
              onClick={onSelect ? () => onSelect(v, i) : undefined}
              role={onSelect ? 'option' : undefined}
              aria-selected={onSelect ? !!v.current : undefined}
              tabIndex={onSelect ? (i === stop ? 0 : -1) : undefined}
              onFocus={onSelect ? (e) => { if (e.target.matches(':focus-visible')) setRing(i); } : undefined}
              onBlur={onSelect ? () => setRing(-1) : undefined}
              onKeyDown={onSelect ? (e) => {
                if (e.target.matches(':focus-visible')) setRing(i);
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(i + 1); }
                else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(i - 1); }
                else if (e.key === 'Home') { e.preventDefault(); go(0); }
                else if (e.key === 'End') { e.preventDefault(); go(versions.length - 1); }
                else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(v, i); }
              } : undefined}
              style={base}
            >
              {generated ? <StateDot state="suggested" size={6} /> : null}
              {v.label}
              {v.score ? (
                <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 'var(--qm-type-mono-chip)', color: v.current ? 'var(--qm-teal-text)' : generated ? 'var(--qm-violet-dim)' : 'var(--qm-text-7)' }}>{v.score}</span>
              ) : null}
            </span>
          );
        })}
      </span>
      <span style={{ flex: 1 }} />
      {note ? (
        <span style={{ minWidth: 0, textAlign: 'right', fontSize: 'var(--qm-type-module)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--qm-text-7)' }}>{note}</span>
      ) : null}
    </div>
  );
}

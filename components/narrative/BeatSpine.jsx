import React from 'react';
import { StateDot } from '../core/StateDot.jsx';
import { warnUnknown, pick } from '../core/warn.js';

/* A beat's state is not always a glyph state: `ahead` is a position in the
   draft, not a material state, so it borrows `unwritten`'s hollow grey ring.
   Anything unrecognised lands there too — a beat list never invents canon. */
const DOT_STATE = {
  written: 'written', canon: 'canon', proposed: 'proposed',
  suggested: 'suggested', here: 'here', ahead: 'unwritten', unwritten: 'unwritten'
};

/**
 * The one beat list, at three depths of detail: the outline rail, the stage
 * rail and Compose's beat column are all this component. With `onSelect` it is
 * a listbox — one tab stop, ↑↓ through the beats, ⏎ jumps the draft; without
 * one it is a read-only list and takes no place in the tab order.
 */
export function BeatSpine({ beats = [], onSelect, showSpine = true, style, ...rest }) {
  const [ring, setRing] = React.useState(-1);
  const refs = React.useRef([]);
  // The tab stop follows the draft — the `here` beat — and falls back to the
  // first, so a list with nothing marked is still reachable.
  const at = beats.findIndex((b) => DOT_STATE[b.state] === 'here');
  const stop = at < 0 ? 0 : at;

  const go = (i) => {
    const n = beats.length;
    if (!n) return;
    refs.current[((i % n) + n) % n]?.focus();
  };

  return (
    <div
      role={onSelect ? 'listbox' : undefined}
      style={{ position: 'relative', paddingLeft: showSpine ? 14 : 0, ...style }}
      {...rest}
    >
      {showSpine ? (
        <div style={{ position: 'absolute', left: 3, top: 8, bottom: 8, width: 1, background: 'var(--qm-border-panel)' }} />
      ) : null}
      {beats.map((b, i) => {
        const dot = pick(DOT_STATE, b.state, 'unwritten');
        // Read off the resolved glyph, not off `b.state`: the selection, the
        // number's ink and the HERE flag all have to agree with the dot.
        const here = dot === 'here';
        warnUnknown('BeatSpine', 'beats[].state', b.state, DOT_STATE, 'unwritten');
        const base = {
          position: 'relative', display: 'flex', gap: 10,
          padding: 'var(--qm-row-py,9px) 10px', marginBottom: 1,
          borderRadius: 'var(--qm-radius-control)',
          background: here ? 'var(--qm-surface-selected)' : 'transparent',
          cursor: onSelect ? 'pointer' : 'default'
        };
        if (ring === i) {
          base.boxShadow = 'var(--qm-focus-ring)';
          base.outline = 'var(--qm-focus-outline,2px solid transparent)';
          base.outlineOffset = 'var(--qm-focus-outline-offset,1px)';
        }
        return (
          <div
            key={b.id ?? i}
            ref={(el) => { refs.current[i] = el; }}
            onClick={onSelect ? () => onSelect(b, i) : undefined}
            role={onSelect ? 'option' : undefined}
            aria-selected={onSelect ? here : undefined}
            tabIndex={onSelect ? (i === stop ? 0 : -1) : undefined}
            onFocus={onSelect ? (e) => { if (e.target.matches(':focus-visible')) setRing(i); } : undefined}
            onBlur={onSelect ? () => setRing(-1) : undefined}
            onKeyDown={onSelect ? (e) => {
              if (e.target.matches(':focus-visible')) setRing(i);
              if (e.key === 'ArrowDown') { e.preventDefault(); go(i + 1); }
              else if (e.key === 'ArrowUp') { e.preventDefault(); go(i - 1); }
              else if (e.key === 'Home') { e.preventDefault(); go(0); }
              else if (e.key === 'End') { e.preventDefault(); go(beats.length - 1); }
              else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(b, i); }
            } : undefined}
            style={base}
          >
            {showSpine ? (
              <StateDot state={dot} size={7} style={{ position: 'absolute', left: -14, top: 14 }} />
            ) : (
              <StateDot state={dot} size={7} style={{ marginTop: 6 }} />
            )}
            {b.n != null ? (
              <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 'var(--qm-type-module)', width: 14, flex: 'none', color: here ? 'var(--qm-gold)' : 'var(--qm-text-8)' }}>{b.n}</span>
            ) : null}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 'var(--qm-type-secondary)', lineHeight: 1.5,
                color: here ? 'var(--qm-prose-2)' : dot === 'unwritten' ? 'var(--qm-text-6)' : 'var(--qm-text-emph)'
              }}>{b.text}</div>
              {b.meta ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 7, fontFamily: 'var(--qm-font-mono)', fontSize: 'var(--qm-type-mono)', color: 'var(--qm-text-6)' }}>{b.meta}</div>
              ) : null}
              {here ? (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 7,
                  padding: '2px 7px 2px 6px', borderRadius: 'var(--qm-radius-chip)',
                  background: 'var(--qm-tint-coral-strong)', fontFamily: 'var(--qm-font-mono)',
                  fontSize: 'var(--qm-type-mono-chip)', letterSpacing: 'var(--qm-ls-mono-tight)',
                  color: 'var(--qm-coral-text)'
                }}>
                  <StateDot state="here" size={6} />HERE
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

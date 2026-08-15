import React from 'react';

/**
 * Density and mode switch. Selection is a raised inner surface, never colour.
 * One value out of several is a radio group, not a row of buttons: the strip
 * takes a single tab stop and arrows move — and select — inside it.
 */
export function SegmentedControl({ options = [], value, onChange, style, ...rest }) {
  const [ring, setRing] = React.useState(-1);
  const refs = React.useRef([]);
  const values = options.map((o) => (typeof o === 'string' ? o : o.value));
  // As in `Tabs`: the checked option owns the tab stop, and a `value` matching
  // nothing hands it to the first rather than leaving the group unreachable.
  const checked = values.indexOf(value);
  const stop = checked < 0 ? 0 : checked;

  const go = (i) => {
    const n = values.length;
    if (!n) return;
    const next = ((i % n) + n) % n;
    refs.current[next]?.focus();
    if (onChange) onChange(values[next]);
  };

  return (
    <div
      role="radiogroup"
      style={{
        display: 'flex', alignItems: 'center', gap: 2, height: 34, padding: 3,
        borderRadius: 'var(--qm-radius-callout)', background: 'rgba(0,0,0,0.32)',
        border: '1px solid var(--qm-border-group)', ...style
      }}
      {...rest}
    >
      {options.map((o, i) => {
        const v = values[i];
        const label = typeof o === 'string' ? o : o.label;
        const active = v === value;
        const outline = typeof o !== 'string' && o.outline;
        const base = {
          position: 'relative', height: 28, display: 'flex', alignItems: 'center',
          padding: '0 11px', borderRadius: 'var(--qm-radius-key)',
          fontSize: 'var(--qm-type-module)', color: 'var(--qm-text-row)', cursor: 'pointer'
        };
        if (ring === i) {
          base.boxShadow = 'var(--qm-focus-ring)';
          base.outline = 'var(--qm-focus-outline,2px solid transparent)';
          base.outlineOffset = 'var(--qm-focus-outline-offset,1px)';
        }
        return (
          <div
            key={v}
            ref={(el) => { refs.current[i] = el; }}
            role="radio" aria-checked={active} tabIndex={i === stop ? 0 : -1}
            onClick={() => onChange && onChange(v)}
            onFocus={(e) => { if (e.target.matches(':focus-visible')) setRing(i); }}
            onBlur={() => setRing(-1)}
            onKeyDown={(e) => {
              if (e.target.matches(':focus-visible')) setRing(i);
              if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(i + 1); }
              else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(i - 1); }
              else if (e.key === 'Home') { e.preventDefault(); go(0); }
              else if (e.key === 'End') { e.preventDefault(); go(values.length - 1); }
              else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (onChange) onChange(v); }
            }}
            style={base}
          >
            {active ? (
              <span style={{
                position: 'absolute', inset: 0, borderRadius: 'var(--qm-radius-key)',
                background: outline ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.10)',
                boxShadow: outline ? 'inset 0 0 0 1px rgba(255,255,255,0.18)' : 'inset 0 1px 0 rgba(255,255,255,0.10)'
              }} />
            ) : null}
            <span style={{ position: 'relative' }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

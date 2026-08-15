import React from 'react';

/**
 * Inspector tabs. A 2px neutral underline marks the active one. The group is a
 * real tablist: one tab stop for the whole strip, arrows move within it, and
 * moving selects — the panel a tab reveals is the consumer's, and always cheap.
 */
export function Tabs({ tabs = [], value, onChange, style, ...rest }) {
  const [ring, setRing] = React.useState(-1);
  const refs = React.useRef([]);
  const values = tabs.map((t) => (typeof t === 'string' ? t : t.value));
  // The tab stop belongs to the selected tab. A `value` matching nothing would
  // otherwise leave the strip with no stop at all and drop it out of the tab
  // order entirely, so the first tab takes it.
  const selected = values.indexOf(value);
  const stop = selected < 0 ? 0 : selected;

  const go = (i) => {
    const n = values.length;
    if (!n) return;
    const next = ((i % n) + n) % n;
    refs.current[next]?.focus();
    if (onChange) onChange(values[next]);
  };

  return (
    <div role="tablist" style={{ display: 'flex', gap: 20, ...style }} {...rest}>
      {tabs.map((t, i) => {
        const v = values[i];
        const label = typeof t === 'string' ? t : t.label;
        const active = v === value;
        const base = {
          position: 'relative', paddingBottom: 11, fontSize: 'var(--qm-type-row)',
          borderRadius: 'var(--qm-radius-key)',
          color: active ? 'var(--qm-text-2)' : 'var(--qm-text-5)', cursor: 'pointer'
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
            role="tab" aria-selected={active} tabIndex={i === stop ? 0 : -1}
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
            {label}
            {active ? (
              <span style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 2, borderRadius: 2, background: 'var(--qm-text-row)' }} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

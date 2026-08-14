import React from 'react';

/** Density and mode switch. Selection is a raised inner surface, never colour. */
export function SegmentedControl({ options = [], value, onChange, style, ...rest }) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 2, height: 34, padding: 3,
        borderRadius: 'var(--qm-radius-callout)', background: 'rgba(0,0,0,0.32)',
        border: '1px solid var(--qm-border-group)', ...style
      }}
      {...rest}
    >
      {options.map((o) => {
        const v = typeof o === 'string' ? o : o.value;
        const label = typeof o === 'string' ? o : o.label;
        const active = v === value;
        const outline = typeof o !== 'string' && o.outline;
        return (
          <div
            key={v} onClick={() => onChange && onChange(v)}
            style={{
              position: 'relative', height: 28, display: 'flex', alignItems: 'center',
              padding: '0 11px', borderRadius: 'var(--qm-radius-key)',
              fontSize: 'var(--qm-type-module)', color: 'var(--qm-text-row)', cursor: 'pointer'
            }}
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

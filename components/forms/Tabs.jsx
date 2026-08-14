import React from 'react';

/** Inspector tabs. A 2px neutral underline marks the active one. */
export function Tabs({ tabs = [], value, onChange, style, ...rest }) {
  return (
    <div style={{ display: 'flex', gap: 20, ...style }} {...rest}>
      {tabs.map((t) => {
        const v = typeof t === 'string' ? t : t.value;
        const label = typeof t === 'string' ? t : t.label;
        const active = v === value;
        return (
          <div
            key={v} onClick={() => onChange && onChange(v)}
            style={{
              position: 'relative', paddingBottom: 11, fontSize: 'var(--qm-type-row)',
              color: active ? 'var(--qm-text-2)' : 'var(--qm-text-5)', cursor: 'pointer'
            }}
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

import React from 'react';

/** The fixed 48/56px app bar: gradient graphite, one structural hairline beneath. */
export function TopBar({ tall, brand, breadcrumb, leading, center, children, style, ...rest }) {
  return (
    <div
      style={{
        height: tall ? 'var(--qm-topbar-h-tall)' : 'var(--qm-topbar-h)',
        display: 'flex', alignItems: 'center', gap: 14, padding: '0 18px',
        background: 'var(--qm-topbar)',
        borderBottom: '1px solid var(--qm-border-structural)', ...style
      }}
      {...rest}
    >
      {brand !== false ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: tall ? 24 : 22, height: tall ? 24 : 22, borderRadius: 6, background: 'var(--qm-mark)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)' }} />
          <span style={{ fontSize: tall ? 15 : 14.5, fontWeight: 'var(--qm-weight-semibold)', letterSpacing: '0.02em', color: 'var(--qm-text-1)' }}>QM</span>
          {breadcrumb ? (
            <>
              <span style={{ fontSize: 15, color: 'var(--qm-text-hairline)' }}>/</span>
              <span style={{ fontSize: 15, color: 'var(--qm-text-row)' }}>{breadcrumb}</span>
            </>
          ) : null}
        </div>
      ) : null}
      {leading ? <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>{leading}</div> : null}
      {center ? <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>{center}</div> : <span style={{ flex: 1 }} />}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{children}</div>
    </div>
  );
}

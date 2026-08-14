import React from 'react';
import { Icon } from '../core/Icon.jsx';

/** Transient surface: radius 12 on the raised surface, 60% scrim, 160ms enter. */
export function Overlay({ title, onClose, footer, children, width = 560, scrim, style, ...rest }) {
  const panel = (
    <div
      style={{
        width, borderRadius: 'var(--qm-radius-panel)', background: 'var(--qm-surface-raised)',
        border: '1px solid rgba(255,255,255,0.12)', boxShadow: 'var(--qm-shadow-overlay)',
        overflow: 'hidden', ...style
      }}
      {...rest}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--qm-border-panel)' }}>
        <span style={{ fontSize: 15, color: 'var(--qm-prose-2)' }}>{title}</span>
        <span
          onClick={onClose}
          style={{ width: 28, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--qm-radius-key)', color: 'var(--qm-text-6)', border: '1px solid var(--qm-border-control-quiet)', cursor: 'pointer' }}
        ><Icon name="x" size={13} /></span>
      </div>
      <div style={{ padding: '16px 20px' }}>{children}</div>
      {footer ? (
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--qm-border-group)', fontSize: 'var(--qm-type-label)', color: 'var(--qm-text-6)' }}>{footer}</div>
      ) : null}
    </div>
  );
  if (!scrim) return panel;
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--qm-fill-scrim)' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{panel}</div>
    </div>
  );
}

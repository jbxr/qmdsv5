import React from 'react';
import { StateDot } from '../core/StateDot.jsx';

/** Audience is a surface temperature, not an accent: lit warm room, unlit private. */
export function PanelHeader({ audience = 'plain', label, note, children, style, ...rest }) {
  const scene = audience === 'scene';
  const priv = audience === 'private';
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px',
        background: scene ? 'var(--qm-scene-surface)' : priv ? 'var(--qm-private-surface)' : 'transparent',
        borderBottom: scene
          ? '1px solid var(--qm-scene-border-soft)'
          : priv ? '1px dashed var(--qm-private-border)' : '1px solid var(--qm-border-group)',
        ...style
      }}
      {...rest}
    >
      {audience === 'plain' ? null : <StateDot state={scene ? 'scene' : 'private'} size={8} glow={scene} />}
      <span style={{
        fontSize: 'var(--qm-type-module)', fontWeight: 'var(--qm-weight-semibold)',
        letterSpacing: 'var(--qm-ls-module)',
        color: scene ? 'var(--qm-scene-label)' : priv ? 'var(--qm-text-4)' : 'var(--qm-text-row)'
      }}>{label}</span>
      {note ? (
        <span style={{ fontSize: 'var(--qm-type-label)', color: scene ? 'var(--qm-scene-text-dim)' : 'var(--qm-text-7)' }}>{note}</span>
      ) : null}
      <span style={{ flex: 1 }} />
      {children}
    </div>
  );
}

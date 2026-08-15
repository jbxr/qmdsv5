import React from 'react';
import { StateDot } from '../core/StateDot.jsx';
import { warnUnknown, pick } from '../core/warn.js';

// A table rather than three `audience === …` tests, for the reason `Card` gives:
// the surface and the hairline fell through to `plain` for an unrecognised
// audience while the dot below them still rendered — an unlit private glyph on
// a header that was claiming to be neither.
const AUDIENCES = {
  scene:   { surface: 'var(--qm-scene-surface)', edge: '1px solid var(--qm-scene-border-soft)', dot: 'scene', glow: true, label: 'var(--qm-scene-label)', note: 'var(--qm-scene-text-dim)' },
  private: { surface: 'var(--qm-private-surface)', edge: '1px dashed var(--qm-private-border)', dot: 'private', label: 'var(--qm-text-4)', note: 'var(--qm-text-7)' },
  plain:   { surface: 'transparent', edge: '1px solid var(--qm-border-group)', dot: null, label: 'var(--qm-text-row)', note: 'var(--qm-text-7)' }
};

/** Audience is a surface temperature, not an accent: lit warm room, unlit private. */
export function PanelHeader({ audience = 'plain', label, note, children, style, ...rest }) {
  const a = pick(AUDIENCES, audience, AUDIENCES.plain);
  warnUnknown('PanelHeader', 'audience', audience, AUDIENCES, 'plain');
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px',
        background: a.surface,
        borderBottom: a.edge,
        ...style
      }}
      {...rest}
    >
      {a.dot ? <StateDot state={a.dot} size={8} glow={a.glow} /> : null}
      <span style={{
        fontSize: 'var(--qm-type-module)', fontWeight: 'var(--qm-weight-semibold)',
        letterSpacing: 'var(--qm-ls-module)',
        color: a.label
      }}>{label}</span>
      {note ? (
        <span style={{ fontSize: 'var(--qm-type-label)', color: a.note }}>{note}</span>
      ) : null}
      <span style={{ flex: 1 }} />
      {children}
    </div>
  );
}

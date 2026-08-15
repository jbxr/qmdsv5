import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { warnUnknown, pick } from '../core/warn.js';

// `private` is the fallback as well as the default: it is the one audience that
// promises nothing leaves, and the lock glyph below is unconditional, so it is
// the only entry the rest of the component already agrees with. An audience we
// cannot read must not widen who hears the line.
const AUDIENCE = {
  private: { border: 'var(--qm-border-control-quiet)', dashed: false },
  character: { border: 'rgba(162,146,242,0.30)', dashed: false },
  direction: { border: 'var(--qm-border-dashed)', dashed: true },
  scene: { border: 'var(--qm-border-parchment)', dashed: false }
};

/** A line addressed to someone. Who you are talking to is where you are typing. */
export function PromptField({
  placeholder, value, audience = 'private', caret, hintKey = '⏎', trailing,
  focused, children, style, onFocus, onBlur, ...rest
}) {
  const [inner, setInner] = React.useState(false);
  const A = pick(AUDIENCE, audience, AUDIENCE.private);
  warnUnknown('PromptField', 'audience', audience, AUDIENCE, 'private');
  const wraps = value == null && placeholder == null;
  const ring = focused === undefined ? inner : focused;
  return (
    <div
      onFocus={(e) => { setInner(true); if (onFocus) onFocus(e); }}
      onBlur={(e) => { setInner(false); if (onBlur) onBlur(e); }}
      style={{
        display: 'flex', alignItems: 'center', gap: 8, height: 40,
        padding: '0 12px', borderRadius: 'var(--qm-radius-callout)',
        background: 'var(--qm-fill-inset)',
        border: `1px ${A.dashed ? 'dashed' : 'solid'} ${A.border}`,
        boxShadow: ring ? 'var(--qm-focus-ring)' : undefined,
        transition: 'box-shadow var(--qm-dur-hover) var(--qm-ease)',
        fontSize: 'var(--qm-type-row)',
        color: wraps || value ? 'var(--qm-text-3)' : 'var(--qm-text-7)', ...style
      }}
      {...rest}
    >
      <Icon name="lock" size={13} color="var(--qm-text-7)" />
      {wraps ? null : (
        <React.Fragment>
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value || placeholder}</span>
          {caret ? <span style={{ color: 'var(--qm-teal)' }}>▌</span> : null}
          <span style={{ flex: 1 }} />
        </React.Fragment>
      )}
      {children}
      {trailing}
      {hintKey ? (
        <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 'var(--qm-type-mono-chip)', color: 'var(--qm-text-6)' }}>{hintKey}</span>
      ) : null}
    </div>
  );
}

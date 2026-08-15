import React from 'react';
import { warnUnknown, pick } from './warn.js';

const H = { lg: 44, md: 36, sm: 34, xs: 32, xxs: 30, tiny: 28 };

// Hover lives in the table beside the rest state, never in a branch on the
// `variant` prop. A branch keys on the raw prop, so an unrecognised variant
// used to resolve `secondary`'s colours and then match no branch at all — a
// button that looked like a secondary and was dead under the pointer forever.
// Every variant carries a `hover`, so the fallback reaches it too.
const VARIANTS = {
  primary: {
    rest: {
      color: 'var(--qm-on-gold)', background: 'var(--qm-gold-fill)',
      fontWeight: 'var(--qm-weight-medium)', border: '1px solid transparent'
    },
    hover: { background: 'var(--qm-gold-fill-hover)' }
  },
  scene: {
    rest: {
      color: 'var(--qm-scene-ink)', background: 'var(--qm-parchment-fill)',
      fontWeight: 'var(--qm-weight-medium)', border: '1px solid transparent'
    },
    hover: { background: 'var(--qm-parchment-fill-hover)' }
  },
  sceneGhost: {
    rest: {
      color: 'var(--qm-scene-text)', background: 'transparent',
      border: '1px solid var(--qm-border-parchment)'
    },
    hover: { background: 'var(--qm-tint-parchment-strong)' }
  },
  secondary: {
    rest: {
      color: 'var(--qm-text-4)', background: 'transparent',
      border: '1px solid var(--qm-border-control)'
    },
    hover: { background: 'var(--qm-fill-hover)', color: 'var(--qm-text-2)' }
  },
  quiet: {
    rest: {
      color: 'var(--qm-text-3)', background: 'var(--qm-fill-rest)',
      border: '1px solid var(--qm-border-control-quiet)'
    },
    hover: { background: 'var(--qm-fill-hover-strong)' }
  },
  ghost: {
    rest: {
      color: 'var(--qm-text-4)', background: 'transparent', border: '1px solid transparent'
    },
    hover: { background: 'var(--qm-fill-hover)', color: 'var(--qm-text-2)' }
  },
  canon: {
    rest: {
      color: 'var(--qm-teal-text)', background: 'transparent',
      border: '1px solid var(--qm-border-teal-strong)'
    },
    hover: { background: 'var(--qm-tint-teal-strong)', color: 'var(--qm-teal-text-strong)' }
  },
  consult: {
    rest: {
      color: 'var(--qm-violet-text-alt)', background: 'transparent',
      border: '1px solid var(--qm-border-violet)'
    },
    hover: { background: 'var(--qm-tint-violet-strong)' }
  },
  destructive: {
    rest: {
      color: 'var(--qm-cinnabar-text)', background: 'var(--qm-tint-cinnabar-soft)',
      border: '1px solid var(--qm-border-cinnabar)'
    },
    hover: { background: 'var(--qm-tint-cinnabar)', color: 'var(--qm-cinnabar-text-strong)' }
  }
};

/**
 * One filled action per region. `primary` is the gold app action, `scene` the
 * parchment action that reaches the room; everything else is an outline —
 * `destructive` included, which carries cinnabar at rest and never on hover.
 * The focus ring sits outside the border box, so it survives the filled
 * variants, and only on keyboard focus — a pointer press leaves none behind.
 * It carries a transparent outline of the same size, which displaces the
 * browser's own indicator here and becomes the whole ring under forced-colors.
 */
export function Button({
  variant = 'secondary', size = 'sm', children, leadingIcon, trailingIcon,
  hint, disabled, fullWidth, style, onClick, onFocus, onBlur, onKeyDown, ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);
  // `ring` is sampled again on keydown, not only on focus: a button reached by
  // mouse and then typed at becomes `:focus-visible` where it stands, and a
  // focus-time sample alone would leave that user the browser's ring, not QM's.
  const [ring, setRing] = React.useState(false);
  const v = pick(VARIANTS, variant, VARIANTS.secondary);
  const height = pick(H, size, H.sm);
  warnUnknown('Button', 'variant', variant, VARIANTS, 'secondary');
  warnUnknown('Button', 'size', size, H, 'sm');
  const base = {
    height, display: fullWidth ? 'flex' : 'inline-flex', alignItems: 'center',
    justifyContent: 'center', gap: 8, width: fullWidth ? '100%' : undefined,
    padding: height >= 44 ? '0 16px' : height >= 34 ? '0 14px' : '0 11px',
    borderRadius: 'var(--qm-radius-control)',
    fontFamily: 'var(--qm-font-sans)',
    fontSize: height >= 44 ? 'var(--qm-type-body)' : 'var(--qm-type-secondary)',
    lineHeight: 1, cursor: disabled ? 'default' : 'pointer',
    transition: 'background var(--qm-dur-hover) var(--qm-ease), color var(--qm-dur-hover) var(--qm-ease)',
    ...v.rest
  };
  if (hover && !disabled) Object.assign(base, v.hover);
  if (!disabled && (down || ring)) {
    base.boxShadow = [down ? 'var(--qm-inset-press)' : null, ring ? 'var(--qm-focus-ring)' : null]
      .filter(Boolean).join(', ');
  }
  if (ring) {
    base.outline = 'var(--qm-focus-outline,2px solid transparent)';
    base.outlineOffset = 'var(--qm-focus-outline-offset,1px)';
  }
  if (disabled) {
    base.color = 'var(--qm-text-9)'; base.background = 'transparent';
    base.border = '1px solid var(--qm-border-disabled)';
  }
  return (
    <button
      type="button" disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setDown(false); }}
      onMouseDown={() => setDown(true)} onMouseUp={() => setDown(false)}
      onFocus={(e) => {
        if (!disabled && e.target.matches(':focus-visible')) setRing(true);
        if (onFocus) onFocus(e);
      }}
      onKeyDown={(e) => {
        if (!disabled && e.target.matches(':focus-visible')) setRing(true);
        if (onKeyDown) onKeyDown(e);
      }}
      onBlur={(e) => { setRing(false); setDown(false); if (onBlur) onBlur(e); }}
      style={{ ...base, ...style }} {...rest}
    >
      {leadingIcon}
      <span>{children}</span>
      {trailingIcon}
      {hint ? (
        <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 'var(--qm-type-mono-chip)', opacity: 0.72 }}>{hint}</span>
      ) : null}
    </button>
  );
}

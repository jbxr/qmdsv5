import React from 'react';
import { Icon } from '../core/Icon.jsx';

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Transient surface: radius 12 on the raised surface, 60% scrim.
 * With `scrim` it is a real modal — pinned to the viewport, named, focus moved
 * to the panel and Tab held inside it until it unmounts. Without one it is a
 * popover: it closes on Esc and ✕ and claims nothing else.
 */
export function Overlay({ title, onClose, footer, children, width = 560, scrim, style, ...rest }) {
  const panelRef = React.useRef(null);
  const headingId = React.useId();
  const [ring, setRing] = React.useState(false);
  const named = rest['aria-label'] != null || rest['aria-labelledby'] != null;

  React.useEffect(() => {
    if (!onClose) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  // A modal owns the focus for as long as it is up: into the panel — never onto
  // the first control, which would put a destructive action one ⏎ away — held
  // there by Tab, and handed back to whatever opened it on the way out.
  React.useEffect(() => {
    if (!scrim) return undefined;
    const opener = document.activeElement;
    if (panelRef.current) panelRef.current.focus();
    const onKey = (e) => {
      const panelEl = panelRef.current;
      if (e.key !== 'Tab' || !panelEl) return;
      const stops = panelEl.querySelectorAll(FOCUSABLE);
      const here = document.activeElement;
      if (!stops.length) { e.preventDefault(); panelEl.focus(); return; }
      const first = stops[0];
      const last = stops[stops.length - 1];
      if (!panelEl.contains(here)) { e.preventDefault(); (e.shiftKey ? last : first).focus(); }
      else if (e.shiftKey && (here === first || here === panelEl)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && here === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      if (opener && opener.focus) opener.focus();
    };
  }, [scrim]);

  const panel = (
    <div
      ref={panelRef}
      role={scrim ? 'dialog' : undefined}
      aria-modal={scrim ? 'true' : undefined}
      aria-labelledby={scrim && !named && title != null ? headingId : undefined}
      tabIndex={scrim ? -1 : undefined}
      style={{
        width, borderRadius: 'var(--qm-radius-panel)', background: 'var(--qm-surface-raised)',
        border: '1px solid rgba(255,255,255,0.12)', boxShadow: 'var(--qm-shadow-overlay)',
        overflow: 'hidden', outline: 'none', ...style
      }}
      {...rest}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--qm-border-panel)' }}>
        <span id={headingId} style={{ fontSize: 15, color: 'var(--qm-prose-2)' }}>{title}</span>
        <button
          type="button" aria-label="Close" onClick={onClose}
          onFocus={(e) => { if (e.target.matches(':focus-visible')) setRing(true); }}
          onBlur={() => setRing(false)}
          style={{
            width: 28, height: 28, padding: 0, margin: 0, appearance: 'none', background: 'transparent',
            font: 'inherit', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 'var(--qm-radius-key)', color: 'var(--qm-text-6)',
            border: '1px solid var(--qm-border-control-quiet)', cursor: 'pointer',
            boxShadow: ring ? 'var(--qm-focus-ring)' : undefined, outline: 'none'
          }}
        ><Icon name="x" size={13} /></button>
      </div>
      <div style={{ padding: '16px 20px' }}>{children}</div>
      {footer ? (
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--qm-border-group)', fontSize: 'var(--qm-type-label)', color: 'var(--qm-text-6)' }}>{footer}</div>
      ) : null}
    </div>
  );
  if (!scrim) return panel;
  return (
    // `fixed`, not `absolute`: a modal is anchored to what the user is looking
    // at, not to the top of a document they may have scrolled far past.
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--qm-space-5)', background: 'var(--qm-fill-scrim)' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ maxHeight: '100%', overflowY: 'auto' }}>{panel}</div>
    </div>
  );
}

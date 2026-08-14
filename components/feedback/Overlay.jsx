import React from 'react';
import ReactDOM from 'react-dom';
import { Icon } from '../core/Icon.jsx';

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/* -- the page, while a modal has it ------------------------------------------
 * One stack for the whole page rather than a snapshot per instance, because
 * modals do not have to close in the order they opened. When they don't, an
 * instance putting back "what I found" restores the *inner* modal's page last —
 * measurably leaving the whole document inert and unscrollable with nothing on
 * screen to explain it. The stack is also what makes the top one the top one:
 * Esc and Tab both ask it who owns the keyboard.
 */

/** Scrims currently up, oldest first. The last one owns the keyboard. */
const OPEN = [];

/** The page before the first modal: every `inert` overwritten since, and the
 *  body's own scrolling. Taken once on the way in, put back once on the way out. */
let held = null;

const owns = (scrimEl) => OPEN.length > 0 && OPEN[OPEN.length - 1] === scrimEl;

const giveBack = (el) => {
  const previous = held.inert.get(el);
  if (previous === null) el.removeAttribute('inert');
  else el.setAttribute('inert', previous);
  held.inert.delete(el);
};

/** The background is the portal's siblings — everything the top modal is not.
 *  Run on every open and every close, so a modal uncovered by the one above it
 *  gets its own attribute back rather than a guess at it. */
function suppressBackground() {
  const top = OPEN[OPEN.length - 1];
  for (const el of document.body.children) {
    if (el === top) {
      if (held.inert.has(el)) giveBack(el);
    } else {
      if (!held.inert.has(el)) held.inert.set(el, el.getAttribute('inert'));
      el.setAttribute('inert', '');
    }
  }
}

function hold(scrimEl) {
  OPEN.push(scrimEl);
  if (!held) {
    held = {
      inert: new Map(),
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
    };
    // Hiding the overflow takes the scrollbar with it and the page slides
    // sideways under the scrim, so the gutter is paid back. Its width is
    // measured, never assumed: 0 on an overlay scrollbar, ~15px on a classic one.
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    if (gutter > 0) {
      const paid = parseFloat(getComputedStyle(document.body).paddingRight) || 0;
      document.body.style.paddingRight = `${paid + gutter}px`;
    }
    document.body.style.overflow = 'hidden';
  }
  suppressBackground();
}

function release(scrimEl) {
  const at = OPEN.indexOf(scrimEl);
  if (at > -1) OPEN.splice(at, 1);
  if (!held) return;
  if (OPEN.length) { suppressBackground(); return; }
  for (const el of [...held.inert.keys()]) giveBack(el);
  document.body.style.overflow = held.overflow;
  document.body.style.paddingRight = held.paddingRight;
  held = null;
}

/**
 * Transient surface: radius 12 on the raised surface, 60% scrim.
 * With `scrim` it is a real modal — portalled to the body, pinned to the
 * viewport, named, and holding the page: the background goes `inert`, the body
 * stops scrolling, focus moves to the panel and Tab stays inside it until it
 * unmounts. Without one it is a popover: it renders where it is written, closes
 * on Esc and ✕, and claims nothing else.
 */
export function Overlay({ title, onClose, footer, children, width = 560, scrim, style, ...rest }) {
  const panelRef = React.useRef(null);
  const scrimRef = React.useRef(null);
  const headingId = React.useId();
  const [ring, setRing] = React.useState(false);
  const named = rest['aria-label'] != null || rest['aria-labelledby'] != null;

  React.useEffect(() => {
    if (!onClose) return undefined;
    // Esc dismisses one thing, and for modals that is the top one: a popover
    // listens whenever it is up, a modal only while it owns the page.
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (scrim && !owns(scrimRef.current)) return;
      onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, scrim]);

  // A modal owns the page for as long as it is up: the background is made
  // `inert`, the body stops scrolling, and the focus goes into the panel —
  // never onto the first control, which would put a destructive action one ⏎
  // away — held there by Tab. One effect, because the order is the contract:
  // `inert` blurs whatever it swallows, so the opener is read before it, and
  // handed the focus back after the last attribute is put back.
  React.useEffect(() => {
    if (!scrim) return undefined;
    const opener = document.activeElement;

    // The trap holds the keyboard; only `inert` takes the background out of the
    // accessibility tree as well, and a virtual cursor reads what the Tab order
    // no longer reaches.
    const scrimEl = scrimRef.current;
    hold(scrimEl);

    if (panelRef.current) panelRef.current.focus();
    const onKey = (e) => {
      const panelEl = panelRef.current;
      if (e.key !== 'Tab' || !panelEl || !owns(scrimEl)) return;
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
      release(scrimEl);
      // After the `inert` comes off, never before: an opener inside the
      // background cannot take the focus while the background is still frozen.
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
          onKeyDown={(e) => { if (e.target.matches(':focus-visible')) setRing(true); }}
          onBlur={() => setRing(false)}
          style={{
            width: 28, height: 28, padding: 0, margin: 0, appearance: 'none', background: 'transparent',
            font: 'inherit', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 'var(--qm-radius-key)', color: 'var(--qm-text-6)',
            border: '1px solid var(--qm-border-control-quiet)', cursor: 'pointer',
            boxShadow: ring ? 'var(--qm-focus-ring)' : undefined,
            outline: ring ? 'var(--qm-focus-outline,2px solid transparent)' : undefined,
            outlineOffset: ring ? 'var(--qm-focus-outline-offset,1px)' : undefined
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
  const modal = (
    // `fixed`, not `absolute`: a modal is anchored to what the user is looking
    // at, not to the top of a document they may have scrolled far past.
    <div ref={scrimRef} style={{ position: 'fixed', inset: 0, zIndex: 'var(--qm-z-scrim)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--qm-space-5)', background: 'var(--qm-fill-scrim)' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ maxHeight: '100%', overflowY: 'auto' }}>{panel}</div>
    </div>
  );
  // Only a modal portals, and it portals so that "the background" is a thing
  // that can be named: the body's other children. A popover stays where it was
  // written — one portalled out of a modal leaves the scrim's stacking context
  // and lands behind it.
  return ReactDOM.createPortal(modal, document.body);
}

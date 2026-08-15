import * as React from 'react';

/**
 * Modal / popover shell. Closes on backdrop, ✕ or Esc.
 * With `scrim` it is a modal dialog, portalled to `document.body`; without one
 * it is a popover that renders in place and takes neither the dialog semantics
 * nor the focus.
 */
export interface OverlayProps
  // `title` is the overlay's heading, so the DOM `title` tooltip attribute is
  // traded away — an overlay never wants a tooltip on its own panel.
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** The overlay's heading, not a tooltip. Also names the dialog for assistive
   *  tech, unless you pass your own `aria-label` / `aria-labelledby`. */
  title?: React.ReactNode;
  onClose?: () => void;
  /** Quiet line at the bottom, e.g. what "local" means. */
  footer?: React.ReactNode;
  /** The panel's width, and a ceiling rather than a fixed size: it is clamped to
   *  `100%` of what contains it, so a modal never overflows a narrow viewport. */
  width?: number | string;
  /** Render the 60% scrim, pin the panel to the viewport, and make the panel a
   *  real modal: portalled to `document.body`, `role="dialog"`, `aria-modal`,
   *  the rest of the body `inert` and the body itself unscrollable, focus moved
   *  into it, Tab trapped inside it, and every one of those put back — focus on
   *  the opener — when it unmounts. Portalling makes it client-only. */
  scrim?: boolean;
  children?: React.ReactNode;
}

export declare function Overlay(props: OverlayProps): React.JSX.Element;

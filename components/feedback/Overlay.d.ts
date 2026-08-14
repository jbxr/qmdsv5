import * as React from 'react';

/**
 * Modal / popover shell. Closes on backdrop, ✕ or Esc.
 * With `scrim` it is a modal dialog; without one it is a popover that takes
 * neither the dialog semantics nor the focus.
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
  width?: number | string;
  /** Render the 60% scrim, pin the panel to the viewport, and make the panel a
   *  real modal: `role="dialog"`, `aria-modal`, focus moved into it, Tab trapped
   *  inside it, focus restored to the opener when it unmounts. */
  scrim?: boolean;
  children?: React.ReactNode;
}

export declare function Overlay(props: OverlayProps): React.JSX.Element;

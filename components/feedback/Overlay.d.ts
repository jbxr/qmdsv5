import * as React from 'react';

/** Modal / popover shell. Closes on backdrop, ✕ or Esc. */
export interface OverlayProps
  // `title` is the overlay's heading, so the DOM `title` tooltip attribute is
  // traded away — an overlay never wants a tooltip on its own panel.
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** The overlay's heading, not a tooltip. */
  title?: React.ReactNode;
  onClose?: () => void;
  /** Quiet line at the bottom, e.g. what "local" means. */
  footer?: React.ReactNode;
  width?: number | string;
  /** Render the 60% scrim and centre the panel in its container. */
  scrim?: boolean;
  children?: React.ReactNode;
}

export declare function Overlay(props: OverlayProps): JSX.Element;

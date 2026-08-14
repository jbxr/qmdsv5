import * as React from 'react';

/** Modal / popover shell. Closes on backdrop, ✕ or Esc. */
export interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
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

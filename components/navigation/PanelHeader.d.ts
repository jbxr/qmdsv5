import * as React from 'react';

/**
 * Header for a rail, dock or panel. `scene` = warm parchment-lit (everyone in
 * the room hears this); `private` = unlit with a dashed edge (off-stage).
 */
export interface PanelHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The surface, the hairline, the label ink and the dot are one row, so an
   * audience outside the union renders as `plain` whole. It used to take
   * `plain`'s surface and hairline and still show a private dot on top.
   */
  audience?: 'scene' | 'private' | 'plain';
  /** Module label — uppercase, 12.5px semibold, 0.16em tracking. */
  label: React.ReactNode;
  /** Plain-language explanation of who can hear this. */
  note?: React.ReactNode;
  /** Trailing controls or counts. */
  children?: React.ReactNode;
}

export declare function PanelHeader(props: PanelHeaderProps): React.JSX.Element;

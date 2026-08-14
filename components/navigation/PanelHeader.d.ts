import * as React from 'react';

/**
 * Header for a rail, dock or panel. `scene` = warm parchment-lit (everyone in
 * the room hears this); `private` = unlit with a dashed edge (off-stage).
 */
export interface PanelHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  audience?: 'scene' | 'private' | 'plain';
  /** Module label — uppercase, 12.5px semibold, 0.16em tracking. */
  label: React.ReactNode;
  /** Plain-language explanation of who can hear this. */
  note?: React.ReactNode;
  /** Trailing controls or counts. */
  children?: React.ReactNode;
}

export declare function PanelHeader(props: PanelHeaderProps): JSX.Element;

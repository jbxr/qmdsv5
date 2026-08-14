import * as React from 'react';

/**
 * QM's app bar. Left: mark and breadcrumb. Centre: the object being worked on or
 * the ⌘K locator. Right: status, density, and the region's one gold action.
 */
export interface TopBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 56px instead of 48px — used on the outline. */
  tall?: boolean;
  /** Pass false to omit the QM mark (scene room hides it). */
  brand?: false | React.ReactNode;
  breadcrumb?: React.ReactNode;
  /** Left-hand cluster after the mark — live status, story-time chip. */
  leading?: React.ReactNode;
  /** Centred locator or scene title. */
  center?: React.ReactNode;
  /** Right-hand cluster. */
  children?: React.ReactNode;
}

export declare function TopBar(props: TopBarProps): React.JSX.Element;

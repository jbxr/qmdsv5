import * as React from 'react';

/**
 * A way into a surface from a scene row. Always shown, in one of three states.
 * `onClick` is what makes it a control: with it the chip is a `button` that
 * answers ⏎ and Space and draws `--qm-focus-ring`; without it the chip opens
 * nothing, so it is neither focusable nor announced as one.
 */
export interface RouteChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  /** count = the surface has material · invitation = empty, so ask · unknown = drafts unreadable. */
  state?: 'count' | 'invitation' | 'unknown';
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export declare function RouteChip(props: RouteChipProps): React.JSX.Element;

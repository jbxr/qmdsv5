import * as React from 'react';

/**
 * One event in the chronology rail.
 *
 * A row owns no list, so a row given `onClick` becomes a `button` — its own tab
 * stop, ⏎ and Space, `--qm-focus-ring`, and `aria-current` while `selected`.
 * A row without `onClick` is a caption and stays out of the tab order.
 */
export interface TimelineRowProps
  // `title` is the event's own title, so the DOM `title` tooltip attribute is
  // traded away — pass a tooltip via `aria-label` or a wrapper instead.
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  /** Mono meta line — "Luna Station · depth 1". Hidden in compact density. */
  meta?: React.ReactNode;
  /** Initials of the actor the event concerns, or "—". */
  who?: string;
  /**
   * `unlinked` is a row with no canonical event behind it yet — dashed gold,
   * attention rather than fault. Never reach for `conflict` to say it: cinnabar
   * means two things disagree, not that one is unattached.
   *
   * The rail, its glow, the dot and the avatar's kind all come from the same
   * row, so a state outside the union takes the grey `StateDot` itself falls
   * back to — rail and dot together, never `canon`, since a fallback must not
   * assert canonicity.
   */
  state?: 'canon' | 'proposed' | 'suggested' | 'here' | 'conflict' | 'unlinked';
  /** Raised surface plus a state-coloured rail. */
  selected?: boolean;
  /** Show the coral HERE flag on this row. */
  here?: boolean;
}

export declare function TimelineRow(props: TimelineRowProps): React.JSX.Element;

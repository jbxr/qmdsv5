import * as React from 'react';

/**
 * One event in the chronology rail.
 */
export interface TimelineRowProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode;
  /** Mono meta line — "Luna Station · depth 1". Hidden in compact density. */
  meta?: React.ReactNode;
  /** Initials of the actor the event concerns, or "—". */
  who?: string;
  state?: 'canon' | 'proposed' | 'suggested' | 'here' | 'conflict';
  /** Raised surface plus a state-coloured rail. */
  selected?: boolean;
  /** Show the coral HERE flag on this row. */
  here?: boolean;
}

export declare function TimelineRow(props: TimelineRowProps): JSX.Element;

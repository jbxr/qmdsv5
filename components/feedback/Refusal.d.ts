import * as React from 'react';

/**
 * A refused key press explaining itself. Not an error: structural grey plus the
 * key that works instead. Appears at the caret, lives 4s, never stacks.
 */
export interface RefusalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The key the author actually pressed. */
  pressed?: React.ReactNode;
  children?: React.ReactNode;
}

export declare function Refusal(props: RefusalProps): JSX.Element;

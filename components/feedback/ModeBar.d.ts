import * as React from 'react';

/** Hint bar across the top of a surface announcing an active mode. Esc always leaves. */
export interface ModeBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** linking (gold) · inspect (blue) · peek (coral, looking away from the anchor). */
  mode?: 'linking' | 'inspect' | 'peek';
  children?: React.ReactNode;
  /** The key that leaves, shown at the trailing edge. */
  exitKey?: React.ReactNode;
}

export declare function ModeBar(props: ModeBarProps): React.JSX.Element;

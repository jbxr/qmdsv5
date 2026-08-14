import * as React from 'react';

/** Mono status line under the app bar (path and depth on the left, counts on the right). */
export interface StatusBarProps extends React.HTMLAttributes<HTMLDivElement> {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export declare function StatusBar(props: StatusBarProps): React.JSX.Element;

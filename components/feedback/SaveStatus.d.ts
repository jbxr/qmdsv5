import * as React from 'react';

/** Draft / saving / saved-write-once / offline. Two promises, two indicators. */
export interface SaveStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  state?: 'local' | 'saving' | 'saved' | 'offline';
  /** Mono tag at the trailing edge ("browser", "POST", "locked"). */
  tag?: React.ReactNode;
  /** Compact form for the top bar: dot + label only. */
  inline?: boolean;
  children?: React.ReactNode;
}

export declare function SaveStatus(props: SaveStatusProps): React.JSX.Element;

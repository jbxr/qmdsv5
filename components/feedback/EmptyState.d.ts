import * as React from 'react';

/** empty = invites · offline = reassures · unknown = admits (dashed). Never cinnabar. */
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  kind?: 'empty' | 'offline' | 'unknown';
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export declare function EmptyState(props: EmptyStateProps): React.JSX.Element;

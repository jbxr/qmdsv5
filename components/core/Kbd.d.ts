import * as React from 'react';

/** Mono key token. `local` is the dashed "never leaves the browser" tag. */
export interface KbdProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  variant?: 'key' | 'local';
  style?: React.CSSProperties;
}

export declare function Kbd(props: KbdProps): React.JSX.Element;

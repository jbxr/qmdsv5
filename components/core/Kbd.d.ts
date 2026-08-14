import * as React from 'react';

/** Mono key token. `local` is the dashed "never leaves the browser" tag. */
export interface KbdProps {
  children?: React.ReactNode;
  variant?: 'key' | 'local';
  style?: React.CSSProperties;
}

export declare function Kbd(props: KbdProps): JSX.Element;

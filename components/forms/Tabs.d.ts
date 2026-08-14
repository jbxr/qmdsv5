import * as React from 'react';

/** Panel tabs — Details / Character / Consult / History in the outline inspector. */
export interface TabsProps {
  tabs?: Array<string | { value: string; label?: React.ReactNode }>;
  value?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

export declare function Tabs(props: TabsProps): JSX.Element;

import * as React from 'react';

/** Panel tabs — Details / Character / Consult / History in the outline inspector. */
export interface TabsProps
  // `onChange` reports the chosen tab's value, so the DOM `onChange` form
  // handler is traded away — it never fires on the wrapping div anyway.
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  tabs?: Array<string | { value: string; label?: React.ReactNode }>;
  value?: string;
  onChange?: (value: string) => void;
}

export declare function Tabs(props: TabsProps): JSX.Element;

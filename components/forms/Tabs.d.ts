import * as React from 'react';

/**
 * Panel tabs — Details / Character / Consult / History in the outline
 * inspector. The strip is a `tablist` and each tab a `tab` with
 * `aria-selected`: Tab reaches the group once, ←→ (and ↑↓, Home, End) move
 * within it and select as they go, and the focused tab draws `--qm-focus-ring`.
 * Give the group an accessible name with `aria-label`.
 */
export interface TabsProps
  // `onChange` reports the chosen tab's value, so the DOM `onChange` form
  // handler is traded away — it never fires on the wrapping div anyway.
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  tabs?: Array<string | { value: string; label?: React.ReactNode }>;
  value?: string;
  onChange?: (value: string) => void;
}

export declare function Tabs(props: TabsProps): React.JSX.Element;

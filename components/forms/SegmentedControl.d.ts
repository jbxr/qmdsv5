import * as React from 'react';

export interface SegmentedOption { value: string; label?: React.ReactNode; /** Ringed instead of filled — used for Focus. */ outline?: boolean }

/** Mutually exclusive switch, e.g. Comfortable / Compact / Focus. */
export interface SegmentedControlProps
  // `onChange` reports the chosen option's value, so the DOM `onChange` form
  // handler is traded away — it never fires on the wrapping div anyway.
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options?: Array<string | SegmentedOption>;
  value?: string;
  onChange?: (value: string) => void;
}

export declare function SegmentedControl(props: SegmentedControlProps): React.JSX.Element;

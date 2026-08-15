import * as React from 'react';

export interface SegmentedOption { value: string; label?: React.ReactNode; /** Ringed instead of filled — used for Focus. */ outline?: boolean }

/**
 * Mutually exclusive switch, e.g. Comfortable / Compact / Focus. One value out
 * of several is a radio group, so the strip is a `radiogroup` and each option a
 * `radio` with `aria-checked`: one tab stop, arrows move and select, and the
 * focused option draws `--qm-focus-ring`. Give the group an `aria-label`.
 */
export interface SegmentedControlProps
  // `onChange` reports the chosen option's value, so the DOM `onChange` form
  // handler is traded away — it never fires on the wrapping div anyway.
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options?: Array<string | SegmentedOption>;
  value?: string;
  onChange?: (value: string) => void;
}

export declare function SegmentedControl(props: SegmentedControlProps): React.JSX.Element;

import * as React from 'react';

export interface SegmentedOption { value: string; label?: React.ReactNode; /** Ringed instead of filled — used for Focus. */ outline?: boolean }

/** Mutually exclusive switch, e.g. Comfortable / Compact / Focus. */
export interface SegmentedControlProps {
  options?: Array<string | SegmentedOption>;
  value?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

export declare function SegmentedControl(props: SegmentedControlProps): JSX.Element;

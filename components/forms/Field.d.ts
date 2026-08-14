import * as React from 'react';

/**
 * A labelled inset field — text, mono (story-time, ids) or serif (titles and
 * descriptions of authored material).
 */
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  /** Right-aligned counter or aside on the label row ("2 chosen · 18 in the catalogue"). */
  hint?: React.ReactNode;
  value?: React.ReactNode;
  placeholder?: React.ReactNode;
  kind?: 'text' | 'mono' | 'serif';
  /** Renders the chevron and a pointer cursor. */
  select?: boolean;
  width?: number | string;
  size?: 'sm' | 'md' | 'lg';
  /** Shows the 2px teal focus ring. */
  focused?: boolean;
  children?: React.ReactNode;
}

export declare function Field(props: FieldProps): JSX.Element;

import * as React from 'react';

/**
 * A labelled inset field — text, mono (story-time, ids) or serif (titles and
 * descriptions of authored material).
 *
 * Presentational when given `value`/`placeholder`; a wrapper when given neither,
 * in which case `children` are the content of the well. The ring lights on its
 * own whenever focus lands inside the well, so a control needs no focus state
 * lifted into the consumer. `TextField` and `TextArea` are this wrapper with a
 * real control already in it.
 */
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  /** `id` of the control the label belongs to — renders the label as a real `<label>`. */
  labelFor?: string;
  /** Right-aligned counter or aside on the label row ("2 chosen · 18 in the catalogue"). */
  hint?: React.ReactNode;
  value?: React.ReactNode;
  placeholder?: React.ReactNode;
  kind?: 'text' | 'mono' | 'serif';
  /** Renders the chevron and a pointer cursor. */
  select?: boolean;
  width?: number | string;
  size?: 'sm' | 'md' | 'lg';
  /**
   * Overrides the ring in both directions. Leave unset and the well lights its
   * own 2px teal ring on `focus`; set it only for the presentational case, where
   * a focused-looking field holds no real control.
   */
  focused?: boolean;
  /** Grows the well downward from `size` instead of pinning it — for `<textarea>`. */
  multiline?: boolean;
  /**
   * Drops the well to the disabled ramp and suppresses the ring. QM always puts
   * the reason next to a disabled control, never in a tooltip.
   */
  disabled?: boolean;
  children?: React.ReactNode;
}

export declare function Field(props: FieldProps): React.JSX.Element;

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
   * Specimens and gallery cards only — never a product surface. A QM focus ring
   * means keyboard focus and nothing else, and this overrides it in both
   * directions: `true` shows a focus nobody has, `false` hides a real one. It is
   * honest in exactly one case, the presentational well that holds no control to
   * focus, which is what a specimen picturing a focused field needs. Anywhere a
   * real control sits in the well, leave it unset: the well lights its own ring
   * on focus, with no focus state lifted into the consumer.
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

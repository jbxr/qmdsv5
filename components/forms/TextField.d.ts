import * as React from 'react';

/**
 * The QM text input: a real `<input>` inside `Field`'s inset well, inheriting
 * the well's family, size and colour. Every prop the well does not claim goes
 * to the input, so `value`, `defaultValue`, `onChange`, `placeholder`, `type`,
 * `name`, `disabled`, `readOnly` and the rest behave natively.
 */
export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'width'> {
  label?: React.ReactNode;
  /** Right-aligned counter or aside on the label row ("38 / 60"). */
  hint?: React.ReactNode;
  /** `serif` for authored titles, `mono` for story-time and ids. */
  kind?: 'text' | 'mono' | 'serif';
  size?: 'sm' | 'md' | 'lg';
  width?: number | string;
  /**
   * Leave unset. `Field.focused` is for specimens whose well holds no control,
   * and this component always holds a real `<input>` — so here it can only lie:
   * `true` shows a focus nobody has, `false` hides a real one. A QM focus ring
   * means keyboard focus, and the well lights its own.
   */
  focused?: boolean;
  /** Sits after the input inside the well: a counter, a unit, a clear affordance. */
  trailing?: React.ReactNode;
  /** Applied to the wrapper, matching `Field` — use `controlStyle` for the input. */
  style?: React.CSSProperties;
  controlStyle?: React.CSSProperties;
}

export declare const TextField: React.ForwardRefExoticComponent<
  TextFieldProps & React.RefAttributes<HTMLInputElement>
>;

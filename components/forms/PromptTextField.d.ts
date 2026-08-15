import * as React from 'react';
import { PromptAudience } from './PromptField';

/**
 * The addressed QM text input: a real `<input>` inside `PromptField`'s well, so
 * a line that must both accept typing and show who will hear it is one component
 * rather than a hand-rolled pair. Every prop the well does not claim goes to the
 * input, so `value`, `defaultValue`, `onChange`, `placeholder`, `name`,
 * `disabled`, `readOnly`, `onKeyDown` and the rest behave natively.
 *
 * The well carries no label row, so give the input an `aria-label` — the border
 * names the recipient to the eye but not to a screen reader.
 */
export interface PromptTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  audience?: PromptAudience;
  /** Mono key hint pinned to the right of the well. Defaults to `⏎`; pass `null` to drop it. */
  hintKey?: React.ReactNode;
  /** Sits between the input and the key hint: a send affordance, a counter, a chip. */
  trailing?: React.ReactNode;
  /**
   * Leave unset. `PromptField.focused` is for specimens whose well holds no
   * control, and this component always holds a real `<input>` — so here it can
   * only lie: `true` shows a focus nobody has, `false` hides a real one. A QM
   * focus ring means keyboard focus, and the well lights its own.
   */
  focused?: boolean;
  /** Applied to the wrapper, matching `PromptField` — use `controlStyle` for the input. */
  style?: React.CSSProperties;
  controlStyle?: React.CSSProperties;
}

export declare const PromptTextField: React.ForwardRefExoticComponent<
  PromptTextFieldProps & React.RefAttributes<HTMLInputElement>
>;

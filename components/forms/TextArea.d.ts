import * as React from 'react';

/**
 * The QM multi-line input: a real `<textarea>` inside `Field`'s inset well,
 * which grows downward from `size` rather than being pinned to it. Every prop
 * the well does not claim goes to the textarea.
 */
export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'width'> {
  label?: React.ReactNode;
  /** Right-aligned counter or aside on the label row ("240 words"). */
  hint?: React.ReactNode;
  /** `serif` for anything read as prose — logline, description, a note. */
  kind?: 'text' | 'mono' | 'serif';
  /** Sets the well's floor height, not the textarea's: 36 / 38 / 44. */
  size?: 'sm' | 'md' | 'lg';
  width?: number | string;
  /** Pins the ring on regardless of real focus. Leave unset — the well lights its own. */
  focused?: boolean;
  /** QM controls do not show a drag handle by default. */
  resize?: 'none' | 'vertical';
  /** Applied to the wrapper, matching `Field` — use `controlStyle` for the textarea. */
  style?: React.CSSProperties;
  controlStyle?: React.CSSProperties;
}

export declare const TextArea: React.ForwardRefExoticComponent<
  TextAreaProps & React.RefAttributes<HTMLTextAreaElement>
>;

import * as React from 'react';

/**
 * The private line to a character, a stage direction, or the assistant composer.
 * The lock glyph and the border say who will hear it.
 */
export interface PromptFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: React.ReactNode;
  value?: React.ReactNode;
  /** private = only you · character = a violet line to one character · direction = dashed stage-direct · scene = reaches the room. */
  audience?: 'private' | 'character' | 'direction' | 'scene';
  /** Show the teal caret block. */
  caret?: boolean;
  hintKey?: React.ReactNode;
  trailing?: React.ReactNode;
}

export declare function PromptField(props: PromptFieldProps): JSX.Element;

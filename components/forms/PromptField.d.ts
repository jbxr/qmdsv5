import * as React from 'react';

/**
 * Who will hear the line. `private` = only you · `character` = a violet line to
 * one character · `direction` = dashed stage-direct · `scene` = reaches the room.
 * Exported so a consuming app can name the vocabulary instead of copying it —
 * a widened or renamed audience then lands as a type error, not as a wrong border.
 */
export type PromptAudience = 'private' | 'character' | 'direction' | 'scene';

/**
 * The private line to a character, a stage direction, or the assistant composer.
 * The lock glyph and the border say who will hear it.
 *
 * Presentational when given `value`/`placeholder`; a wrapper when given neither,
 * in which case `children` are the content of the well. The ring lights on its
 * own whenever focus lands inside the well, so a control needs no focus state
 * lifted into the consumer. `PromptTextField` is this wrapper with a real
 * control already in it.
 */
export interface PromptFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: React.ReactNode;
  value?: React.ReactNode;
  audience?: PromptAudience;
  /** Show the teal caret block — the presentational stand-in for a control that is not there. */
  caret?: boolean;
  hintKey?: React.ReactNode;
  trailing?: React.ReactNode;
  /**
   * Overrides the ring in both directions: `true` shows a focus nobody has,
   * `false` hides a real one. It is honest in exactly one case, the presentational
   * well that holds no control to focus, which is what a specimen picturing an
   * addressed field needs. Anywhere a real control sits in the well, leave it
   * unset: the well lights its own ring on focus.
   */
  focused?: boolean;
  children?: React.ReactNode;
}

export declare function PromptField(props: PromptFieldProps): React.JSX.Element;

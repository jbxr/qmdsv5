import * as React from 'react';

/** Italic serif aside behind a 2px rule — author notes, consult reads, stage directions. */
export interface NoteBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /**
   * The rule, the well behind it and the ink are one row, so a tone outside the
   * union renders as `neutral` whole. It used to take the neutral rule over a
   * transparent well — neither of the three tones this declares.
   */
  tone?: 'neutral' | 'consult' | 'scene';
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}

export declare function NoteBlock(props: NoteBlockProps): React.JSX.Element;

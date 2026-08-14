import * as React from 'react';

/** Italic serif aside behind a 2px rule — author notes, consult reads, stage directions. */
export interface NoteBlockProps {
  children?: React.ReactNode;
  tone?: 'neutral' | 'consult' | 'scene';
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}

export declare function NoteBlock(props: NoteBlockProps): JSX.Element;

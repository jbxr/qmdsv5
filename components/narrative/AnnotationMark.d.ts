import * as React from 'react';

/**
 * Deterministic signal that travels with authored material: neutral mono for
 * measurements, ochre for advisory, cinnabar for damage, dashed for unparsed.
 */
export interface AnnotationMarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  tone?: 'measure' | 'good' | 'advisory' | 'damaged' | 'unparsed' | 'provenance';
  /** Optional 6-8px shape (StateDot or a triangle) — required whenever the tone carries colour. */
  glyph?: React.ReactNode;
  style?: React.CSSProperties;
}

export declare function AnnotationMark(props: AnnotationMarkProps): React.JSX.Element;

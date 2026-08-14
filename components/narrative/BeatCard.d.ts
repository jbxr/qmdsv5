import * as React from 'react';

/** The opened beat: state chip, serif title, optional directive, signals and actions. */
export interface BeatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  state?: 'proposed' | 'canon' | 'here' | 'none';
  /** Story-time of the beat, e.g. "Y−40". */
  era?: string;
  /** Entity the beat concerns, e.g. "Sarita Fernandes". */
  entity?: string;
  title: React.ReactNode;
  /** The italic authored instruction, e.g. "without naming it yet". */
  directive?: React.ReactNode;
  /** AnnotationMark row. */
  signals?: React.ReactNode;
  /** Buttons: Make canon / Edit here / Consult. */
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export declare function BeatCard(props: BeatCardProps): JSX.Element;

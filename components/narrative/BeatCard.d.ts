import * as React from 'react';

/** The opened beat: state chip, serif title, optional directive, signals and actions. */
export interface BeatCardProps
  // `title` is the beat's own title, so the DOM `title` tooltip attribute is
  // traded away — pass a tooltip via `aria-label` or a wrapper instead.
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
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

export declare function BeatCard(props: BeatCardProps): React.JSX.Element;

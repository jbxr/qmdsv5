import * as React from 'react';

/** The opened beat: state chip, serif title, optional directive, signals and actions. */
export interface BeatCardProps
  // `title` is the beat's own title, so the DOM `title` tooltip attribute is
  // traded away — pass a tooltip via `aria-label` or a wrapper instead.
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * The rail, the chip's ink, its label and its dot are one row, so a state
   * outside the union renders as `none` whole — no rail, no breathing dot —
   * rather than as a railless card still labelled PROPOSED. `none` rather than
   * the declared default: a state nobody can read claims no material state.
   */
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

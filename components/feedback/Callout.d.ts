import * as React from 'react';

/**
 * Explanatory surface attached to material. `conflict` (cinnabar triangle) is
 * reserved for genuinely wrong material — never for a pending or refused action.
 */
export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: 'conflict' | 'canon' | 'proposed' | 'consult' | 'neutral';
  /** Override the shape. Pass null for none. */
  glyph?: React.ReactNode;
  children?: React.ReactNode;
  /** Expandable "Why this matters" line under the message. */
  action?: React.ReactNode;
}

export declare function Callout(props: CalloutProps): React.JSX.Element;

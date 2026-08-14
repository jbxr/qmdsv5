import * as React from 'react';

/** Story-time marker in mono — "Y−6 D1", "Y35.100", or the grey "timeless". */
export interface EraChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  /** time = anchored · timeless = no story-time · peek = looking away from the anchor · teaching = dashed specimen. */
  kind?: 'time' | 'timeless' | 'peek' | 'teaching';
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}

export declare function EraChip(props: EraChipProps): React.JSX.Element;

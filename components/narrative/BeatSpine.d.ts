import * as React from 'react';

export interface BeatSpineItem {
  id?: string | number;
  /** Row number in Compose; omit in the stage and outline rails. */
  n?: string | number;
  text: string;
  /** written/canon = filled dot · proposed = ring · suggested = diamond · here = coral + HERE flag · ahead/unwritten = hollow grey. */
  state?: 'written' | 'canon' | 'proposed' | 'suggested' | 'here' | 'ahead' | 'unwritten';
  meta?: React.ReactNode;
}

/**
 * The single beat list used by the outline rail, the scene-room stage rail and
 * Compose's beat column.
 */
export interface BeatSpineProps {
  beats?: BeatSpineItem[];
  onSelect?: (beat: BeatSpineItem, index: number) => void;
  /** Draw the vertical connector and hang dots off it. */
  showSpine?: boolean;
  style?: React.CSSProperties;
}

export declare function BeatSpine(props: BeatSpineProps): JSX.Element;

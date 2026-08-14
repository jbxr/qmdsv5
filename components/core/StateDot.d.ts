import * as React from 'react';

/**
 * Material-state glyph: filled dot = canonical/written, hollow ring = proposed,
 * violet diamond = suggested, coral = where you are, cinnabar = conflict.
 */
export interface StateDotProps {
  /**
   * A state outside this union degrades to `neutral` — grey, filled, claiming
   * nothing. It never falls back to `canon`: an unrecognised state must not be
   * able to assert canonicity.
   */
  state?: 'canon' | 'written' | 'proposed' | 'suggested' | 'here' | 'conflict'
        | 'unwritten' | 'unlinked' | 'entity' | 'neutral' | 'private' | 'scene';
  /** 6-9px. 8 is the standard status glyph; 7 inside chips; 9 on timeline rows. */
  size?: number;
  /** Adds the state's own glow — reserve for live, here and in-scene. */
  glow?: boolean;
  /** Breathing pulse (1.4s) for pending/consulting. Never a spinner. */
  pulse?: boolean;
  style?: React.CSSProperties;
}

export declare function StateDot(props: StateDotProps): JSX.Element;

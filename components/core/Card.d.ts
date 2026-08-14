import * as React from 'react';

/**
 * QM surface container: panel (rails/inspector), raised (active content),
 * selected (highest, blue cast), beat (outline beat card), scene (in-scene warm).
 *
 * A card without a rail sets no `position` and no `overflow`, so a consumer
 * stylesheet can position it (fixed, absolute, sticky) and scroll it.
 *
 * The edge is written as `border-width` / `border-style` / `border-color`
 * longhands rather than the `border` shorthand, so the `hoverable` colour swap
 * cannot leave `border-color` resolving to `currentColor`.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  surface?: 'panel' | 'raised' | 'selected' | 'beat' | 'scene' | 'quiet';
  /**
   * 3px left accent rail = material state. Never used for selection.
   * Anything but `'none'` makes the card `position: relative; overflow: hidden`
   * so the rail is contained and clipped to the radius.
   */
  rail?: 'none' | 'parchment' | 'gold' | 'teal' | 'coral';
  radius?: 'card' | 'panel';
  padding?: number | string;
  /** Brightens the surface on hover — never introduces semantic colour. */
  hoverable?: boolean;
  children?: React.ReactNode;
}

export declare function Card(props: CardProps): React.JSX.Element;

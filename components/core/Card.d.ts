import * as React from 'react';

/**
 * QM surface container: panel (rails/inspector), raised (active content),
 * selected (highest, blue cast), beat (outline beat card), scene (in-scene warm).
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  surface?: 'panel' | 'raised' | 'selected' | 'beat' | 'scene' | 'quiet';
  /** 3px left accent rail = material state. Never used for selection. */
  rail?: 'none' | 'parchment' | 'gold' | 'teal' | 'coral';
  radius?: 'card' | 'panel';
  padding?: number | string;
  /** Brightens the surface on hover — never introduces semantic colour. */
  hoverable?: boolean;
  children?: React.ReactNode;
}

export declare function Card(props: CardProps): JSX.Element;

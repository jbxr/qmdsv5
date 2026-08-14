import * as React from 'react';

/**
 * QM action control. One filled button per region: gold for the app, parchment
 * for anything that reaches the room.
 */
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  /** primary = gold app action; scene = parchment in-scene action; canon/consult inherit a destination state's accent. */
  variant?: 'primary' | 'scene' | 'sceneGhost' | 'secondary' | 'quiet' | 'ghost' | 'canon' | 'consult';
  /** lg 44 · md 36 · sm 34 · xs 32 · xxs 30 · tiny 28 (px height). */
  size?: 'lg' | 'md' | 'sm' | 'xs' | 'xxs' | 'tiny';
  children?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  /** Mono keyboard hint rendered at the trailing edge, e.g. "H" or "⏎". */
  hint?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

export declare function Button(props: ButtonProps): JSX.Element;

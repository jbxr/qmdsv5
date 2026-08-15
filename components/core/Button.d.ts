import * as React from 'react';

/**
 * QM action control. One filled button per region: gold for the app, parchment
 * for anything that reaches the room. Every variant draws `--qm-focus-ring`
 * outside its border box on `:focus-visible`, over a transparent
 * `--qm-focus-outline` that survives forced-colors; `onFocus`/`onBlur`/
 * `onKeyDown` are called through.
 *
 * Hover is a column of the variant table, not a branch on the prop, so a
 * `variant` outside the union — only reachable from a computed value, since the
 * type and the adherence lint both reject a literal — renders as `secondary`
 * in full, hover included, and warns once in development.
 */
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  /** primary = gold app action; scene = parchment in-scene action; canon/consult inherit a destination state's accent; destructive is tinted cinnabar at rest, never filled. */
  variant?: 'primary' | 'scene' | 'sceneGhost' | 'secondary' | 'quiet' | 'ghost' | 'canon' | 'consult' | 'destructive';
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

export declare function Button(props: ButtonProps): React.JSX.Element;

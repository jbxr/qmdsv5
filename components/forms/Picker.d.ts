import * as React from 'react';

export interface PickerItem {
  id?: string | number;
  label: React.ReactNode;
  /** Right-hand kind or provenance ("character", "room clock", "already used · 8×"). */
  meta?: React.ReactNode;
  /** Avatar or state glyph. */
  leading?: React.ReactNode;
  /** Render the label in mono — story-time candidates always do. */
  mono?: boolean;
  color?: string;
  active?: boolean;
  /** Push meta to the right edge. */
  trailingRight?: boolean;
  /** Hairline above this row (used for "already used" candidates). */
  separated?: boolean;
  onSelect?: () => void;
}

/**
 * The single popover behind `[` (story-time) and `@` (entity). The candidates
 * are a `listbox` of `option`s carrying `aria-selected` from `active`: one tab
 * stop on the active candidate, ↑↓ wrap, ⏎ and Space call its `onSelect`.
 * Name the popover with `aria-label`.
 */
export interface PickerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** What the author has typed so far, including the trigger character. */
  query?: React.ReactNode;
  items?: PickerItem[];
  footer?: React.ReactNode;
  /** Copy shown when there is nothing to offer — QM teaches the syntax instead of showing "no results". */
  teaching?: React.ReactNode;
  width?: number | string;
}

export declare function Picker(props: PickerProps): React.JSX.Element;

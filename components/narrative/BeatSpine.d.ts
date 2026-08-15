import * as React from 'react';

export interface BeatSpineItem {
  id?: string | number;
  /** Row number in Compose; omit in the stage and outline rails. */
  n?: string | number;
  text: string;
  /**
   * written/canon = filled dot · proposed = ring · suggested = diamond ·
   * here = coral + HERE flag · ahead/unwritten = hollow grey.
   *
   * `ahead` is a position relative to the draft, not a material state, so it
   * shares `unwritten`'s glyph rather than owning one in `StateDot`. Omitted
   * or unrecognised states render `unwritten` too — never `canon`.
   */
  state?: 'written' | 'canon' | 'proposed' | 'suggested' | 'here' | 'ahead' | 'unwritten';
  meta?: React.ReactNode;
}

/**
 * The single beat list used by the outline rail, the scene-room stage rail and
 * Compose's beat column.
 *
 * `onSelect` is what makes it a control: with it the list is a `listbox` of
 * `option`s — one tab stop on the `here` beat, ↑↓ through the rest, ⏎ or Space
 * to select, `--qm-focus-ring` on the focused row. Without it the list is
 * read-only and takes no place in the tab order.
 */
export interface BeatSpineProps
  // `onSelect` reports the chosen beat, so the DOM `onSelect` text-selection
  // handler is traded away — it has no meaning on a beat list.
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  beats?: BeatSpineItem[];
  onSelect?: (beat: BeatSpineItem, index: number) => void;
  /** Draw the vertical connector and hang dots off it. */
  showSpine?: boolean;
}

export declare function BeatSpine(props: BeatSpineProps): React.JSX.Element;

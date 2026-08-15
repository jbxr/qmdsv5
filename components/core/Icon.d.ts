import * as React from 'react';

export type QMIconName =
  | 'play'
  | 'grip'
  | 'more'
  | 'list'
  | 'sliders'
  | 'pencil'
  | 'x'
  | 'plus'
  | 'check'
  | 'chevronRight'
  | 'chevronLeft'
  | 'chevronDown'
  | 'chevronUp'
  | 'chevronsUpDown'
  | 'unfold'
  | 'arrowLeft'
  | 'image'
  | 'lock'
  | 'message'
  | 'maximize'
  | 'highlighter'
  | 'help';

/**
 * Inlined path data, copied from lucide (ISC licence) so QM carries no runtime icon
 * dependency. Two keys are renames — `sliders` is lucide `settings-2`, `help` is lucide
 * `circle-question-mark` — and `play`, `message` and `unfold` are QM originals with no
 * lucide equivalent. Full table: guidelines/brand-iconography.card.html.
 */
export declare const QM_ICONS: Record<QMIconName, { fill: boolean; d: string }>;

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /**
   * Glyph name from QM_ICONS. The one lookup in the system with no default to
   * fall back to — a substitute glyph would draw the wrong picture — so an
   * unrecognised name renders nothing and warns once in development rather
   * than disappearing quietly.
   */
  name: QMIconName;
  /** Box size in px. 16 in controls, 13-15 inline, 11-12 in chips. */
  size?: number;
  /** 2 for QM's own glyphs; 1.5 only for oversized decorative use. */
  strokeWidth?: number;
  color?: string;
}

export declare function Icon(props: IconProps): React.JSX.Element | null;

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

export declare const QM_ICONS: Record<QMIconName, { fill: boolean; d: string }>;

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /** Glyph name from QM_ICONS. */
  name: QMIconName;
  /** Box size in px. 16 in controls, 13-15 inline, 11-12 in chips. */
  size?: number;
  /** 2 for QM's own glyphs; 1.5 only for oversized decorative use. */
  strokeWidth?: number;
  color?: string;
}

export declare function Icon(props: IconProps): JSX.Element | null;

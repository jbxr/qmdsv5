import * as React from 'react';

export interface VersionEntry {
  id?: string | number;
  label: string;
  /** written = a revision you made · generated = a candidate from a run. */
  origin?: 'written' | 'generated';
  /** Mono lint score, e.g. "7·5". */
  score?: string;
  /** The version being read — raised surface, never coloured. */
  current?: boolean;
}

/** The version axis above the prose: revisions and candidates on one strip. */
export interface VersionStripProps {
  versions?: VersionEntry[];
  label?: string;
  note?: React.ReactNode;
  onSelect?: (v: VersionEntry, index: number) => void;
  style?: React.CSSProperties;
}

export declare function VersionStrip(props: VersionStripProps): JSX.Element;

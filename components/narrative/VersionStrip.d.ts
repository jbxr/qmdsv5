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
export interface VersionStripProps
  // `onSelect` reports the chosen version, so the DOM `onSelect` text-selection
  // handler is traded away — it has no meaning on this strip.
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  versions?: VersionEntry[];
  label?: string;
  note?: React.ReactNode;
  onSelect?: (v: VersionEntry, index: number) => void;
}

export declare function VersionStrip(props: VersionStripProps): React.JSX.Element;

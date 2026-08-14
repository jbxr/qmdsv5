import * as React from 'react';

/**
 * Entity reference — character, location or artifact. Always blue-green, always
 * the canonical label, never a status colour.
 */
export interface EntityTokenProps {
  /** Canonical label — never the alias the author typed. */
  name: string;
  /** Two-letter initials; omit for a bare chip. */
  initials?: string;
  /** Rank or role, shown quiet after the name ("Ensign"). */
  role?: string;
  kind?: 'character' | 'location' | 'artifact';
  /** `inline` = underlined mention inside serif prose; `chip` = a cast chip. */
  variant?: 'chip' | 'inline';
  onDismiss?: (e: React.MouseEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export declare function EntityToken(props: EntityTokenProps): JSX.Element;

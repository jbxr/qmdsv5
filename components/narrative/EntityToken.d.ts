import * as React from 'react';

/**
 * Entity reference — character, location or artifact. Always blue-green, always
 * the canonical label, never a status colour.
 */
export interface EntityTokenProps
  // ACCESSIBILITY: `role` is the entity's narrative rank, so the ARIA `role`
  // attribute is traded away and cannot be passed through the spread. An
  // EntityToken therefore has no overridable ARIA role — give it a semantic
  // wrapper (or `aria-label`) when it needs one.
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'role'> {
  /** Canonical label — never the alias the author typed. */
  name: string;
  /** Two-letter initials; omit for a bare chip. */
  initials?: string;
  /** Rank or role, shown quiet after the name ("Ensign") — NOT the ARIA role. */
  role?: string;
  kind?: 'character' | 'location' | 'artifact';
  /** `inline` = underlined mention inside serif prose; `chip` = a cast chip. */
  variant?: 'chip' | 'inline';
  /** Renders the ✕. It is a control of its own — its own tab stop, its own ring — and ⏎ there dismisses without also firing `onClick`. */
  onDismiss?: (e: React.MouseEvent) => void;
  /** Makes the token itself a `button`: focusable, ⏎/Space, `--qm-focus-ring`. Without it a token is a label and stays out of the tab order. */
  onClick?: (e: React.MouseEvent) => void;
}

export declare function EntityToken(props: EntityTokenProps): React.JSX.Element;

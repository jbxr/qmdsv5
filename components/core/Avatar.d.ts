import * as React from 'react';

/** Initials token for an entity. Character = blue circle, location = teal square, artifact = violet square. */
export interface AvatarProps {
  /** Two letters, uppercase — QM never renders a photo here. */
  initials: string;
  kind?: 'character' | 'location' | 'artifact' | 'author' | 'neutral';
  /** 22 in chips · 24-26 in rows · 52 in the dossier header. */
  size?: number;
  style?: React.CSSProperties;
}

export declare function Avatar(props: AvatarProps): JSX.Element;

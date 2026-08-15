import * as React from 'react';

/**
 * QM surface container: panel (rails/inspector), raised (active content),
 * selected (highest, blue cast), beat (outline beat card), scene (in-scene warm).
 *
 * A card without a rail sets no `position` and no `overflow`, so a consumer
 * stylesheet can position it (fixed, absolute, sticky) and scroll it.
 *
 * The edge is written as `border-width` / `border-style` / `border-color`
 * longhands rather than the `border` shorthand, so the `hoverable` colour swap
 * cannot leave `border-color` resolving to `currentColor`.
 *
 * A `surface` outside the union — only reachable from a computed value, since
 * the type and the adherence lint both reject a literal — renders as `panel`
 * in full, hover included.
 *
 * Semantics follow `onClick`. A card given one is a control: a tab stop, a
 * `button` role, Enter and Space, and `--qm-focus-ring` on keyboard focus. A
 * card given none is a plain `div`, announced as nothing and outside the tab
 * order — which is most of them, and none of those render one attribute more
 * than they did before.
 *
 * The role stands in for a real `<button>`, which this element cannot be: a
 * button may hold no flow content and no control, and every card here holds
 * both. Matching the box would also cost seven UA overrides — `display` and
 * `width` among them, which a card does not set and a consumer relies on.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  surface?: 'panel' | 'raised' | 'selected' | 'beat' | 'scene' | 'quiet';
  /**
   * 3px left accent rail = material state. Never used for selection.
   * Anything but `'none'` makes the card `position: relative; overflow: hidden`
   * so the rail is contained and clipped to the radius.
   */
  rail?: 'none' | 'parchment' | 'gold' | 'teal' | 'coral';
  radius?: 'card' | 'panel';
  padding?: number | string;
  /**
   * Brightens the surface on hover — never introduces semantic colour, and
   * never changes material: the cool surfaces lift their edge to
   * `--qm-border-hover`, and the warm `scene` surface lifts along the
   * parchment ramp to `--qm-border-parchment`. Only `panel` also lifts its
   * background, to `--qm-surface-panel-hover`.
   *
   * Pointer affordance only: it is `onClick` that makes a card a control, and
   * `hoverable` on a card without one promises a press that never lands.
   */
  hoverable?: boolean;
  children?: React.ReactNode;
}

export declare function Card(props: CardProps): React.JSX.Element;

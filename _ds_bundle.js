/* @ds-bundle: {"format":4,"namespace":"QuantumMateriaDesignSystem_488cde","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"QM_ICONS","sourcePath":"components/core/Icon.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"Kbd","sourcePath":"components/core/Kbd.jsx"},{"name":"StateDot","sourcePath":"components/core/StateDot.jsx"},{"name":"Callout","sourcePath":"components/feedback/Callout.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"ModeBar","sourcePath":"components/feedback/ModeBar.jsx"},{"name":"Overlay","sourcePath":"components/feedback/Overlay.jsx"},{"name":"Refusal","sourcePath":"components/feedback/Refusal.jsx"},{"name":"SaveStatus","sourcePath":"components/feedback/SaveStatus.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Picker","sourcePath":"components/forms/Picker.jsx"},{"name":"PromptField","sourcePath":"components/forms/PromptField.jsx"},{"name":"PromptTextField","sourcePath":"components/forms/PromptTextField.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Tabs","sourcePath":"components/forms/Tabs.jsx"},{"name":"TextArea","sourcePath":"components/forms/TextArea.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"AnnotationMark","sourcePath":"components/narrative/AnnotationMark.jsx"},{"name":"BeatCard","sourcePath":"components/narrative/BeatCard.jsx"},{"name":"BeatSpine","sourcePath":"components/narrative/BeatSpine.jsx"},{"name":"EntityToken","sourcePath":"components/narrative/EntityToken.jsx"},{"name":"EraChip","sourcePath":"components/narrative/EraChip.jsx"},{"name":"NoteBlock","sourcePath":"components/narrative/NoteBlock.jsx"},{"name":"RouteChip","sourcePath":"components/narrative/RouteChip.jsx"},{"name":"TimelineRow","sourcePath":"components/narrative/TimelineRow.jsx"},{"name":"VersionStrip","sourcePath":"components/narrative/VersionStrip.jsx"},{"name":"PanelHeader","sourcePath":"components/navigation/PanelHeader.jsx"},{"name":"StatusBar","sourcePath":"components/navigation/StatusBar.jsx"},{"name":"TopBar","sourcePath":"components/navigation/TopBar.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"1bd5dba57b46","components/core/Button.jsx":"555e9c4cf507","components/core/Card.jsx":"facdf32752f3","components/core/Icon.jsx":"0ad515408d9b","components/core/Kbd.jsx":"b3b34000dfb0","components/core/StateDot.jsx":"a3fd991e007b","components/feedback/Callout.jsx":"1b782dc94451","components/feedback/EmptyState.jsx":"f68b008bade2","components/feedback/ModeBar.jsx":"973602b22e38","components/feedback/Overlay.jsx":"b615370fb7ed","components/feedback/Refusal.jsx":"3481c28f8b57","components/feedback/SaveStatus.jsx":"adee664c7518","components/forms/Field.jsx":"ea5e62a7a0ac","components/forms/Picker.jsx":"9ccdeb4ca231","components/forms/PromptField.jsx":"3dd0c094d315","components/forms/PromptTextField.jsx":"0928aa9271ef","components/forms/SegmentedControl.jsx":"bc52e1dd5f4d","components/forms/Tabs.jsx":"5bf43d06301e","components/forms/TextArea.jsx":"f869a276de16","components/forms/TextField.jsx":"fe279d3a1d24","components/narrative/AnnotationMark.jsx":"ef3759352e5f","components/narrative/BeatCard.jsx":"e36949ac7061","components/narrative/BeatSpine.jsx":"b3bd113579eb","components/narrative/EntityToken.jsx":"cc0a0dc39c7d","components/narrative/EraChip.jsx":"d91dbb354539","components/narrative/NoteBlock.jsx":"4cfa653d454f","components/narrative/RouteChip.jsx":"46711e6c8608","components/narrative/TimelineRow.jsx":"5e20c52ebea7","components/narrative/VersionStrip.jsx":"3f584141487c","components/navigation/PanelHeader.jsx":"602869534413","components/navigation/StatusBar.jsx":"619e36242c19","components/navigation/TopBar.jsx":"2a8acc0da304","ui_kits/story-engine/Compose.jsx":"0ca07723dda3","ui_kits/story-engine/NewScene.jsx":"2892710023c1","ui_kits/story-engine/Outline.jsx":"5f6ff5685808","ui_kits/story-engine/SceneRoom.jsx":"36a53a8b96c0","ui_kits/story-engine/WritingRoom.jsx":"8f3ba0166dc7","ui_kits/story-engine/data.jsx":"9e2f348a9b25","ui_kits/story-engine/doc-page.js":"371bab66f42d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.QuantumMateriaDesignSystem_488cde = window.QuantumMateriaDesignSystem_488cde || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const KINDS = {
  character: {
    color: 'var(--qm-blue-text)',
    bg: 'rgba(95,168,188,0.18)',
    border: 'var(--qm-border-blue-strong)',
    radius: '50%'
  },
  location: {
    color: 'var(--qm-teal-text)',
    bg: 'rgba(85,183,166,0.14)',
    border: 'rgba(85,183,166,0.34)',
    radius: 6
  },
  artifact: {
    color: 'var(--qm-violet-text)',
    bg: 'rgba(162,146,242,0.14)',
    border: 'rgba(162,146,242,0.34)',
    radius: 6
  },
  author: {
    color: 'var(--qm-gold-text)',
    bg: 'rgba(226,165,68,0.14)',
    border: 'rgba(226,165,68,0.36)',
    radius: '50%'
  },
  neutral: {
    color: 'var(--qm-text-5)',
    bg: 'var(--qm-fill-chip)',
    border: 'var(--qm-border-control-quiet)',
    radius: '50%'
  }
};

/** Initials token. Entity identity is blue-green at every scale. */
function Avatar({
  initials,
  kind = 'character',
  size = 26,
  style,
  ...rest
}) {
  const k = KINDS[kind] || KINDS.character;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      width: size,
      height: size,
      flex: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: typeof k.radius === 'number' ? Math.max(5, Math.round(size / 4)) : k.radius,
      background: k.bg,
      border: `1px solid ${k.border}`,
      color: k.color,
      fontFamily: 'var(--qm-font-sans)',
      fontSize: Math.max(10.5, Math.round(size * 0.42)),
      letterSpacing: '0.02em',
      ...style
    }
  }, rest), initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const H = {
  lg: 44,
  md: 36,
  sm: 34,
  xs: 32,
  xxs: 30,
  tiny: 28
};
const VARIANTS = {
  primary: {
    color: 'var(--qm-on-gold)',
    background: 'var(--qm-gold-fill)',
    fontWeight: 'var(--qm-weight-medium)',
    border: '1px solid transparent'
  },
  scene: {
    color: 'var(--qm-scene-ink)',
    background: 'var(--qm-parchment-fill)',
    fontWeight: 'var(--qm-weight-medium)',
    border: '1px solid transparent'
  },
  sceneGhost: {
    color: 'var(--qm-scene-text)',
    background: 'transparent',
    border: '1px solid var(--qm-border-parchment)'
  },
  secondary: {
    color: 'var(--qm-text-4)',
    background: 'transparent',
    border: '1px solid var(--qm-border-control)'
  },
  quiet: {
    color: 'var(--qm-text-3)',
    background: 'var(--qm-fill-rest)',
    border: '1px solid var(--qm-border-control-quiet)'
  },
  ghost: {
    color: 'var(--qm-text-4)',
    background: 'transparent',
    border: '1px solid transparent'
  },
  canon: {
    color: 'var(--qm-teal-text)',
    background: 'transparent',
    border: '1px solid var(--qm-border-teal-strong)'
  },
  consult: {
    color: 'var(--qm-violet-text-alt)',
    background: 'transparent',
    border: '1px solid var(--qm-border-violet)'
  },
  destructive: {
    color: 'var(--qm-cinnabar-text)',
    background: 'var(--qm-tint-cinnabar-soft)',
    border: '1px solid var(--qm-border-cinnabar)'
  }
};

/**
 * One filled action per region. `primary` is the gold app action, `scene` the
 * parchment action that reaches the room; everything else is an outline —
 * `destructive` included, which carries cinnabar at rest and never on hover.
 * The focus ring sits outside the border box, so it survives the filled
 * variants, and only on keyboard focus — a pointer press leaves none behind.
 */
function Button({
  variant = 'secondary',
  size = 'sm',
  children,
  leadingIcon,
  trailingIcon,
  hint,
  disabled,
  fullWidth,
  style,
  onClick,
  onFocus,
  onBlur,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const [ring, setRing] = React.useState(false);
  const v = VARIANTS[variant] || VARIANTS.secondary;
  const height = H[size] || H.sm;
  const base = {
    height,
    display: fullWidth ? 'flex' : 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: fullWidth ? '100%' : undefined,
    padding: height >= 44 ? '0 16px' : height >= 34 ? '0 14px' : '0 11px',
    borderRadius: 'var(--qm-radius-control)',
    fontFamily: 'var(--qm-font-sans)',
    fontSize: height >= 44 ? 'var(--qm-type-body)' : 'var(--qm-type-secondary)',
    lineHeight: 1,
    cursor: disabled ? 'default' : 'pointer',
    transition: 'background var(--qm-dur-hover) var(--qm-ease), color var(--qm-dur-hover) var(--qm-ease)',
    ...v
  };
  if (variant === 'primary' && hover && !disabled) base.background = 'var(--qm-gold-fill-hover)';
  if (variant === 'scene' && hover && !disabled) base.background = 'var(--qm-parchment-fill-hover)';
  if ((variant === 'secondary' || variant === 'ghost') && hover && !disabled) {
    base.background = 'var(--qm-fill-hover)';
    base.color = 'var(--qm-text-2)';
  }
  if (variant === 'quiet' && hover && !disabled) base.background = 'var(--qm-fill-hover-strong)';
  if (variant === 'sceneGhost' && hover && !disabled) base.background = 'rgba(232,220,192,0.12)';
  if (variant === 'canon' && hover && !disabled) {
    base.background = 'rgba(85,183,166,0.18)';
    base.color = 'var(--qm-teal-text-strong)';
  }
  if (variant === 'consult' && hover && !disabled) base.background = 'rgba(162,146,242,0.14)';
  if (variant === 'destructive' && hover && !disabled) {
    base.background = 'var(--qm-tint-cinnabar)';
    base.color = 'var(--qm-cinnabar-text-strong)';
  }
  if (!disabled && (down || ring)) {
    base.boxShadow = [down ? 'var(--qm-inset-press)' : null, ring ? 'var(--qm-focus-ring)' : null].filter(Boolean).join(', ');
  }
  if (disabled) {
    base.color = 'var(--qm-text-9)';
    base.background = 'transparent';
    base.border = '1px solid var(--qm-border-disabled)';
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setDown(false);
    },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false),
    onFocus: e => {
      if (!disabled && e.target.matches(':focus-visible')) setRing(true);
      if (onFocus) onFocus(e);
    },
    onBlur: e => {
      setRing(false);
      setDown(false);
      if (onBlur) onBlur(e);
    },
    style: {
      ...base,
      ...style
    }
  }, rest), leadingIcon, /*#__PURE__*/React.createElement("span", null, children), trailingIcon, hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 'var(--qm-type-mono-chip)',
      opacity: 0.72
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Edges are longhands, never the `border` shorthand: the hover colour has to be
// swapped in and out, and a colour longhand removed next to a shorthand leaves
// Chrome resolving border-color to currentColor — the hairline paints in text ink.
const SURFACES = {
  panel: {
    background: 'var(--qm-surface-panel)',
    edge: 'solid',
    border: 'var(--qm-border-panel)',
    shadow: 'none'
  },
  raised: {
    background: 'var(--qm-surface-raised)',
    edge: 'solid',
    border: 'var(--qm-border-panel)',
    shadow: 'none'
  },
  selected: {
    background: 'var(--qm-card-raised)',
    edge: 'solid',
    border: 'var(--qm-border-structural)',
    shadow: 'var(--qm-shadow-card)'
  },
  beat: {
    background: 'var(--qm-beat-raised)',
    edge: 'solid',
    border: 'var(--qm-border-group)',
    shadow: 'var(--qm-shadow-beat)'
  },
  scene: {
    background: 'var(--qm-scene-surface)',
    edge: 'solid',
    border: 'var(--qm-scene-border)',
    shadow: 'none'
  },
  quiet: {
    background: 'var(--qm-fill-quiet)',
    edge: 'dashed',
    border: 'var(--qm-border-dashed)',
    shadow: 'none'
  }
};
const RAILS = {
  parchment: 'linear-gradient(180deg,#E8DCC0,#A08E6A)',
  gold: 'var(--qm-gold-rail)',
  teal: 'var(--qm-teal)',
  coral: 'var(--qm-coral)',
  none: null
};

/** Surface container. `rail` is material state; the surface itself is selection. */
function Card({
  surface = 'panel',
  rail = 'none',
  radius = 'card',
  padding = 22,
  hoverable,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const s = SURFACES[surface] || SURFACES.panel;
  const railBg = RAILS[rail];
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: hoverable ? () => setHover(true) : undefined,
    onMouseLeave: hoverable ? () => setHover(false) : undefined,
    style: {
      // Only a railed card contains and clips its rail; a plain one leaves
      // position and overflow to the consumer.
      position: railBg ? 'relative' : undefined,
      overflow: railBg ? 'hidden' : undefined,
      padding,
      borderRadius: radius === 'panel' ? 'var(--qm-radius-panel)' : 'var(--qm-radius-card)',
      background: hover && surface === 'panel' ? '#171E26' : s.background,
      borderWidth: 1,
      borderStyle: s.edge,
      borderColor: hover ? 'rgba(255,255,255,0.20)' : s.border,
      boxShadow: s.shadow,
      cursor: hoverable ? 'pointer' : undefined,
      transition: 'background var(--qm-dur-hover) var(--qm-ease), border-color var(--qm-dur-hover) var(--qm-ease)',
      ...style
    }
  }, rest), railBg ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 'var(--qm-rail-w-accent)',
      background: railBg
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Path data is copied from lucide (ISC licence, same 24x24 / 2px / round-cap convention) and
 * inlined so QM carries no runtime icon dependency. Keys annotated below are renames or QM
 * originals; guidelines/brand-iconography.card.html holds the full key -> lucide-name table.
 */
const QM_ICONS = {
  play: {
    fill: true,
    d: '<path d="M7 4l13 8-13 8z"/>'
  },
  // QM original, filled — not lucide play
  grip: {
    fill: true,
    d: '<circle cx="9" cy="5" r="1.4"/><circle cx="9" cy="12" r="1.4"/><circle cx="9" cy="19" r="1.4"/><circle cx="15" cy="5" r="1.4"/><circle cx="15" cy="12" r="1.4"/><circle cx="15" cy="19" r="1.4"/>'
  },
  // lucide grip-vertical, filled at r1.4
  more: {
    fill: true,
    d: '<circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/>'
  },
  // lucide ellipsis, filled at r1.5
  list: {
    fill: false,
    d: '<path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/>'
  },
  sliders: {
    fill: false,
    d: '<path d="M19 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>'
  },
  // lucide settings-2
  pencil: {
    fill: false,
    d: '<path d="M21.2 6.8a1 1 0 0 0-4-4L3.8 16.2a2 2 0 0 0-.5.8l-1.3 4.4a.5.5 0 0 0 .6.6l4.4-1.3a2 2 0 0 0 .8-.5z"/><path d="m15 5 4 4"/>'
  },
  x: {
    fill: false,
    d: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'
  },
  plus: {
    fill: false,
    d: '<path d="M5 12h14"/><path d="M12 5v14"/>'
  },
  check: {
    fill: false,
    d: '<path d="M20 6 9 17l-5-5"/>'
  },
  chevronRight: {
    fill: false,
    d: '<path d="m9 18 6-6-6-6"/>'
  },
  chevronLeft: {
    fill: false,
    d: '<path d="m15 18-6-6 6-6"/>'
  },
  chevronDown: {
    fill: false,
    d: '<path d="m6 9 6 6 6-6"/>'
  },
  chevronUp: {
    fill: false,
    d: '<path d="m18 15-6-6-6 6"/>'
  },
  chevronsUpDown: {
    fill: false,
    d: '<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>'
  },
  unfold: {
    fill: false,
    d: '<path d="M3 10h14"/><path d="M3 14h14"/><path d="m21 5-3 3-3-3"/><path d="m15 19 3-3 3 3"/>'
  },
  // QM original — outline rows plus a fold control; intentionally not lucide unfold-vertical
  arrowLeft: {
    fill: false,
    d: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>'
  },
  image: {
    fill: false,
    d: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>'
  },
  lock: {
    fill: false,
    d: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'
  },
  message: {
    fill: false,
    d: '<path d="M12 20a8 8 0 1 0-8-8 8 8 0 0 0 1.2 4.2L4 20z"/>'
  },
  // QM original — not lucide message-circle
  maximize: {
    fill: false,
    d: '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>'
  },
  highlighter: {
    fill: false,
    d: '<path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/>'
  },
  help: {
    fill: false,
    d: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>'
  } // lucide circle-question-mark
};

/** Inline 24x24 SVG glyph. QM has no icon font: glyphs are copied path data. */
function Icon({
  name,
  size = 16,
  strokeWidth = 2,
  color = 'currentColor',
  style,
  ...rest
}) {
  const g = QM_ICONS[name];
  if (!g) return null;
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: g.fill ? color : 'none',
    stroke: g.fill ? 'none' : color,
    strokeWidth: g.fill ? undefined : strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: {
      flex: 'none',
      display: 'block',
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: g.d
    }
  }, rest));
}
Object.assign(__ds_scope, { QM_ICONS, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Kbd.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Key token. Keys are a token; refusals name the key that works instead. */
function Kbd({
  children,
  variant = 'key',
  style,
  ...rest
}) {
  const local = variant === 'local';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 'var(--qm-type-module)',
      minWidth: local ? undefined : 26,
      height: 26,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 8px',
      borderRadius: 'var(--qm-radius-key)',
      color: local ? 'var(--qm-text-6)' : 'var(--qm-text-field)',
      background: local ? 'rgba(255,255,255,0.03)' : 'var(--qm-fill-hover)',
      border: local ? '1px dashed var(--qm-border-dashed)' : '1px solid var(--qm-border-key)',
      boxShadow: local ? 'none' : 'var(--qm-shadow-key)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Kbd });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Kbd.jsx", error: String((e && e.message) || e) }); }

// components/core/StateDot.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STATES = {
  canon: {
    color: 'var(--qm-teal)',
    fill: 'var(--qm-teal)',
    shape: 'circle'
  },
  written: {
    color: 'var(--qm-teal)',
    fill: 'var(--qm-teal)',
    shape: 'circle'
  },
  proposed: {
    color: 'var(--qm-gold)',
    fill: 'transparent',
    shape: 'circle'
  },
  suggested: {
    color: 'var(--qm-violet)',
    fill: 'var(--qm-violet)',
    shape: 'diamond'
  },
  here: {
    color: 'var(--qm-coral)',
    fill: 'var(--qm-coral)',
    shape: 'circle'
  },
  conflict: {
    color: 'var(--qm-cinnabar)',
    fill: 'rgba(196,85,58,0.25)',
    shape: 'circle'
  },
  unwritten: {
    color: 'var(--qm-text-hairline)',
    fill: 'transparent',
    shape: 'circle'
  },
  unlinked: {
    color: 'var(--qm-gold)',
    fill: 'transparent',
    shape: 'circle',
    dashed: true
  },
  entity: {
    color: 'var(--qm-blue)',
    fill: 'var(--qm-blue)',
    shape: 'circle'
  },
  neutral: {
    color: 'var(--qm-text-6)',
    fill: 'var(--qm-text-6)',
    shape: 'circle'
  },
  private: {
    color: 'var(--qm-text-8)',
    fill: 'transparent',
    shape: 'circle'
  },
  scene: {
    color: 'var(--qm-parchment)',
    fill: 'var(--qm-parchment)',
    shape: 'circle'
  }
};

/** The state glyph. Colour never travels without this shape. */
function StateDot({
  state = 'canon',
  size = 8,
  glow,
  pulse,
  style,
  ...rest
}) {
  const s = STATES[state] || STATES.neutral;
  const diamond = s.shape === 'diamond';
  const glows = {
    here: 'var(--qm-glow-here)',
    canon: 'var(--qm-glow-live)',
    written: 'var(--qm-glow-live)',
    scene: 'var(--qm-glow-scene)'
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      width: size,
      height: size,
      flex: 'none',
      display: 'inline-block',
      background: s.fill,
      border: `var(--qm-dot-w) ${s.dashed ? 'dashed' : 'solid'} ${s.color}`,
      borderRadius: diamond ? 1 : '50%',
      transform: diamond ? 'rotate(45deg)' : undefined,
      boxShadow: glow ? glows[state] || 'none' : undefined,
      animation: pulse ? 'qmBreathe var(--qm-breathe-fast) ease-in-out infinite' : undefined,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { StateDot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StateDot.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Callout.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  conflict: {
    bg: 'var(--qm-tint-cinnabar-soft)',
    border: 'var(--qm-border-cinnabar)',
    text: 'var(--qm-cinnabar-text)',
    strong: 'var(--qm-cinnabar-text-strong)',
    link: 'var(--qm-cinnabar-dim)'
  },
  canon: {
    bg: 'var(--qm-tint-teal-soft)',
    border: 'var(--qm-border-teal)',
    text: 'var(--qm-teal-text)',
    strong: 'var(--qm-teal-text-strong)',
    link: 'var(--qm-teal-deep)'
  },
  proposed: {
    bg: 'var(--qm-tint-gold-soft)',
    border: 'var(--qm-border-gold)',
    text: 'var(--qm-gold-text)',
    strong: 'var(--qm-prose-2)',
    link: 'var(--qm-gold-dim)'
  },
  consult: {
    bg: 'rgba(162,146,242,0.10)',
    border: 'rgba(162,146,242,0.26)',
    text: 'var(--qm-violet-text)',
    strong: 'var(--qm-violet-prose)',
    link: 'var(--qm-violet-dim)'
  },
  neutral: {
    bg: 'var(--qm-fill-quiet)',
    border: 'transparent',
    text: 'var(--qm-text-6)',
    strong: 'var(--qm-text-emph)',
    link: 'var(--qm-text-6)'
  }
};

/** Advisory or blocking surface. Cinnabar is reserved for material that is wrong. */
function Callout({
  tone = 'neutral',
  glyph,
  children,
  action,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.neutral;
  const mark = glyph !== undefined ? glyph : tone === 'conflict' ? /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      width: 0,
      height: 0,
      marginTop: 4,
      borderLeft: '8px solid transparent',
      borderRight: '8px solid transparent',
      borderBottom: '13px solid var(--qm-cinnabar)'
    }
  }) : /*#__PURE__*/React.createElement(__ds_scope.StateDot, {
    state: tone === 'canon' ? 'canon' : tone === 'proposed' ? 'proposed' : 'neutral',
    size: 7,
    style: {
      marginTop: 6
    }
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: 12,
      padding: '13px 15px',
      borderRadius: 'var(--qm-radius-callout)',
      background: t.bg,
      border: t.border === 'transparent' ? 'none' : `1px solid ${t.border}`,
      ...style
    }
  }, rest), mark, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 'var(--qm-type-row)',
      lineHeight: 1.55,
      color: t.text
    }
  }, children, action ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--qm-type-secondary)',
      color: t.link,
      marginTop: 6,
      cursor: 'pointer'
    }
  }, action) : null));
}
Object.assign(__ds_scope, { Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Callout.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Empty invites, offline reassures, unknown admits. None of the three is an error. */
function EmptyState({
  kind = 'empty',
  children,
  icon,
  style,
  ...rest
}) {
  const dashed = kind === 'unknown';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: 12,
      padding: dashed ? '14px 16px' : '11px 13px',
      borderRadius: dashed ? 'var(--qm-radius-card)' : 'var(--qm-radius-control)',
      background: 'var(--qm-fill-quiet)',
      border: dashed ? '1px dashed var(--qm-border-dashed)' : 'none',
      fontSize: 'var(--qm-type-secondary)',
      lineHeight: 1.6,
      color: 'var(--qm-text-6)',
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      marginTop: 2,
      color: 'var(--qm-text-6)'
    }
  }, icon) : null, /*#__PURE__*/React.createElement("div", null, children));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ModeBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const MODES = {
  linking: {
    bg: 'var(--qm-tint-gold-soft)',
    border: 'var(--qm-border-gold)',
    text: 'var(--qm-gold-text)',
    key: 'var(--qm-gold-dim)',
    dot: 'proposed',
    pulse: true
  },
  inspect: {
    bg: 'rgba(95,168,188,0.10)',
    border: 'var(--qm-border-blue)',
    text: 'var(--qm-blue-text)',
    key: 'var(--qm-blue-deep)',
    dot: 'entity'
  },
  peek: {
    bg: 'rgba(241,123,84,0.10)',
    border: 'rgba(241,123,84,0.28)',
    text: 'var(--qm-coral-text)',
    key: 'var(--qm-cinnabar-dim)',
    dot: 'here'
  }
};

/** A mode is never invisible: it takes a hint bar in the accent of what it waits on. */
function ModeBar({
  mode = 'linking',
  children,
  exitKey = 'esc',
  style,
  ...rest
}) {
  const m = MODES[mode] || MODES.linking;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '11px 14px',
      borderRadius: 'var(--qm-radius-callout)',
      background: m.bg,
      border: `1px solid ${m.border}`,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.StateDot, {
    state: m.dot,
    size: 8,
    pulse: m.pulse
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 'var(--qm-type-secondary)',
      color: m.text
    }
  }, children), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 'var(--qm-type-mono)',
      color: m.key
    }
  }, exitKey));
}
Object.assign(__ds_scope, { ModeBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ModeBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Overlay.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Transient surface: radius 12 on the raised surface, 60% scrim.
 * With `scrim` it is a real modal — pinned to the viewport, named, focus moved
 * to the panel and Tab held inside it until it unmounts. Without one it is a
 * popover: it closes on Esc and ✕ and claims nothing else.
 */
function Overlay({
  title,
  onClose,
  footer,
  children,
  width = 560,
  scrim,
  style,
  ...rest
}) {
  const panelRef = React.useRef(null);
  const headingId = React.useId();
  const [ring, setRing] = React.useState(false);
  const named = rest['aria-label'] != null || rest['aria-labelledby'] != null;
  React.useEffect(() => {
    if (!onClose) return undefined;
    const onKey = e => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  // A modal owns the focus for as long as it is up: into the panel — never onto
  // the first control, which would put a destructive action one ⏎ away — held
  // there by Tab, and handed back to whatever opened it on the way out.
  React.useEffect(() => {
    if (!scrim) return undefined;
    const opener = document.activeElement;
    if (panelRef.current) panelRef.current.focus();
    const onKey = e => {
      const panelEl = panelRef.current;
      if (e.key !== 'Tab' || !panelEl) return;
      const stops = panelEl.querySelectorAll(FOCUSABLE);
      const here = document.activeElement;
      if (!stops.length) {
        e.preventDefault();
        panelEl.focus();
        return;
      }
      const first = stops[0];
      const last = stops[stops.length - 1];
      if (!panelEl.contains(here)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && (here === first || here === panelEl)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && here === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      if (opener && opener.focus) opener.focus();
    };
  }, [scrim]);
  const panel = /*#__PURE__*/React.createElement("div", _extends({
    ref: panelRef,
    role: scrim ? 'dialog' : undefined,
    "aria-modal": scrim ? 'true' : undefined,
    "aria-labelledby": scrim && !named && title != null ? headingId : undefined,
    tabIndex: scrim ? -1 : undefined,
    style: {
      width,
      borderRadius: 'var(--qm-radius-panel)',
      background: 'var(--qm-surface-raised)',
      border: '1px solid rgba(255,255,255,0.12)',
      boxShadow: 'var(--qm-shadow-overlay)',
      overflow: 'hidden',
      outline: 'none',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 20px',
      borderBottom: '1px solid var(--qm-border-panel)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    id: headingId,
    style: {
      fontSize: 15,
      color: 'var(--qm-prose-2)'
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Close",
    onClick: onClose,
    onFocus: e => {
      if (e.target.matches(':focus-visible')) setRing(true);
    },
    onBlur: () => setRing(false),
    style: {
      width: 28,
      height: 28,
      padding: 0,
      margin: 0,
      appearance: 'none',
      background: 'transparent',
      font: 'inherit',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--qm-radius-key)',
      color: 'var(--qm-text-6)',
      border: '1px solid var(--qm-border-control-quiet)',
      cursor: 'pointer',
      boxShadow: ring ? 'var(--qm-focus-ring)' : undefined,
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 13
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px'
    }
  }, children), footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 20px',
      borderTop: '1px solid var(--qm-border-group)',
      fontSize: 'var(--qm-type-label)',
      color: 'var(--qm-text-6)'
    }
  }, footer) : null);
  if (!scrim) return panel;
  return (
    /*#__PURE__*/
    // `fixed`, not `absolute`: a modal is anchored to what the user is looking
    // at, not to the top of a document they may have scrolled far past.
    React.createElement("div", {
      style: {
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--qm-space-5)',
        background: 'var(--qm-fill-scrim)'
      },
      onClick: onClose
    }, /*#__PURE__*/React.createElement("div", {
      onClick: e => e.stopPropagation(),
      style: {
        maxHeight: '100%',
        overflowY: 'auto'
      }
    }, panel))
  );
}
Object.assign(__ds_scope, { Overlay });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Overlay.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Refusal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** what happened · why · what to press instead. Structural grey, never cinnabar. */
function Refusal({
  pressed,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: 12,
      padding: '13px 15px',
      borderRadius: 'var(--qm-radius-callout)',
      background: 'var(--qm-surface-raised)',
      border: '1px solid var(--qm-border-control-quiet)',
      ...style
    }
  }, rest), pressed ? /*#__PURE__*/React.createElement(__ds_scope.Kbd, {
    style: {
      height: 24,
      minWidth: 0,
      flex: 'none',
      fontSize: 'var(--qm-type-mono)',
      boxShadow: 'none',
      color: 'var(--qm-text-3)'
    }
  }, pressed) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--qm-type-row)',
      lineHeight: 1.55,
      color: 'var(--qm-text-3)'
    }
  }, children));
}
Object.assign(__ds_scope, { Refusal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Refusal.jsx", error: String((e && e.message) || e) }); }

// components/feedback/SaveStatus.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const S = {
  local: {
    dot: 'neutral',
    border: 'var(--qm-border-panel)',
    text: 'var(--qm-text-3)',
    tag: 'var(--qm-text-6)'
  },
  saving: {
    dot: 'proposed',
    border: 'rgba(226,165,68,0.28)',
    text: 'var(--qm-gold-text)',
    tag: 'var(--qm-gold-dim)',
    pulse: true
  },
  saved: {
    dot: 'canon',
    border: 'rgba(85,183,166,0.30)',
    text: 'var(--qm-teal-text)',
    tag: 'var(--qm-teal-deep)'
  },
  offline: {
    dot: 'private',
    border: 'var(--qm-border-panel)',
    text: 'var(--qm-text-6)',
    tag: 'var(--qm-text-7)'
  }
};

/** Local drafting and the fan-out to QM are different promises, so different indicators. */
function SaveStatus({
  state = 'local',
  children,
  tag,
  inline,
  style,
  ...rest
}) {
  const s = S[state] || S.local;
  if (inline) {
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        fontSize: 'var(--qm-type-label)',
        color: 'var(--qm-text-5)',
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement(__ds_scope.StateDot, {
      state: s.dot,
      size: 7,
      glow: state === 'saved',
      pulse: s.pulse
    }), children);
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 14px',
      borderRadius: 'var(--qm-radius-callout)',
      background: 'var(--qm-surface-raised)',
      border: `1px solid ${s.border}`,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.StateDot, {
    state: s.dot,
    size: 7,
    pulse: s.pulse
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 'var(--qm-type-row)',
      color: s.text
    }
  }, children), tag ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 'var(--qm-type-mono)',
      color: s.tag
    }
  }, tag) : null);
}
Object.assign(__ds_scope, { SaveStatus });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/SaveStatus.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Inset field. Every input in QM is a dark inset well, never a raised box. */
function Field({
  label,
  labelFor,
  hint,
  value,
  placeholder,
  kind = 'text',
  select,
  width,
  size = 'md',
  focused,
  multiline,
  disabled,
  children,
  style,
  ...rest
}) {
  const [inner, setInner] = React.useState(false);
  const mono = kind === 'mono';
  const serif = kind === 'serif';
  const height = size === 'lg' ? 44 : size === 'sm' ? 36 : 38;
  const padY = size === 'lg' ? 10 : size === 'sm' ? 6 : 7;
  const wraps = value == null && placeholder == null;
  const empty = value == null || value === '';
  const ring = disabled ? false : focused === undefined ? inner : focused;
  const Label = labelFor ? 'label' : 'span';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width,
      ...style
    }
  }, rest), label ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 7
    }
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: labelFor,
    style: {
      fontSize: 'var(--qm-type-label)',
      color: 'var(--qm-text-6)'
    }
  }, label), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--qm-type-label)',
      color: 'var(--qm-text-6)'
    }
  }, hint) : null) : null, /*#__PURE__*/React.createElement("div", {
    onFocus: () => setInner(true),
    onBlur: () => setInner(false),
    style: {
      height: multiline ? undefined : height,
      minHeight: multiline ? height : undefined,
      display: 'flex',
      alignItems: multiline ? 'stretch' : 'center',
      gap: 10,
      padding: multiline ? `${padY}px 12px` : '0 12px',
      borderRadius: 'var(--qm-radius-control)',
      background: 'var(--qm-fill-inset-soft)',
      border: `1px solid ${disabled ? 'var(--qm-border-disabled)' : 'var(--qm-border-control-quiet)'}`,
      boxShadow: ring ? 'var(--qm-focus-ring)' : undefined,
      transition: 'box-shadow var(--qm-dur-hover) var(--qm-ease)',
      fontFamily: mono ? 'var(--qm-font-mono)' : serif ? 'var(--qm-font-serif)' : 'var(--qm-font-sans)',
      fontSize: serif ? 'var(--qm-type-body)' : 'var(--qm-field-size,14.5px)',
      lineHeight: multiline ? 'var(--qm-type-body-lh)' : undefined,
      color: disabled ? 'var(--qm-text-9)' : empty && !wraps ? 'var(--qm-text-7)' : 'var(--qm-text-field)',
      cursor: disabled ? 'not-allowed' : select ? 'pointer' : 'text'
    }
  }, wraps ? null : /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, empty ? placeholder : value), children, select ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevronDown",
    size: 13,
    color: "var(--qm-text-6)"
  }) : null));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Picker.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** One popover for [ story-time and @ entities: same keymap, same selection model. */
function Picker({
  query,
  items = [],
  footer,
  teaching,
  width,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width,
      borderRadius: 'var(--qm-radius-card)',
      background: 'var(--qm-surface-raised)',
      border: '1px solid rgba(255,255,255,0.12)',
      boxShadow: 'var(--qm-shadow-popover)',
      overflow: 'hidden',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 14px',
      borderBottom: '1px solid var(--qm-border-group)',
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 'var(--qm-type-module)',
      color: 'var(--qm-text-6)'
    }
  }, query, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--qm-teal)'
    }
  }, "\u258C")), teaching ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '13px 14px 0',
      fontSize: 'var(--qm-type-secondary)',
      lineHeight: 1.55,
      color: 'var(--qm-text-4)'
    }
  }, teaching) : null, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: it.id ?? i,
    onClick: it.onSelect,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: it.leading ? '10px 14px' : '11px 14px',
      background: it.active ? 'var(--qm-fill-hover)' : 'transparent',
      borderTop: it.separated ? '1px solid var(--qm-border-group)' : undefined,
      cursor: 'pointer'
    }
  }, it.leading, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: it.mono ? 'var(--qm-font-mono)' : 'var(--qm-font-sans)',
      fontSize: it.mono ? 'var(--qm-type-label)' : 'var(--qm-type-row)',
      color: it.color || (it.mono ? 'var(--qm-blue-text)' : 'var(--qm-text-3)')
    }
  }, it.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--qm-type-label)',
      color: 'var(--qm-text-6)',
      marginLeft: it.trailingRight ? 'auto' : undefined
    }
  }, it.meta))), footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 14px',
      borderTop: '1px solid var(--qm-border-group)',
      fontSize: 'var(--qm-type-module)',
      color: 'var(--qm-text-6)'
    }
  }, footer) : null);
}
Object.assign(__ds_scope, { Picker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Picker.jsx", error: String((e && e.message) || e) }); }

// components/forms/PromptField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const AUDIENCE = {
  private: {
    border: 'var(--qm-border-control-quiet)',
    dashed: false
  },
  character: {
    border: 'rgba(162,146,242,0.30)',
    dashed: false
  },
  direction: {
    border: 'var(--qm-border-dashed)',
    dashed: true
  },
  scene: {
    border: 'var(--qm-border-parchment)',
    dashed: false
  }
};

/** A line addressed to someone. Who you are talking to is where you are typing. */
function PromptField({
  placeholder,
  value,
  audience = 'private',
  caret,
  hintKey = '⏎',
  trailing,
  focused,
  children,
  style,
  onFocus,
  onBlur,
  ...rest
}) {
  const [inner, setInner] = React.useState(false);
  const A = AUDIENCE[audience];
  const wraps = value == null && placeholder == null;
  const ring = focused === undefined ? inner : focused;
  return /*#__PURE__*/React.createElement("div", _extends({
    onFocus: e => {
      setInner(true);
      if (onFocus) onFocus(e);
    },
    onBlur: e => {
      setInner(false);
      if (onBlur) onBlur(e);
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 40,
      padding: '0 12px',
      borderRadius: 'var(--qm-radius-callout)',
      background: 'var(--qm-fill-inset)',
      border: `1px ${A.dashed ? 'dashed' : 'solid'} ${A.border}`,
      boxShadow: ring ? 'var(--qm-focus-ring)' : undefined,
      transition: 'box-shadow var(--qm-dur-hover) var(--qm-ease)',
      fontSize: 'var(--qm-type-row)',
      color: wraps || value ? 'var(--qm-text-3)' : 'var(--qm-text-7)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "lock",
    size: 13,
    color: "var(--qm-text-7)"
  }), wraps ? null : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, value || placeholder), caret ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--qm-teal)'
    }
  }, "\u258C") : null, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  })), children, trailing, hintKey ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 'var(--qm-type-mono-chip)',
      color: 'var(--qm-text-6)'
    }
  }, hintKey) : null);
}
Object.assign(__ds_scope, { PromptField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/PromptField.jsx", error: String((e && e.message) || e) }); }

// components/forms/PromptTextField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const RESET = {
  flex: 1,
  minWidth: 0,
  width: '100%',
  appearance: 'none',
  WebkitAppearance: 'none',
  background: 'transparent',
  border: 0,
  outline: 'none',
  padding: 0,
  margin: 0,
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  letterSpacing: 'inherit',
  color: 'inherit'
};

/** An addressed line the author types into — a real `<input>` in PromptField's well. */
const PromptTextField = React.forwardRef(function PromptTextField({
  audience,
  hintKey,
  trailing,
  focused,
  className,
  style,
  controlStyle,
  ...rest
}, ref) {
  return /*#__PURE__*/React.createElement(__ds_scope.PromptField, {
    audience: audience,
    hintKey: hintKey,
    trailing: trailing,
    focused: focused,
    style: style
  }, /*#__PURE__*/React.createElement("input", _extends({
    ref: ref,
    className: className ? `qm-control ${className}` : 'qm-control',
    style: {
      ...RESET,
      ...controlStyle
    }
  }, rest)));
});
Object.assign(__ds_scope, { PromptTextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/PromptTextField.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Density and mode switch. Selection is a raised inner surface, never colour. */
function SegmentedControl({
  options = [],
  value,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      height: 34,
      padding: 3,
      borderRadius: 'var(--qm-radius-callout)',
      background: 'rgba(0,0,0,0.32)',
      border: '1px solid var(--qm-border-group)',
      ...style
    }
  }, rest), options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    const label = typeof o === 'string' ? o : o.label;
    const active = v === value;
    const outline = typeof o !== 'string' && o.outline;
    return /*#__PURE__*/React.createElement("div", {
      key: v,
      onClick: () => onChange && onChange(v),
      style: {
        position: 'relative',
        height: 28,
        display: 'flex',
        alignItems: 'center',
        padding: '0 11px',
        borderRadius: 'var(--qm-radius-key)',
        fontSize: 'var(--qm-type-module)',
        color: 'var(--qm-text-row)',
        cursor: 'pointer'
      }
    }, active ? /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        inset: 0,
        borderRadius: 'var(--qm-radius-key)',
        background: outline ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.10)',
        boxShadow: outline ? 'inset 0 0 0 1px rgba(255,255,255,0.18)' : 'inset 0 1px 0 rgba(255,255,255,0.10)'
      }
    }) : null, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'relative'
      }
    }, label));
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Inspector tabs. A 2px neutral underline marks the active one. */
function Tabs({
  tabs = [],
  value,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: 20,
      ...style
    }
  }, rest), tabs.map(t => {
    const v = typeof t === 'string' ? t : t.value;
    const label = typeof t === 'string' ? t : t.label;
    const active = v === value;
    return /*#__PURE__*/React.createElement("div", {
      key: v,
      onClick: () => onChange && onChange(v),
      style: {
        position: 'relative',
        paddingBottom: 11,
        fontSize: 'var(--qm-type-row)',
        color: active ? 'var(--qm-text-2)' : 'var(--qm-text-5)',
        cursor: 'pointer'
      }
    }, label, active ? /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -1,
        height: 2,
        borderRadius: 2,
        background: 'var(--qm-text-row)'
      }
    }) : null);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextArea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const RESET = {
  flex: 1,
  minWidth: 0,
  width: '100%',
  display: 'block',
  appearance: 'none',
  WebkitAppearance: 'none',
  background: 'transparent',
  border: 0,
  outline: 'none',
  padding: 0,
  margin: 0,
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  letterSpacing: 'inherit',
  color: 'inherit'
};

/** Many lines the author types into. `kind="serif"` for anything read as prose. */
const TextArea = React.forwardRef(function TextArea({
  label,
  hint,
  kind = 'text',
  size = 'md',
  width,
  focused,
  rows = 3,
  resize = 'none',
  disabled,
  id,
  className,
  style,
  controlStyle,
  ...rest
}, ref) {
  const auto = React.useId();
  const inputId = id || auto;
  return /*#__PURE__*/React.createElement(__ds_scope.Field, {
    label: label,
    hint: hint,
    labelFor: inputId,
    multiline: true,
    disabled: disabled,
    kind: kind,
    size: size,
    width: width,
    focused: focused,
    style: style
  }, /*#__PURE__*/React.createElement("textarea", _extends({
    ref: ref,
    id: inputId,
    rows: rows,
    disabled: disabled,
    className: className ? `qm-control ${className}` : 'qm-control',
    style: {
      ...RESET,
      resize,
      ...controlStyle
    }
  }, rest)));
});
Object.assign(__ds_scope, { TextArea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextArea.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const RESET = {
  flex: 1,
  minWidth: 0,
  width: '100%',
  appearance: 'none',
  WebkitAppearance: 'none',
  background: 'transparent',
  border: 0,
  outline: 'none',
  padding: 0,
  margin: 0,
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  letterSpacing: 'inherit',
  color: 'inherit'
};

/** A single line the author types into — a real `<input>` in Field's inset well. */
const TextField = React.forwardRef(function TextField({
  label,
  hint,
  kind = 'text',
  size = 'md',
  width,
  focused,
  trailing,
  disabled,
  id,
  className,
  style,
  controlStyle,
  ...rest
}, ref) {
  const auto = React.useId();
  const inputId = id || auto;
  return /*#__PURE__*/React.createElement(__ds_scope.Field, {
    label: label,
    hint: hint,
    labelFor: inputId,
    disabled: disabled,
    kind: kind,
    size: size,
    width: width,
    focused: focused,
    style: style
  }, /*#__PURE__*/React.createElement("input", _extends({
    ref: ref,
    id: inputId,
    disabled: disabled,
    className: className ? `qm-control ${className}` : 'qm-control',
    style: {
      ...RESET,
      ...controlStyle
    }
  }, rest)), trailing);
});
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/narrative/AnnotationMark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  measure: {
    color: 'var(--qm-text-6)',
    bg: 'var(--qm-fill-chip)',
    border: 'transparent'
  },
  good: {
    color: 'var(--qm-teal-text)',
    bg: 'var(--qm-tint-teal)',
    border: 'var(--qm-border-teal)'
  },
  advisory: {
    color: 'var(--qm-gold-text)',
    bg: 'var(--qm-tint-gold)',
    border: 'transparent'
  },
  damaged: {
    color: 'var(--qm-cinnabar-text)',
    bg: 'var(--qm-tint-cinnabar)',
    border: 'transparent'
  },
  unparsed: {
    color: 'var(--qm-text-4)',
    bg: 'rgba(255,255,255,0.04)',
    border: 'var(--qm-border-dashed)',
    dashed: true
  },
  provenance: {
    color: 'var(--qm-violet-text)',
    bg: 'var(--qm-tint-violet)',
    border: 'transparent'
  }
};

/** Deterministic signal on a beat: a measurement, an advisory, or damage. */
function AnnotationMark({
  children,
  tone = 'measure',
  glyph,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.measure;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 'var(--qm-type-mono)',
      color: t.color,
      background: t.bg,
      border: t.border === 'transparent' ? 'none' : `1px ${t.dashed ? 'dashed' : 'solid'} ${t.border}`,
      borderRadius: 'var(--qm-radius-chip)',
      padding: '3px 8px',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), glyph, children);
}
Object.assign(__ds_scope, { AnnotationMark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/narrative/AnnotationMark.jsx", error: String((e && e.message) || e) }); }

// components/narrative/BeatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const RAIL = {
  proposed: 'gold',
  canon: 'teal',
  here: 'coral',
  none: 'none'
};

/** The selected beat, in the outline and in Compose. Material state owns the rail. */
function BeatCard({
  state = 'proposed',
  era,
  entity,
  title,
  directive,
  signals,
  actions,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Card, _extends({
    surface: "beat",
    rail: RAIL[state] || 'none',
    padding: "20px 24px 18px",
    style: {
      marginBottom: 'var(--qm-beat-gap,16px)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 12,
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 'var(--qm-type-mono-chip)',
      letterSpacing: 'var(--qm-ls-mono-tight)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      color: state === 'canon' ? 'var(--qm-teal-text-quiet)' : 'var(--qm-gold-text)',
      background: state === 'canon' ? 'var(--qm-tint-teal)' : 'var(--qm-tint-gold)',
      border: `1px solid ${state === 'canon' ? 'var(--qm-border-teal)' : 'var(--qm-border-gold)'}`,
      borderRadius: 'var(--qm-radius-key)',
      padding: '3px 8px'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.StateDot, {
    state: state === 'canon' ? 'canon' : 'proposed',
    size: 7,
    style: {
      animation: state === 'proposed' ? 'qmBreathe 3s ease-in-out infinite' : undefined
    }
  }), state === 'canon' ? 'CANON' : 'PROPOSED'), era ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--qm-text-9)'
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--qm-coral-text)'
    }
  }, era)) : null, entity ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--qm-text-9)'
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--qm-blue-text)'
    }
  }, entity)) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--qm-font-serif)',
      fontSize: 'var(--qm-type-beat-selected)',
      lineHeight: 'var(--qm-type-beat-selected-lh)',
      color: 'var(--qm-prose-1)',
      textWrap: 'pretty'
    }
  }, title), directive ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 10.5,
      letterSpacing: 'var(--qm-ls-mono)',
      color: 'var(--qm-text-6)'
    }
  }, "DIRECTIVE"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--qm-type-row)',
      color: 'var(--qm-text-4)',
      fontStyle: 'italic'
    }
  }, directive)) : null, signals ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 12
    }
  }, signals) : null, children, actions ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 18
    }
  }, actions) : null);
}
Object.assign(__ds_scope, { BeatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/narrative/BeatCard.jsx", error: String((e && e.message) || e) }); }

// components/narrative/BeatSpine.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* A beat's state is not always a glyph state: `ahead` is a position in the
   draft, not a material state, so it borrows `unwritten`'s hollow grey ring.
   Anything unrecognised lands there too — a beat list never invents canon. */
const DOT_STATE = {
  written: 'written',
  canon: 'canon',
  proposed: 'proposed',
  suggested: 'suggested',
  here: 'here',
  ahead: 'unwritten',
  unwritten: 'unwritten'
};

/**
 * The one beat list, at three depths of detail: the outline rail, the stage
 * rail and Compose's beat column are all this component.
 */
function BeatSpine({
  beats = [],
  onSelect,
  showSpine = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      paddingLeft: showSpine ? 14 : 0,
      ...style
    }
  }, rest), showSpine ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 3,
      top: 8,
      bottom: 8,
      width: 1,
      background: 'var(--qm-border-panel)'
    }
  }) : null, beats.map((b, i) => {
    const here = b.state === 'here';
    const dot = DOT_STATE[b.state] || 'unwritten';
    return /*#__PURE__*/React.createElement("div", {
      key: b.id ?? i,
      onClick: onSelect ? () => onSelect(b, i) : undefined,
      style: {
        position: 'relative',
        display: 'flex',
        gap: 10,
        padding: 'var(--qm-row-py,9px) 10px',
        marginBottom: 1,
        borderRadius: 'var(--qm-radius-control)',
        background: here ? 'var(--qm-surface-selected)' : 'transparent',
        cursor: onSelect ? 'pointer' : 'default'
      }
    }, showSpine ? /*#__PURE__*/React.createElement(__ds_scope.StateDot, {
      state: dot,
      size: 7,
      style: {
        position: 'absolute',
        left: -14,
        top: 14
      }
    }) : /*#__PURE__*/React.createElement(__ds_scope.StateDot, {
      state: dot,
      size: 7,
      style: {
        marginTop: 6
      }
    }), b.n != null ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--qm-font-mono)',
        fontSize: 'var(--qm-type-module)',
        width: 14,
        flex: 'none',
        color: here ? 'var(--qm-gold)' : 'var(--qm-text-8)'
      }
    }, b.n) : null, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--qm-type-secondary)',
        lineHeight: 1.5,
        color: here ? 'var(--qm-prose-2)' : dot === 'unwritten' ? 'var(--qm-text-6)' : 'var(--qm-text-emph)'
      }
    }, b.text), b.meta ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        marginTop: 7,
        fontFamily: 'var(--qm-font-mono)',
        fontSize: 'var(--qm-type-mono)',
        color: 'var(--qm-text-6)'
      }
    }, b.meta) : null, here ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        marginTop: 7,
        padding: '2px 7px 2px 6px',
        borderRadius: 'var(--qm-radius-chip)',
        background: 'var(--qm-tint-coral-strong)',
        fontFamily: 'var(--qm-font-mono)',
        fontSize: 'var(--qm-type-mono-chip)',
        letterSpacing: 'var(--qm-ls-mono-tight)',
        color: 'var(--qm-coral-text)'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.StateDot, {
      state: "here",
      size: 6
    }), "HERE") : null));
  }));
}
Object.assign(__ds_scope, { BeatSpine });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/narrative/BeatSpine.jsx", error: String((e && e.message) || e) }); }

// components/narrative/EntityToken.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** One blue-green for entities at every scale: inline name, chip, or avatar+chip. */
function EntityToken({
  name,
  initials,
  role,
  kind = 'character',
  variant = 'chip',
  onDismiss,
  onClick,
  style,
  ...rest
}) {
  if (variant === 'inline') {
    return /*#__PURE__*/React.createElement("span", _extends({
      onClick: onClick,
      style: {
        color: 'var(--qm-blue-text)',
        borderBottom: '1px solid rgba(95,168,188,0.35)',
        cursor: onClick ? 'pointer' : 'inherit',
        ...style
      }
    }, rest), name);
  }
  const tinted = kind === 'character';
  return /*#__PURE__*/React.createElement("span", _extends({
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 32,
      padding: initials ? '0 10px 0 6px' : '0 11px',
      borderRadius: 'var(--qm-radius-pill)',
      background: tinted ? 'var(--qm-tint-blue-soft)' : 'var(--qm-fill-chip)',
      border: `1px solid ${tinted ? 'var(--qm-border-blue)' : 'var(--qm-border-control-quiet)'}`,
      cursor: onClick ? 'pointer' : 'default',
      ...style
    }
  }, rest), initials ? /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    initials: initials,
    kind: kind,
    size: 22
  }) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--qm-type-secondary)',
      color: 'var(--qm-text-3)'
    }
  }, name), role ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--qm-type-module)',
      color: 'var(--qm-text-7)'
    }
  }, role) : null, onDismiss ? /*#__PURE__*/React.createElement("span", {
    onClick: e => {
      e.stopPropagation();
      onDismiss(e);
    },
    style: {
      display: 'inline-flex',
      color: 'var(--qm-text-6)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 13
  })) : null);
}
Object.assign(__ds_scope, { EntityToken });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/narrative/EntityToken.jsx", error: String((e && e.message) || e) }); }

// components/narrative/EraChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const KINDS = {
  time: {
    color: 'var(--qm-blue-text)',
    bg: 'var(--qm-tint-blue)',
    border: 'var(--qm-border-blue)'
  },
  timeless: {
    color: 'var(--qm-text-6)',
    bg: 'var(--qm-fill-chip)',
    border: 'var(--qm-border-control-quiet)'
  },
  peek: {
    color: 'var(--qm-coral-text)',
    bg: 'var(--qm-tint-coral)',
    border: 'var(--qm-border-coral)'
  },
  teaching: {
    color: 'var(--qm-blue-text)',
    bg: 'var(--qm-tint-blue-soft)',
    border: 'rgba(95,168,188,0.34)',
    dashed: true
  }
};

/** Story-time marker. Chronology is always mono. */
function EraChip({
  children,
  kind = 'time',
  size = 'md',
  style,
  ...rest
}) {
  const k = KINDS[kind] || KINDS.time;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: size === 'sm' ? 'var(--qm-type-mono-chip)' : 'var(--qm-type-module)',
      color: k.color,
      background: k.bg,
      border: `1px solid ${k.border}`,
      borderStyle: k.dashed ? 'dashed' : 'solid',
      borderRadius: 'var(--qm-radius-chip)',
      padding: size === 'sm' ? '2px 6px' : '3px 8px',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { EraChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/narrative/EraChip.jsx", error: String((e && e.message) || e) }); }

// components/narrative/NoteBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Author note or aside: italic serif behind a 2px rule. Never prose, never a card. */
function NoteBlock({
  children,
  tone = 'neutral',
  size = 'md',
  style,
  ...rest
}) {
  const rules = {
    neutral: 'rgba(255,255,255,0.16)',
    consult: 'rgba(162,146,242,0.5)',
    scene: 'linear-gradient(180deg,#E8DCC0,rgba(232,220,192,0.2))'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: 12,
      padding: '10px 14px',
      borderRadius: 'var(--qm-radius-control)',
      background: tone === 'neutral' ? 'var(--qm-fill-quiet)' : 'transparent',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 2,
      flex: 'none',
      borderRadius: 2,
      background: rules[tone] || rules.neutral
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-serif)',
      fontStyle: 'italic',
      fontSize: size === 'sm' ? 'var(--qm-type-secondary)' : 'var(--qm-type-note)',
      lineHeight: 'var(--qm-type-note-lh)',
      color: tone === 'consult' ? 'var(--qm-violet-quiet)' : 'var(--qm-text-4)'
    }
  }, children));
}
Object.assign(__ds_scope, { NoteBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/narrative/NoteBlock.jsx", error: String((e && e.message) || e) }); }

// components/narrative/RouteChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Three states, never two: a count, an invitation, or the bare surface name. */
function RouteChip({
  children,
  state = 'count',
  icon,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const s = {
    count: {
      color: 'var(--qm-text-3)',
      bg: 'var(--qm-fill-rest)',
      border: 'var(--qm-border-control-quiet)'
    },
    invitation: {
      color: 'var(--qm-gold-text)',
      bg: 'var(--qm-fill-rest)',
      border: 'var(--qm-border-gold)'
    },
    unknown: {
      color: 'var(--qm-text-6)',
      bg: 'rgba(255,255,255,0.03)',
      border: 'var(--qm-border-panel)'
    }
  }[state];
  return /*#__PURE__*/React.createElement("span", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      height: 32,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      padding: '0 12px',
      borderRadius: 'var(--qm-radius-control)',
      fontSize: 'var(--qm-type-secondary)',
      color: s.color,
      background: hover ? 'var(--qm-fill-hover)' : s.bg,
      border: `1px solid ${s.border}`,
      cursor: onClick ? 'pointer' : 'default',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: 'var(--qm-text-6)'
    }
  }, icon) : null, children);
}
Object.assign(__ds_scope, { RouteChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/narrative/RouteChip.jsx", error: String((e && e.message) || e) }); }

// components/narrative/TimelineRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The selection rail carries the same state the dot does, so it follows the
   dot's hue. `unlinked` is dimmed gold — attention, not fault. */
const RAIL = {
  canon: 'var(--qm-teal)',
  proposed: 'var(--qm-gold)',
  suggested: 'var(--qm-violet)',
  here: 'var(--qm-coral)',
  conflict: 'var(--qm-cinnabar)',
  unlinked: 'var(--qm-gold-dim)'
};

/** A chronology row in the timeline rail. Selection is a surface; state is the dot. */
function TimelineRow({
  title,
  meta,
  who,
  state = 'canon',
  selected,
  here,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      display: 'flex',
      gap: 10,
      padding: 'var(--qm-row-py,12px) 12px',
      borderRadius: 'var(--qm-radius-control)',
      background: selected ? 'linear-gradient(90deg, #232C38, rgba(35,44,56,0.30))' : hover ? 'var(--qm-fill-hover)' : 'transparent',
      cursor: onClick ? 'pointer' : 'default',
      ...style
    }
  }, rest), selected ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: -11,
      top: 6,
      bottom: 6,
      width: 'var(--qm-rail-w-accent)',
      borderRadius: 2,
      background: RAIL[state] || 'var(--qm-text-6)',
      boxShadow: state === 'proposed' ? 'var(--qm-glow-gold-rail)' : 'none'
    }
  }) : null, /*#__PURE__*/React.createElement(__ds_scope.StateDot, {
    state: state,
    size: 9,
    style: {
      marginTop: 5,
      boxShadow: selected && state === 'proposed' ? '0 0 0 3px var(--qm-tint-gold)' : undefined
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--qm-type-row)',
      lineHeight: 'var(--qm-type-row-lh)',
      color: selected ? 'var(--qm-prose-2)' : 'var(--qm-text-3)'
    }
  }, title), here ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      marginTop: 8,
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 'var(--qm-type-mono)',
      color: 'var(--qm-text-5)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '2px 7px 2px 6px',
      borderRadius: 'var(--qm-radius-chip)',
      background: 'var(--qm-tint-coral-strong)',
      color: 'var(--qm-coral-text)',
      letterSpacing: 'var(--qm-ls-mono-tight)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.StateDot, {
    state: "here",
    size: 6
  }), "HERE"), meta) : meta ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 5,
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 'var(--qm-type-module)',
      color: 'var(--qm-text-6)',
      display: 'var(--qm-meta,block)'
    }
  }, meta) : null), who ? /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    initials: who,
    kind: state === 'canon' && !selected ? 'neutral' : 'character',
    size: 24,
    style: {
      marginTop: 1
    }
  }) : null);
}
Object.assign(__ds_scope, { TimelineRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/narrative/TimelineRow.jsx", error: String((e && e.message) || e) }); }

// components/narrative/VersionStrip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** One axis, two origins: written revisions and generated candidates. */
function VersionStrip({
  versions = [],
  label = 'VERSION',
  note,
  onSelect,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 22px',
      borderBottom: '1px solid var(--qm-border-group)',
      background: 'rgba(255,255,255,0.015)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 'var(--qm-type-mono-micro)',
      letterSpacing: 'var(--qm-ls-mono)',
      color: 'var(--qm-text-6)'
    }
  }, label), versions.map((v, i) => {
    const generated = v.origin === 'generated';
    return /*#__PURE__*/React.createElement("span", {
      key: v.id ?? i,
      onClick: onSelect ? () => onSelect(v, i) : undefined,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        height: 28,
        flex: 'none',
        whiteSpace: 'nowrap',
        padding: '0 10px',
        borderRadius: 'var(--qm-radius-key)',
        fontSize: 'var(--qm-type-module)',
        color: v.current ? 'var(--qm-text-1)' : generated ? 'var(--qm-violet-text)' : 'var(--qm-text-4)',
        background: v.current ? 'var(--qm-surface-selected)' : 'transparent',
        border: `1px solid ${v.current ? 'rgba(255,255,255,0.14)' : generated ? 'var(--qm-border-violet)' : 'var(--qm-border-control-quiet)'}`,
        cursor: onSelect ? 'pointer' : 'default'
      }
    }, generated ? /*#__PURE__*/React.createElement(__ds_scope.StateDot, {
      state: "suggested",
      size: 6
    }) : null, v.label, v.score ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--qm-font-mono)',
        fontSize: 'var(--qm-type-mono-chip)',
        color: v.current ? 'var(--qm-teal-text)' : generated ? 'var(--qm-violet-dim)' : 'var(--qm-text-7)'
      }
    }, v.score) : null);
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), note ? /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0,
      textAlign: 'right',
      fontSize: 'var(--qm-type-module)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: 'var(--qm-text-7)'
    }
  }, note) : null);
}
Object.assign(__ds_scope, { VersionStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/narrative/VersionStrip.jsx", error: String((e && e.message) || e) }); }

// components/navigation/PanelHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Audience is a surface temperature, not an accent: lit warm room, unlit private. */
function PanelHeader({
  audience = 'plain',
  label,
  note,
  children,
  style,
  ...rest
}) {
  const scene = audience === 'scene';
  const priv = audience === 'private';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 18px',
      background: scene ? 'var(--qm-scene-surface)' : priv ? 'var(--qm-private-surface)' : 'transparent',
      borderBottom: scene ? '1px solid var(--qm-scene-border-soft)' : priv ? '1px dashed var(--qm-private-border)' : '1px solid var(--qm-border-group)',
      ...style
    }
  }, rest), audience === 'plain' ? null : /*#__PURE__*/React.createElement(__ds_scope.StateDot, {
    state: scene ? 'scene' : 'private',
    size: 8,
    glow: scene
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--qm-type-module)',
      fontWeight: 'var(--qm-weight-semibold)',
      letterSpacing: 'var(--qm-ls-module)',
      color: scene ? 'var(--qm-scene-label)' : priv ? 'var(--qm-text-4)' : 'var(--qm-text-row)'
    }
  }, label), note ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--qm-type-label)',
      color: scene ? 'var(--qm-scene-text-dim)' : 'var(--qm-text-7)'
    }
  }, note) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), children);
}
Object.assign(__ds_scope, { PanelHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/PanelHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/StatusBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** 32px mono status line: where you are on the left, counts on the right. */
function StatusBar({
  left,
  right,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      height: 'var(--qm-statusbar-h)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 18px',
      background: 'var(--qm-surface-status)',
      borderBottom: '1px solid var(--qm-border-group)',
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 'var(--qm-type-mono)',
      color: 'var(--qm-text-6)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", null, left), /*#__PURE__*/React.createElement("span", null, right));
}
Object.assign(__ds_scope, { StatusBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/StatusBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** The fixed 48/56px app bar: gradient graphite, one structural hairline beneath. */
function TopBar({
  tall,
  brand,
  breadcrumb,
  leading,
  center,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      height: tall ? 'var(--qm-topbar-h-tall)' : 'var(--qm-topbar-h)',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '0 18px',
      background: 'var(--qm-topbar)',
      borderBottom: '1px solid var(--qm-border-structural)',
      ...style
    }
  }, rest), brand !== false ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: tall ? 24 : 22,
      height: tall ? 24 : 22,
      borderRadius: 6,
      background: 'var(--qm-mark)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: tall ? 15 : 14.5,
      fontWeight: 'var(--qm-weight-semibold)',
      letterSpacing: '0.02em',
      color: 'var(--qm-text-1)'
    }
  }, "QM"), breadcrumb ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'var(--qm-text-hairline)'
    }
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'var(--qm-text-row)'
    }
  }, breadcrumb)) : null) : null, leading ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, leading) : null, center ? /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center'
    }
  }, center) : /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, children));
}
Object.assign(__ds_scope, { TopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/story-engine/Compose.jsx
try { (() => {
const {
  Button,
  Icon,
  StateDot,
  AnnotationMark,
  BeatSpine,
  Card,
  TopBar
} = window.QuantumMateriaDesignSystem_488cde;
function Compose({
  onExit
}) {
  const [current, setCurrent] = React.useState(1);
  const [marks, setMarks] = React.useState({
    '2-1': 'highlight'
  });
  const mark = (key, kind) => setMarks(m => ({
    ...m,
    [key]: m[key] === kind ? undefined : kind
  }));
  const beats = window.QM_COMPOSE_BEATS.map(b => ({
    n: b.n,
    text: b.text,
    state: b.n === current ? 'here' : 'written',
    meta: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StateDot, {
      state: "canon",
      size: 7
    }), /*#__PURE__*/React.createElement("span", null, "slot ", b.slot))
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--qm-surface-shell)'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    tall: true,
    brand: false
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 11.5,
      letterSpacing: 'var(--qm-ls-module)',
      color: 'var(--qm-text-6)',
      marginRight: 6
    }
  }, "COMPOSE"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-serif)',
      fontSize: 18,
      color: 'var(--qm-prose-2)'
    }
  }, "Luna Station Dome and Tunnel"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--qm-text-5)'
    }
  }, "E1 \xB7 submitted"), /*#__PURE__*/React.createElement(AnnotationMark, {
    tone: "good"
  }, "pre-selected: ranked winner, slot 1"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 13,
      color: 'var(--qm-scene-text)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      background: 'rgba(232,220,192,0.55)'
    }
  }), "1 highlighted"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 13,
      color: 'var(--qm-text-5)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 2,
      background: 'var(--qm-text-6)'
    }
  }), "1 struck"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Compose master"), /*#__PURE__*/React.createElement(Button, {
    onClick: onExit
  }, "Exit")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flex: 1,
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "qm-scroll",
    style: {
      width: 268,
      flex: 'none',
      overflowY: 'auto',
      background: 'var(--qm-surface-panel)',
      borderRight: '1px solid var(--qm-border-panel)',
      padding: '14px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      letterSpacing: 'var(--qm-ls-mono)',
      color: 'var(--qm-text-5)',
      padding: '4px 8px 12px'
    }
  }, "BEATS \xB7 7"), /*#__PURE__*/React.createElement(BeatSpine, {
    showSpine: false,
    beats: beats,
    onSelect: b => setCurrent(b.n)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      background: 'var(--qm-surface-rail)'
    }
  }, window.QM_CANDIDATES.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.slot,
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      borderRight: col.slot < 2 ? '1px solid var(--qm-border-group)' : 'none',
      background: col.ranked ? '#131A22' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 16px',
      borderBottom: col.ranked ? '1px solid var(--qm-border-teal)' : '1px solid var(--qm-border-panel)',
      background: col.ranked ? 'linear-gradient(180deg,#17222A,#141C24)' : 'var(--qm-surface-panel)',
      boxShadow: col.ranked ? 'inset 0 2px 0 var(--qm-teal)' : 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "grip",
    size: 13,
    color: "var(--qm-text-8)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: col.ranked ? 'var(--qm-text-1)' : 'var(--qm-text-2)'
    }
  }, "slot ", col.slot), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 12,
      color: 'var(--qm-text-6)'
    }
  }, col.run), col.ranked ? /*#__PURE__*/React.createElement(AnnotationMark, {
    tone: "advisory"
  }, col.rank) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 12,
      color: 'var(--qm-text-6)'
    }
  }, col.rank), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 12.5,
      color: col.chosen[0] === '0' ? 'var(--qm-text-6)' : 'var(--qm-teal-text)'
    }
  }, col.chosen)), /*#__PURE__*/React.createElement("div", {
    className: "qm-scroll",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: 16
    }
  }, col.slot === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18,
      fontFamily: 'var(--qm-font-serif)',
      fontSize: 16,
      lineHeight: 1.7,
      color: 'var(--qm-prose-5)'
    }
  }, "The corridor beyond the viewport stayed empty. Briggs logged a secure check at 0915.", ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'rgba(232,220,192,0.16)',
      boxShadow: 'inset 0 -1px 0 rgba(232,220,192,0.5)'
    }
  }, "Then 0930. 0945. 1000. Each time he entered the code, watched the green confirm flash on his wrist display."), ' ', "The apparatus did not move.") : null, col.beats.map((b, i) => {
    const key = col.slot + '-' + i;
    const state = marks[key];
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      style: {
        borderRadius: 9,
        border: `1px solid ${b.cut ? 'var(--qm-border-cinnabar)' : b.chosen ? 'var(--qm-border-teal)' : 'var(--qm-border-panel)'}`,
        background: 'var(--qm-surface-raised)',
        overflow: 'hidden',
        marginBottom: 14,
        boxShadow: b.chosen ? 'inset 3px 0 0 var(--qm-teal)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        padding: '10px 14px',
        borderBottom: '1px solid var(--qm-border-group)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 20,
        height: 20,
        borderRadius: 5,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: b.chosen ? 'rgba(85,183,166,0.20)' : 'transparent',
        border: `1px solid ${b.chosen ? 'var(--qm-border-teal-strong)' : 'rgba(255,255,255,0.18)'}`
      }
    }, b.chosen ? /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 12,
      color: "var(--qm-teal-text)",
      strokeWidth: 2.4
    }) : null), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--qm-font-mono)',
        fontSize: 12.5,
        color: b.chosen ? 'var(--qm-text-2)' : 'var(--qm-text-3)'
      }
    }, b.beat), /*#__PURE__*/React.createElement(AnnotationMark, null, "lint ", b.lint), b.tell ? /*#__PURE__*/React.createElement(AnnotationMark, {
      tone: b.tell === 'critical' ? 'damaged' : 'advisory'
    }, "tell ", b.tell) : null, b.cut ? /*#__PURE__*/React.createElement(AnnotationMark, {
      tone: "damaged",
      glyph: /*#__PURE__*/React.createElement("span", {
        style: {
          width: 0,
          height: 0,
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderBottom: '8px solid var(--qm-cinnabar)'
        }
      })
    }, "cut mid-clause") : null, b.fn ? /*#__PURE__*/React.createElement(AnnotationMark, null, "fn ", b.fn) : null, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 22,
        height: 22,
        borderRadius: 5,
        border: '1px solid rgba(255,255,255,0.12)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 11.5,
        color: 'var(--qm-text-4)',
        cursor: 'pointer'
      }
    }, "i")), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 14,
        fontFamily: 'var(--qm-font-serif)',
        fontSize: 16,
        lineHeight: 1.7,
        color: 'var(--qm-prose-4)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        background: state === 'highlight' ? 'rgba(232,220,192,0.16)' : b.selectable ? 'rgba(95,168,188,0.18)' : 'transparent',
        boxShadow: state === 'highlight' ? 'inset 0 -1px 0 rgba(232,220,192,0.5)' : 'none',
        color: state === 'strike' ? 'var(--qm-text-8)' : undefined,
        textDecoration: state === 'strike' ? 'line-through' : undefined
      }
    }, b.text)), b.selectable ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 14px',
        borderTop: '1px solid var(--qm-border-group)'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "scene",
      size: "tiny",
      hint: "H",
      onClick: () => mark(key, 'highlight'),
      leadingIcon: /*#__PURE__*/React.createElement(Icon, {
        name: "highlighter",
        size: 12
      })
    }, "Highlight"), /*#__PURE__*/React.createElement(Button, {
      size: "tiny",
      hint: "X",
      onClick: () => mark(key, 'strike')
    }, "Strike"), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 13,
      color: "var(--qm-text-7)"
    })) : null);
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '12px 18px',
      borderTop: '1px solid var(--qm-border-panel)',
      background: 'var(--qm-surface-status)',
      fontSize: 13.5,
      color: 'var(--qm-text-6)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--qm-text-emph)'
    }
  }, "Annotate, don\u2019t rank."), /*#__PURE__*/React.createElement("span", null, "lint and fn are deterministic signals, not judgements \u2014 nothing here sorts on an aggregate."), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 12.5
    }
  }, "lint unparsed \u2260 0 findings")));
}
Object.assign(window, {
  Compose
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/story-engine/Compose.jsx", error: String((e && e.message) || e) }); }

// ui_kits/story-engine/NewScene.jsx
try { (() => {
const {
  Button,
  Icon,
  Avatar,
  Card,
  EraChip,
  Field,
  AnnotationMark,
  TopBar
} = window.QuantumMateriaDesignSystem_488cde;
function NewScene({
  onBack,
  onEnter
}) {
  const [cast, setCast] = React.useState(['vera', 'cade-briggs']);
  const chosen = window.QM_ROSTER.filter(r => cast.includes(r.id));
  const toggle = id => setCast(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--qm-surface-shell)'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    breadcrumb: "New scene"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: onBack
  }, "Cancel")), /*#__PURE__*/React.createElement("div", {
    className: "qm-scroll",
    style: {
      flex: 1,
      overflowY: 'auto',
      background: 'radial-gradient(900px 480px at 50% -10%, #1A232D 0%, #10161C 65%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 400px',
      gap: 40,
      padding: '44px 60px 52px',
      minHeight: 620
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 14,
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-serif)',
      fontSize: 30,
      color: 'var(--qm-prose-1)'
    }
  }, "New scene"), /*#__PURE__*/React.createElement("span", {
    onClick: onBack,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 13.5,
      color: 'var(--qm-text-6)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrowLeft",
    size: 13
  }), "back to the writing room")), /*#__PURE__*/React.createElement(Field, {
    label: "Title",
    kind: "serif",
    value: "Vera & Cade \u2014 the corridor",
    style: {
      marginBottom: 24
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--qm-text-6)'
    }
  }, "Cast"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--qm-text-6)'
    }
  }, cast.length, " chosen \xB7 18 in the catalogue")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 8,
      background: 'var(--qm-surface-panel)',
      border: '1px solid var(--qm-border-control-quiet)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 42,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '0 14px',
      borderBottom: '1px solid var(--qm-border-group)',
      fontSize: 14,
      color: 'var(--qm-text-7)'
    }
  }, "search characters\u2026", /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 12,
      color: 'var(--qm-text-8)'
    }
  }, "18")), window.QM_ROSTER.map(r => {
    const on = cast.includes(r.id);
    return /*#__PURE__*/React.createElement("div", {
      key: r.id,
      onClick: () => toggle(r.id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '11px 14px',
        borderBottom: '1px solid var(--qm-border-list)',
        cursor: 'pointer',
        background: on ? 'rgba(85,183,166,0.05)' : 'transparent'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 20,
        height: 20,
        flex: 'none',
        borderRadius: 5,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: on ? 'var(--qm-teal-text)' : 'var(--qm-text-6)',
        background: on ? 'rgba(85,183,166,0.18)' : 'transparent',
        border: `1px solid ${on ? 'var(--qm-border-teal-strong)' : 'rgba(255,255,255,0.14)'}`
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: on ? 'check' : 'plus',
      size: 12,
      strokeWidth: on ? 2.4 : 2
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14.5,
        color: 'var(--qm-text-field)'
      }
    }, r.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: 'var(--qm-text-7)'
      }
    }, r.rank), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(AnnotationMark, {
      tone: r.src === 'soul' ? 'provenance' : 'measure'
    }, r.src));
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--qm-text-6)',
      marginBottom: 7
    }
  }, "Story-time"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 13.5,
      color: 'var(--qm-text-6)'
    }
  }, "Y"), /*#__PURE__*/React.createElement(Field, {
    kind: "mono",
    value: "\u22126",
    width: 92,
    size: "sm"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 13.5,
      color: 'var(--qm-text-6)'
    }
  }, "D"), /*#__PURE__*/React.createElement(Field, {
    kind: "mono",
    value: "1",
    width: 92,
    size: "sm"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: 'var(--qm-text-7)'
    }
  }, "Leave both blank for the latest canon.")))), /*#__PURE__*/React.createElement(Card, {
    surface: "selected",
    padding: 24,
    style: {
      alignSelf: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 11.5,
      letterSpacing: 'var(--qm-ls-module)',
      color: 'var(--qm-text-6)',
      marginBottom: 14
    }
  }, "YOU ARE ABOUT TO ENTER"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--qm-font-serif)',
      fontSize: 24,
      lineHeight: 1.3,
      color: 'var(--qm-prose-1)',
      marginBottom: 16
    }
  }, "Vera & Cade \u2014 the corridor"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(EraChip, null, "Y\u22126 D1"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: 'var(--qm-text-5)'
    }
  }, "Luna Station \xB7 six years before")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginBottom: 20
    }
  }, chosen.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: c.initials
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--qm-text-3)'
    }
  }, c.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--qm-text-7)'
    }
  }, c.rank))), chosen.length === 0 ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: 'var(--qm-text-7)'
    }
  }, "No one yet.") : null), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    disabled: chosen.length === 0,
    onClick: chosen.length ? onEnter : undefined
  }, "Enter the room \u2192"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      lineHeight: 1.6,
      color: 'var(--qm-text-7)',
      marginTop: 12
    }
  }, chosen.length === 0 ? 'Choose at least one character — the reason sits under the button, not in a tooltip.' : 'Disabled until at least one character is chosen and the story-time parses.')))));
}
Object.assign(window, {
  NewScene
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/story-engine/NewScene.jsx", error: String((e && e.message) || e) }); }

// ui_kits/story-engine/Outline.jsx
try { (() => {
const {
  Button,
  Icon,
  StateDot,
  Avatar,
  Card,
  EraChip,
  EntityToken,
  Field,
  Tabs,
  SegmentedControl,
  TimelineRow,
  BeatCard,
  NoteBlock,
  Callout,
  SaveStatus,
  PanelHeader,
  TopBar,
  StatusBar,
  Kbd,
  PromptField
} = window.QuantumMateriaDesignSystem_488cde;
function Outline({
  onExit
}) {
  const [density, setDensity] = React.useState('Comfortable');
  const [tab, setTab] = React.useState('Details');
  const [collapsed, setCollapsed] = React.useState(false);
  const focus = density === 'Focus';
  const rails = !focus;
  return /*#__PURE__*/React.createElement("div", {
    "data-qm-density": focus ? 'focus' : density.toLowerCase(),
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--qm-surface-shell)'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    tall: true,
    breadcrumb: "Outline",
    center: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        height: 34,
        padding: '0 14px 0 12px',
        borderRadius: 8,
        background: 'var(--qm-fill-rest)',
        border: '1px solid var(--qm-border-group)',
        fontSize: 13.5,
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--qm-text-6)'
      }
    }, "Whole chronology"), /*#__PURE__*/React.createElement(Icon, {
      name: "chevronRight",
      size: 12,
      color: "var(--qm-text-hairline)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--qm-text-row)'
      }
    }, "Epigraphs"), /*#__PURE__*/React.createElement(Icon, {
      name: "chevronRight",
      size: 12,
      color: "var(--qm-text-hairline)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--qm-text-2)'
      }
    }, "Sarita reads a letter\u2026"), /*#__PURE__*/React.createElement(Kbd, {
      style: {
        height: 22,
        minWidth: 0,
        fontSize: 11,
        boxShadow: 'none'
      }
    }, "\u2318K"))
  }, /*#__PURE__*/React.createElement(SaveStatus, {
    inline: true
  }, "Local draft"), /*#__PURE__*/React.createElement(SegmentedControl, {
    value: density,
    onChange: setDensity,
    options: ['Comfortable', 'Compact', {
      value: 'Focus',
      label: 'Focus',
      outline: true
    }]
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Save"), /*#__PURE__*/React.createElement(Button, {
    onClick: onExit
  }, "Exit")), /*#__PURE__*/React.createElement(StatusBar, {
    left: "outline \xB7 epigraphs \xB7 depth 3",
    right: /*#__PURE__*/React.createElement(React.Fragment, null, "9 rows \xB7 603 chars \xB7 ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--qm-gold)'
      }
    }, "1 proposed"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flex: 1,
      minHeight: 0
    }
  }, rails ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: 'var(--qm-rail-w-live)',
      flex: 'none',
      background: 'var(--qm-surface-panel)',
      borderRight: '1px solid var(--qm-border-panel)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 16px 12px',
      borderBottom: '1px solid var(--qm-border-group)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      letterSpacing: 'var(--qm-ls-module)',
      color: 'var(--qm-text-row)'
    }
  }, "TIMELINE"), /*#__PURE__*/React.createElement(Button, {
    size: "xxs",
    onClick: () => setCollapsed(c => !c),
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "unfold",
      size: 14
    })
  }, collapsed ? 'Expand' : 'Collapse all')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--qm-text-6)'
    }
  }, "57 canon \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--qm-gold)'
    }
  }, "1 proposed")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 12,
      color: 'var(--qm-text-6)'
    }
  }, "\u2325\u23180")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      height: 28,
      padding: '0 10px',
      borderRadius: 6,
      fontSize: 12.5,
      color: 'var(--qm-teal-text-quiet)',
      background: 'var(--qm-tint-teal)',
      border: '1px solid var(--qm-border-teal)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(StateDot, {
    state: "canon",
    size: 7
  }), "Canon"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      height: 28,
      padding: '0 10px',
      borderRadius: 6,
      fontSize: 12.5,
      color: 'var(--qm-gold-text)',
      background: 'var(--qm-tint-gold)',
      border: '1px solid var(--qm-border-gold)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(StateDot, {
    state: "proposed",
    size: 7
  }), "Proposed"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      height: 28,
      padding: '0 10px',
      borderRadius: 6,
      fontSize: 12.5,
      color: 'var(--qm-text-5)',
      border: '1px solid var(--qm-border-control-quiet)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(StateDot, {
    state: "suggested",
    size: 7
  }), "Suggested"))), /*#__PURE__*/React.createElement("div", {
    className: "qm-scroll",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '4px 10px 30px'
    }
  }, collapsed ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      paddingLeft: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 5,
      top: 10,
      bottom: 8,
      width: 1,
      background: 'linear-gradient(180deg, rgba(241,123,84,0.45), rgba(255,255,255,0.08))'
    }
  }), window.QM_YEARS_COLLAPSED.map(y => /*#__PURE__*/React.createElement("div", {
    key: y.year,
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '11px 12px',
      borderRadius: 7,
      marginBottom: 1,
      cursor: 'pointer',
      background: y.here ? 'linear-gradient(90deg, rgba(241,123,84,0.10), transparent)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: -11,
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: y.here ? 'var(--qm-coral)' : 'var(--qm-text-faint)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 13,
      letterSpacing: 'var(--qm-ls-mono-tight)',
      color: y.here ? 'var(--qm-coral)' : 'var(--qm-text-4)',
      width: 62,
      flex: 'none'
    }
  }, y.year), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 3,
      flexWrap: 'wrap'
    }
  }, y.dots.map((d, i) => /*#__PURE__*/React.createElement(StateDot, {
    key: i,
    state: d,
    size: 7
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 12,
      color: 'var(--qm-text-6)'
    }
  }, y.count)))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      paddingLeft: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 5,
      top: 26,
      bottom: 4,
      width: 1,
      background: 'linear-gradient(180deg, rgba(241,123,84,0.55), rgba(255,255,255,0.08))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      padding: '16px 0 8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 12.5,
      letterSpacing: 'var(--qm-ls-year)',
      color: 'var(--qm-coral)'
    }
  }, "YEAR \u221240"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: 'rgba(241,123,84,0.22)'
    }
  })), /*#__PURE__*/React.createElement(TimelineRow, {
    selected: true,
    here: true,
    state: "proposed",
    who: "SF",
    title: "The student begins by describing the Artifact as a work of art",
    meta: "depth 3"
  })), window.QM_YEARS.map(y => /*#__PURE__*/React.createElement("div", {
    key: y.year,
    style: {
      position: 'relative',
      paddingLeft: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 5,
      top: 26,
      bottom: 4,
      width: 1,
      background: 'var(--qm-border-panel)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      padding: '16px 0 8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 12.5,
      letterSpacing: 'var(--qm-ls-year)',
      color: 'var(--qm-text-4)'
    }
  }, "YEAR ", y.year), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--qm-border-group)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 12.5,
      color: 'var(--qm-text-6)',
      display: 'var(--qm-meta, inline)'
    }
  }, y.count)), y.events.map((ev, i) => /*#__PURE__*/React.createElement(TimelineRow, {
    key: i,
    state: ev.state,
    who: ev.who,
    title: ev.title,
    meta: ev.meta
  }))))))) : null, /*#__PURE__*/React.createElement("div", {
    className: "qm-scroll",
    style: {
      flex: 1,
      minWidth: 0,
      overflowY: 'auto',
      background: 'var(--qm-surface-canvas-glow)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 'var(--qm-col)',
      maxWidth: 'calc(100% - 80px)',
      margin: '0 auto',
      padding: '44px 0 90px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 22,
      marginBottom: 26,
      borderBottom: '1px solid var(--qm-border-panel)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      letterSpacing: 'var(--qm-ls-module)',
      color: 'var(--qm-text-5)',
      marginBottom: 12
    }
  }, "EPIGRAPHS"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--qm-font-serif)',
      fontSize: 'var(--qm-type-context-header)',
      lineHeight: 'var(--qm-type-context-header-lh)',
      color: 'var(--qm-prose-2)'
    }
  }, "Sarita Fernandes reads a letter from a prospective student"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginTop: 14,
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 12.5,
      color: 'var(--qm-text-6)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Y35.100 \u2192 Y\u221240"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--qm-text-faint)'
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "8 beats"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--qm-text-faint)'
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--qm-gold)'
    }
  }, "1 proposed"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    size: "tiny"
  }, "Reading mode"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-serif)',
      fontSize: 21,
      color: 'var(--qm-text-row)'
    }
  }, "Epigraphs"), /*#__PURE__*/React.createElement(EraChip, {
    size: "sm"
  }, "Y35.100")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      paddingLeft: 22,
      borderLeft: '1px solid var(--qm-border-ancestry)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-serif)',
      fontSize: 20,
      color: 'var(--qm-text-row)'
    }
  }, /*#__PURE__*/React.createElement(EntityToken, {
    variant: "inline",
    name: "Sarita Fernandes"
  }), " reads a letter from a prospective student")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      paddingLeft: 22,
      borderLeft: '1px solid rgba(226,165,68,0.24)'
    }
  }, /*#__PURE__*/React.createElement(BeatCard, {
    state: "proposed",
    era: "Y\u221240",
    entity: "Sarita Fernandes",
    title: "The student begins by describing the Artifact as a work of art",
    directive: "without naming it yet",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "canon",
      leadingIcon: /*#__PURE__*/React.createElement(StateDot, {
        state: "canon",
        size: 7
      })
    }, "Make canon"), /*#__PURE__*/React.createElement(Button, null, "Edit here"), /*#__PURE__*/React.createElement(Button, {
      variant: "consult",
      leadingIcon: /*#__PURE__*/React.createElement(StateDot, {
        state: "suggested",
        size: 7
      })
    }, "Consult Sarita"))
  }), /*#__PURE__*/React.createElement(NoteBlock, {
    style: {
      marginBottom: 'var(--qm-beat-gap)'
    }
  }, "Note \u2014 he is describing the Chrysalis."), window.QM_OUTLINE_ROWS.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: 'relative',
      padding: '3px 0 var(--qm-beat-gap)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: -22,
      top: 17,
      width: 14,
      height: 1,
      background: 'rgba(255,255,255,0.12)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-serif)',
      fontSize: 'var(--qm-prose-size)',
      lineHeight: 1.65,
      color: 'var(--qm-prose-3)'
    }
  }, r))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 14,
      fontSize: 13.5,
      color: 'var(--qm-text-6)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 5,
      border: '1px dashed rgba(255,255,255,0.20)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 13
  })), "Add beat"))))), rails ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: 'var(--qm-insp-w)',
      flex: 'none',
      background: 'var(--qm-surface-panel)',
      borderLeft: '1px solid var(--qm-border-panel)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '15px 18px 0',
      borderBottom: '1px solid var(--qm-border-panel)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      letterSpacing: 'var(--qm-ls-module)',
      color: 'var(--qm-text-row)'
    }
  }, "INSPECTOR"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 12,
      color: 'var(--qm-text-6)'
    }
  }, "depth 3 \xB7 Y\u221240")), /*#__PURE__*/React.createElement(Tabs, {
    tabs: ['Details', 'Character', 'Consult', 'History'],
    value: tab,
    onChange: setTab
  })), /*#__PURE__*/React.createElement("div", {
    className: "qm-scroll",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: 18
    }
  }, tab === 'Details' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Callout, {
    tone: "conflict",
    style: {
      marginBottom: 20
    },
    action: /*#__PURE__*/React.createElement(React.Fragment, null, "Why this matters ", /*#__PURE__*/React.createElement(Icon, {
      name: "chevronRight",
      size: 12,
      style: {
        display: 'inline-block',
        verticalAlign: -2
      }
    }))
  }, "Marked ", /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 600,
      color: 'var(--qm-cinnabar-text-strong)'
    }
  }, "Y\u221240"), ", but the room is at ", /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 600,
      color: 'var(--qm-cinnabar-text-strong)'
    }
  }, "Y0"), "."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      letterSpacing: 'var(--qm-ls-mono)',
      color: 'var(--qm-text-5)',
      marginBottom: 12
    }
  }, "EVENT"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Type",
    kind: "mono",
    value: "narrative_beat"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "What happened",
    value: "occurs",
    select: true
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Subject",
    placeholder: "\u2014 none \u2014",
    select: true
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Target",
    placeholder: "\u2014 none \u2014",
    select: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--qm-text-6)',
      marginBottom: 6
    }
  }, "Description"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 14px',
      borderRadius: 7,
      background: 'var(--qm-fill-inset-soft)',
      border: '1px solid var(--qm-border-control-quiet)',
      boxShadow: 'var(--qm-focus-ring)',
      fontFamily: 'var(--qm-font-serif)',
      fontSize: 16,
      lineHeight: 1.55,
      color: 'var(--qm-prose-6)'
    }
  }, "The student begins by describing the Artifact as a work of art (without naming it yet)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--qm-text-7)'
    }
  }, "Draft only until ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      color: 'var(--qm-text-4)'
    }
  }, "\u2318S")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "xs"
  }, "Discard"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "xs"
  }, "Apply"))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--qm-border-group)',
      margin: '22px 0 18px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      letterSpacing: 'var(--qm-ls-mono)',
      color: 'var(--qm-text-5)',
      marginBottom: 12
    }
  }, "ANCESTRY"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 13,
      lineHeight: 1.9,
      color: 'var(--qm-text-6)'
    }
  }, /*#__PURE__*/React.createElement("div", null, "Epigraphs"), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingLeft: 14
    }
  }, "\u21B3 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--qm-blue-text)'
    }
  }, "@Sarita Fernandes"), " reads a letter\u2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingLeft: 28,
      color: 'var(--qm-prose-6)'
    }
  }, "\u21B3 The student begins by describing\u2026"))) : null, tab === 'Character' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: "SF",
    size: 52
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--qm-font-serif)',
      fontSize: 21,
      color: 'var(--qm-prose-2)'
    }
  }, "Sarita Fernandes"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: 'var(--qm-text-6)',
      marginTop: 3
    }
  }, "Instructor \xB7 present at Y0 \xB7 41 appearances"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      lineHeight: 1.7,
      color: 'var(--qm-text-3)',
      marginBottom: 18
    }
  }, "Reads the letter aloud in the epigraph frame. Her account of the Artifact predates the public record by four decades, which is why this beat carries a time conflict."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      letterSpacing: 'var(--qm-ls-mono)',
      color: 'var(--qm-text-5)',
      marginBottom: 10
    }
  }, "DOSSIER"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, ['Where she is at Y−40', 'Relationships', 'Every beat she touches'].map(r => /*#__PURE__*/React.createElement("div", {
    key: r,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 13px',
      borderRadius: 7,
      background: 'rgba(255,255,255,0.035)',
      fontSize: 14,
      color: 'var(--qm-text-emph)',
      cursor: 'pointer'
    }
  }, r, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 12,
    color: "var(--qm-text-6)"
  }))))) : null, tab === 'Consult' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      padding: '10px 12px',
      borderRadius: 7,
      background: 'rgba(162,146,242,0.10)',
      border: '1px solid rgba(162,146,242,0.26)',
      fontSize: 13,
      color: 'var(--qm-violet-text)',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(StateDot, {
    state: "suggested",
    size: 7
  }), "Private \xB7 answers as of Y0 \xB7 never touches canon"), /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: 'flex-end',
      maxWidth: '88%',
      padding: '12px 14px',
      borderRadius: 'var(--qm-bubble-you)',
      background: 'var(--qm-fill-hover)',
      fontSize: 14.5,
      lineHeight: 1.6,
      color: 'var(--qm-text-2)',
      marginBottom: 12
    }
  }, "Given only what you know now \u2014 is this what you would do?"), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '92%',
      padding: '14px 16px',
      borderRadius: 'var(--qm-bubble-them)',
      background: 'rgba(162,146,242,0.10)',
      border: '1px solid rgba(162,146,242,0.22)',
      fontFamily: 'var(--qm-font-serif)',
      fontSize: 16,
      lineHeight: 1.65,
      color: 'var(--qm-violet-prose)'
    }
  }, "I would not name it. Naming it would make the letter a report, and I am reading it as a confession."), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(PromptField, {
    audience: "character",
    placeholder: "Ask Sarita\u2026",
    style: {
      marginTop: 18,
      height: 44
    }
  })) : null, tab === 'History' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, window.QM_HISTORY.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 12,
      padding: '12px 6px',
      borderBottom: '1px solid var(--qm-border-list)'
    }
  }, /*#__PURE__*/React.createElement(StateDot, {
    state: h.state,
    size: 8,
    style: {
      marginTop: 6
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--qm-text-3)',
      lineHeight: 1.5
    }
  }, h.what), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 12,
      color: 'var(--qm-text-7)',
      marginTop: 4
    }
  }, h.when))))) : null)) : null));
}
Object.assign(window, {
  Outline
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/story-engine/Outline.jsx", error: String((e && e.message) || e) }); }

// ui_kits/story-engine/SceneRoom.jsx
try { (() => {
const {
  Button,
  Icon,
  StateDot,
  Avatar,
  EraChip,
  EntityToken,
  BeatSpine,
  PromptField,
  PanelHeader,
  NoteBlock,
  VersionStrip,
  AnnotationMark,
  SaveStatus,
  Kbd,
  TopBar,
  EmptyState
} = window.QuantumMateriaDesignSystem_488cde;

/** Placeholder for author-supplied imagery — QM ships no illustration set. */
function Slot({
  label,
  height,
  radius = 9
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      borderRadius: radius,
      background: 'var(--qm-fill-inset)',
      border: '1px dashed var(--qm-border-dashed)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      fontSize: 12.5,
      color: 'var(--qm-text-8)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "image",
    size: 14
  }), label);
}
function SceneRoom({
  onExit
}) {
  const [focus, setFocus] = React.useState(false);
  const [stage, setStage] = React.useState(true);
  const [chat, setChat] = React.useState(true);
  const [bar, setBar] = React.useState(true);
  const [reply, setReply] = React.useState(true);
  const [ask, setAsk] = React.useState('why not say his name');
  const stageOpen = stage && !focus,
    chatOpen = chat && !focus,
    barOpen = bar && !focus;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--qm-surface-shell)'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    brand: false,
    leading: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SaveStatus, {
      inline: true,
      state: "saved"
    }, "Live"), /*#__PURE__*/React.createElement(EraChip, {
      size: "sm"
    }, "Y\u22126 D1")),
    center: /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--qm-font-serif)',
        fontSize: 17,
        color: 'var(--qm-prose-3)'
      }
    }, "Savior Reveal")
  }, /*#__PURE__*/React.createElement(Button, {
    size: "xs",
    onClick: () => setFocus(v => !v),
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "maximize",
      size: 14
    }),
    hint: "\u2318\\"
  }, focus ? 'Leave focus' : 'Focus'), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "xs"
  }, "Save to QM"), /*#__PURE__*/React.createElement(Button, {
    size: "xs",
    onClick: onExit
  }, "Exit")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flex: 1,
      minHeight: 0
    }
  }, stageOpen ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: 320,
      flex: 'none',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--qm-surface-panel)',
      borderRight: '1px solid var(--qm-border-panel)'
    }
  }, /*#__PURE__*/React.createElement(PanelHeader, {
    label: "STAGE"
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setStage(false),
    style: {
      width: 28,
      height: 28,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
      border: '1px solid var(--qm-border-control)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronLeft",
    size: 15,
    color: "var(--qm-text-4)"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "qm-scroll",
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid var(--qm-border-group)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      paddingBottom: 0
    }
  }, /*#__PURE__*/React.createElement(Slot, {
    label: "Drop the location",
    height: 130
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '11px 14px 13px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--qm-font-serif)',
      fontSize: 17,
      color: 'var(--qm-prose-2)'
    }
  }, "Luna Station"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--qm-text-4)',
      marginTop: 3
    }
  }, "Dome and tunnel \xB7 pressurised"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      borderBottom: '1px solid var(--qm-border-group)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      letterSpacing: 'var(--qm-ls-mono)',
      color: 'var(--qm-text-5)'
    }
  }, "PRESENT"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--qm-text-6)'
    }
  }, "2 of 18")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 88,
      height: 88,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(Slot, {
    label: "vera",
    height: 88
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14.5,
      color: 'var(--qm-text-2)'
    }
  }, "vera"), /*#__PURE__*/React.createElement(StateDot, {
    state: "suggested",
    size: 7,
    pulse: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      lineHeight: 1.5,
      color: 'var(--qm-text-6)',
      marginTop: 4
    }
  }, "Ensign \u2014 shuttle pilot"), reply ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--qm-text-7)',
      marginTop: 6
    }
  }, "answers as of Y\u22126 D1") : /*#__PURE__*/React.createElement("div", {
    onClick: () => setReply(true),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 7,
      padding: '3px 8px',
      borderRadius: 5,
      fontSize: 12.5,
      color: 'var(--qm-violet-text)',
      background: 'var(--qm-tint-violet)',
      border: '1px solid var(--qm-border-violet)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(StateDot, {
    state: "suggested",
    size: 6
  }), "1 reply"))), /*#__PURE__*/React.createElement(PromptField, {
    audience: "character",
    value: ask,
    caret: true,
    style: {
      marginTop: 10,
      height: 34
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 88,
      height: 88,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(Slot, {
    label: "cade",
    height: 88
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      color: 'var(--qm-text-2)'
    }
  }, "cade-briggs"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      lineHeight: 1.5,
      color: 'var(--qm-text-6)',
      marginTop: 4
    }
  }, "Lt. \u2014 security rotation"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--qm-text-7)',
      marginTop: 6
    }
  }, "answers as of Y\u22126 D1"))), /*#__PURE__*/React.createElement(PromptField, {
    placeholder: "ask cade-briggs\u2026",
    style: {
      marginTop: 10,
      height: 34
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      lineHeight: 1.6,
      color: 'var(--qm-text-7)',
      marginTop: 12
    }
  }, "Each field talks only to that character, privately. Their answer pops over the page \u2014 accept it as a turn, or keep it as a note.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      letterSpacing: 'var(--qm-ls-mono)',
      color: 'var(--qm-text-5)'
    }
  }, "OUTLINE"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--qm-text-6)'
    }
  }, "3 of 7 written")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--qm-text-7)',
      marginBottom: 12
    }
  }, "Savior Reveal \xB7 linked"), /*#__PURE__*/React.createElement(BeatSpine, {
    beats: window.QM_STAGE_BEATS,
    onSelect: () => {}
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      lineHeight: 1.6,
      color: 'var(--qm-text-7)',
      marginTop: 12
    }
  }, "Filled dot means the prose has reached that beat. Click one to jump the draft to it.")))) : !focus ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      flex: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 14,
      padding: '12px 0',
      background: 'var(--qm-surface-panel)',
      borderRight: '1px solid var(--qm-border-panel)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setStage(true),
    style: {
      width: 32,
      height: 32,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 7,
      border: '1px solid var(--qm-border-control)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 12,
    color: "var(--qm-text-4)"
  })), /*#__PURE__*/React.createElement(Avatar, {
    initials: "VN",
    size: 30
  }), /*#__PURE__*/React.createElement(Avatar, {
    initials: "CB",
    size: 30
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 7,
      background: 'var(--qm-fill-chip)',
      border: '1px solid var(--qm-border-control-quiet)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 12,
      color: 'var(--qm-text-6)'
    }
  }, "3/7")) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--qm-surface-canvas-glow)',
      position: 'relative'
    }
  }, reply && stageOpen ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 14,
      top: 300,
      width: 424,
      zIndex: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: -6,
      top: 22,
      width: 11,
      height: 11,
      background: 'var(--qm-consult-surface)',
      borderLeft: '1px solid var(--qm-border-violet)',
      borderBottom: '1px solid var(--qm-border-violet)',
      transform: 'rotate(45deg)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 11,
      background: 'var(--qm-consult-surface)',
      border: '1px solid var(--qm-border-violet)',
      boxShadow: 'var(--qm-shadow-reply)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      padding: '10px 14px',
      borderBottom: '1px solid rgba(162,146,242,0.18)'
    }
  }, /*#__PURE__*/React.createElement(StateDot, {
    state: "suggested",
    size: 6
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 11,
      letterSpacing: 'var(--qm-ls-mono)',
      color: 'var(--qm-violet-text)'
    }
  }, "VERA \xB7 PRIVATE"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    onClick: () => setReply(false),
    style: {
      width: 24,
      height: 24,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 13,
    color: "var(--qm-text-6)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px',
      fontFamily: 'var(--qm-font-serif)',
      fontSize: 16,
      lineHeight: 1.7,
      color: 'var(--qm-violet-prose)'
    }
  }, "Not in a breach corridor. And not in front of him \u2014 he is still deciding whether I am a person."), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '11px 14px',
      borderTop: '1px solid rgba(162,146,242,0.16)',
      background: 'rgba(0,0,0,0.18)',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "sceneGhost",
    size: "xs",
    leadingIcon: /*#__PURE__*/React.createElement(StateDot, {
      state: "scene",
      size: 6
    })
  }, "Play as her turn \u2192"), /*#__PURE__*/React.createElement(Button, {
    variant: "consult",
    size: "xs"
  }, "Keep as a note"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--qm-text-7)'
    }
  }, "only you saw this")))) : null, !focus ? /*#__PURE__*/React.createElement(VersionStrip, {
    versions: [{
      label: 'this draft',
      score: 'lint 7·5',
      current: true
    }, {
      label: 'rev 3',
      score: '6·5'
    }, {
      label: 'rev 2',
      score: '6·4'
    }, {
      label: 'candidate B',
      origin: 'generated',
      score: '7·4'
    }],
    note: "one axis \xB7 compare any two in Compose"
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: "qm-scroll",
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: focus ? 760 : 720,
      maxWidth: 'calc(100% - 96px)',
      margin: '0 auto',
      padding: focus ? '96px 0 80px' : '44px 0 40px',
      fontFamily: 'var(--qm-font-serif)',
      fontSize: focus ? 20 : 19,
      lineHeight: focus ? 1.9 : 1.85,
      color: 'var(--qm-prose-3)'
    }
  }, focus ? window.QM_PROSE.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      margin: '0 0 30px'
    }
  }, p)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      paddingLeft: 26,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(StateDot, {
    state: "canon",
    size: 8,
    style: {
      position: 'absolute',
      left: 0,
      top: 13
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      marginBottom: 6,
      fontFamily: 'var(--qm-font-sans)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 11.5,
      color: 'var(--qm-text-7)'
    }
  }, "beat 3 \xB7 written"), /*#__PURE__*/React.createElement(AnnotationMark, {
    style: {
      fontSize: 11.5
    }
  }, "lint 7\xB75"), /*#__PURE__*/React.createElement(AnnotationMark, {
    style: {
      fontSize: 11.5
    }
  }, "fn 0.9")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, window.QM_PROSE[0])), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      paddingLeft: 26,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(StateDot, {
    state: "canon",
    size: 8,
    style: {
      position: 'absolute',
      left: 0,
      top: 13
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      marginBottom: 6,
      fontFamily: 'var(--qm-font-sans)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 11.5,
      color: 'var(--qm-text-7)'
    }
  }, "beat 4 \xB7 written"), /*#__PURE__*/React.createElement(AnnotationMark, {
    tone: "advisory",
    glyph: /*#__PURE__*/React.createElement(StateDot, {
      state: "proposed",
      size: 6
    }),
    style: {
      fontSize: 11.5
    }
  }, "tell warning"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--qm-text-7)',
      fontFamily: 'var(--qm-font-sans)',
      cursor: 'pointer'
    }
  }, "\u201Cmore like a question\u201D states the feeling")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, window.QM_PROSE[1]), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, window.QM_PROSE[2])), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      paddingLeft: 26,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(StateDot, {
    state: "here",
    size: 8,
    style: {
      position: 'absolute',
      left: 0,
      top: 13
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: -10,
      top: 6,
      bottom: 6,
      width: 3,
      borderRadius: 2,
      background: 'var(--qm-coral)',
      boxShadow: 'var(--qm-glow-here)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      marginBottom: 6,
      fontFamily: 'var(--qm-font-sans)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 11.5,
      letterSpacing: 'var(--qm-ls-mono-tight)',
      color: 'var(--qm-coral-text)',
      background: 'var(--qm-tint-coral-strong)',
      borderRadius: 4,
      padding: '2px 7px'
    }
  }, /*#__PURE__*/React.createElement(StateDot, {
    state: "here",
    size: 6
  }), "HERE"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 11.5,
      color: 'var(--qm-text-7)'
    }
  }, "beat 5 \xB7 last turn"), /*#__PURE__*/React.createElement(AnnotationMark, {
    style: {
      fontSize: 11.5
    }
  }, "fn 0.8")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      padding: '10px 18px',
      borderRadius: 8,
      background: 'var(--qm-tint-parchment)',
      boxShadow: 'var(--qm-inset-quote)'
    }
  }, window.QM_PROSE[3]), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '18px 0 0'
    }
  }, /*#__PURE__*/React.createElement(EntityToken, {
    variant: "inline",
    name: "Nakamura"
  }), ". Ensign V. ", /*#__PURE__*/React.createElement(EntityToken, {
    variant: "inline",
    name: "Nakamura"
  }), ". The shuttle pilot.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      paddingLeft: 26
    }
  }, /*#__PURE__*/React.createElement(StateDot, {
    state: "unwritten",
    size: 8,
    style: {
      position: 'absolute',
      left: 0,
      top: 13
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 11.5,
      color: 'var(--qm-text-7)',
      marginBottom: 6
    }
  }, "beat 6 \xB7 not written"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 17,
      color: 'var(--qm-text-7)'
    }
  }, "He reads the nameplate and says her name aloud.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 30,
      paddingLeft: 26,
      fontFamily: 'var(--qm-font-sans)'
    }
  }, /*#__PURE__*/React.createElement(SaveStatus, {
    inline: true
  }, "Local draft \xB7 377 words \xB7 4 of 7 beats written"))))), focus ? /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      padding: 12,
      fontSize: 13,
      color: 'var(--qm-text-hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 12,
      color: 'var(--qm-text-8)'
    }
  }, "\u2318\\"), " to bring everything back") : barOpen ? /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      background: 'var(--qm-scene-surface)',
      borderTop: '1px solid var(--qm-scene-border)'
    }
  }, /*#__PURE__*/React.createElement(PanelHeader, {
    audience: "scene",
    label: "IN SCENE",
    note: "everyone in the room hears this",
    style: {
      padding: '11px 22px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 12,
      color: 'var(--qm-scene-meta)'
    }
  }, "turn 4 \xB7 vera to act"), /*#__PURE__*/React.createElement("span", {
    onClick: () => setBar(false),
    style: {
      width: 26,
      height: 26,
      marginLeft: 10,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
      border: '1px solid rgba(232,220,192,0.24)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronDown",
    size: 14,
    color: "var(--qm-parchment-text)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 22px 16px'
    }
  }, /*#__PURE__*/React.createElement(NoteBlock, {
    tone: "scene",
    style: {
      background: 'transparent',
      padding: 0,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'normal',
      color: 'var(--qm-scene-text)'
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--qm-scene-text-strong)'
    }
  }, "Cade"), " I am capable of movement. Stand back.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      fontFamily: 'var(--qm-font-sans)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "scene",
    size: "md"
  }, "Advance the scene"), /*#__PURE__*/React.createElement(Button, {
    variant: "sceneGhost",
    size: "md"
  }, "Redo last turn"), /*#__PURE__*/React.createElement(Button, {
    variant: "sceneGhost",
    size: "md"
  }, "Write the turn myself"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--qm-scene-meta)'
    }
  }, "Director proposes ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--qm-scene-text)'
    }
  }, "vera"), " \xB7 tension ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--qm-scene-text)'
    }
  }, "high"))))) : /*#__PURE__*/React.createElement("div", {
    onClick: () => setBar(true),
    style: {
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 22px',
      background: 'var(--qm-scene-surface)',
      borderTop: '1px solid var(--qm-scene-border)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(StateDot, {
    state: "scene",
    size: 8,
    glow: true
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      letterSpacing: 'var(--qm-ls-module)',
      color: 'var(--qm-scene-label)'
    }
  }, "IN SCENE"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 12,
      color: 'var(--qm-scene-meta)'
    }
  }, "turn 4 \xB7 vera to act"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--qm-scene-text-dim)'
    }
  }, "show the controls"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevronUp",
    size: 14,
    color: "var(--qm-parchment-text)"
  }))), chatOpen ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: 468,
      flex: 'none',
      display: 'flex',
      flexDirection: 'column',
      borderLeft: '1px solid var(--qm-border-panel)',
      background: 'var(--qm-surface-rail)'
    }
  }, /*#__PURE__*/React.createElement(PanelHeader, {
    audience: "private",
    label: "PRIVATE",
    note: "nothing here is witnessed until you send it"
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setChat(false),
    style: {
      width: 28,
      height: 28,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
      border: '1px solid var(--qm-border-control-quiet)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 15,
    color: "var(--qm-text-4)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 18px',
      borderBottom: '1px solid var(--qm-border-group)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      height: 26,
      padding: '0 9px',
      borderRadius: 5,
      fontSize: 12.5,
      color: 'var(--qm-text-3)',
      background: 'var(--qm-fill-chip)',
      border: '1px solid var(--qm-border-control)'
    }
  }, /*#__PURE__*/React.createElement(StateDot, {
    state: "neutral",
    size: 6
  }), "Assistant"), /*#__PURE__*/React.createElement(AnnotationMark, null, "qm-api \xB7 6 tools"), /*#__PURE__*/React.createElement(AnnotationMark, null, "3 skills")), /*#__PURE__*/React.createElement("div", {
    className: "qm-scroll",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '86%',
      padding: '11px 14px',
      borderRadius: 'var(--qm-bubble-you)',
      background: 'var(--qm-fill-hover)',
      fontSize: 14.5,
      lineHeight: 1.6,
      color: 'var(--qm-text-2)'
    }
  }, "Who else was on Luna Station that shift?")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(StateDot, {
    state: "neutral",
    size: 6
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--qm-text-6)'
    }
  }, "Claude")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '7px 11px',
      borderRadius: 6,
      background: 'rgba(255,255,255,0.035)',
      border: '1px solid rgba(255,255,255,0.09)',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 11.5,
      color: 'var(--qm-text-6)'
    }
  }, "qm.events.query"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--qm-text-7)'
    }
  }, "Y\u22126 \xB7 Luna Station"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 11.5,
      color: 'var(--qm-teal-text)'
    }
  }, "8 rows")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      lineHeight: 1.65,
      color: 'var(--qm-text-3)'
    }
  }, "Three on shift: ", /*#__PURE__*/React.createElement(EntityToken, {
    variant: "inline",
    name: "Vera Nakamura"
  }), ", ", /*#__PURE__*/React.createElement(EntityToken, {
    variant: "inline",
    name: "Cade Briggs"
  }), ", and the civilian team under ", /*#__PURE__*/React.createElement(EntityToken, {
    variant: "inline",
    name: "Boone Clay"
  }), ". The fragment is logged inert until 1009."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "xxs"
  }, "Add Boone to cast"), /*#__PURE__*/React.createElement(Button, {
    size: "xxs"
  }, "Open the chronology"))), /*#__PURE__*/React.createElement(NoteBlock, {
    size: "sm",
    style: {
      fontStyle: 'normal'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'normal',
      fontFamily: 'var(--qm-font-sans)',
      fontSize: 13.5,
      color: 'var(--qm-text-6)'
    }
  }, "The assistant reads and writes QM through its tools. It never speaks as a character, and never takes a turn \u2014 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--qm-text-emph)'
    }
  }, "to ask a character, use the field under their portrait.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      borderTop: '1px solid var(--qm-border-panel)',
      padding: '12px 18px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 9,
      background: 'var(--qm-fill-inset)',
      border: '1px solid var(--qm-border-control)',
      padding: '11px 13px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      lineHeight: 1.6,
      color: 'var(--qm-text-7)'
    }
  }, "Ask about the world, or make a change in QM\u2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 11.5,
      color: 'var(--qm-text-6)'
    }
  }, "/ skill \xB7 # event"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 11.5,
      color: 'var(--qm-text-6)'
    }
  }, "\u21E7\u23CE newline"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "xxs"
  }, "Send \u23CE"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--qm-text-7)',
      marginTop: 10
    }
  }, "Nothing sent from here is in scene."))) : !focus ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      flex: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 14,
      padding: '12px 0',
      background: 'var(--qm-surface-rail)',
      borderLeft: '1px solid var(--qm-border-panel)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setChat(true),
    style: {
      width: 32,
      height: 32,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 7,
      border: '1px solid var(--qm-border-control)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronLeft",
    size: 15,
    color: "var(--qm-text-4)"
  })), /*#__PURE__*/React.createElement(Icon, {
    name: "message",
    size: 15,
    color: "var(--qm-text-6)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 11,
      color: 'var(--qm-text-8)',
      writingMode: 'vertical-rl'
    }
  }, "assistant")) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '12px 18px',
      borderTop: '1px solid var(--qm-border-panel)',
      background: 'var(--qm-surface-status)',
      fontSize: 13.5,
      color: 'var(--qm-text-6)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--qm-text-emph)'
    }
  }, "Who you are talking to is where you are typing."), /*#__PURE__*/React.createElement("span", null, "A character\u2019s field sits under their face; the assistant has its own rail; only the warm bar under the prose reaches the room."), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 12.5
    }
  }, "private by default \xB7 the scene is a deliberate act")));
}
Object.assign(window, {
  SceneRoom
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/story-engine/SceneRoom.jsx", error: String((e && e.message) || e) }); }

// ui_kits/story-engine/WritingRoom.jsx
try { (() => {
const {
  Button,
  Icon,
  StateDot,
  Avatar,
  Card,
  EraChip,
  RouteChip,
  EntityToken,
  TopBar,
  EmptyState,
  SaveStatus
} = window.QuantumMateriaDesignSystem_488cde;
function WritingRoom({
  onOpenScene,
  onNewScene,
  onNewOutline,
  onCompose,
  onOpenOutline
}) {
  const [resume, earlier] = [window.QM_SCENES[0], window.QM_SCENES.slice(1)];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--qm-surface-shell)'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    breadcrumb: false
  }, /*#__PURE__*/React.createElement(SaveStatus, {
    inline: true,
    state: "saved"
  }, "Room live"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 7,
      border: '1px solid var(--qm-border-control)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sliders",
    size: 15,
    color: "var(--qm-text-4)"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "qm-scroll",
    style: {
      flex: 1,
      overflowY: 'auto',
      background: 'var(--qm-surface-app-glow)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1080,
      maxWidth: 'calc(100% - 80px)',
      margin: '0 auto',
      padding: '52px 0 70px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 34
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--qm-font-serif)',
      fontSize: 'var(--qm-type-room-title)',
      lineHeight: 'var(--qm-type-room-title-lh)',
      color: 'var(--qm-prose-1)'
    }
  }, "The writing room"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15.5,
      color: 'var(--qm-text-5)',
      marginTop: 10
    }
  }, "Four scenes, two of them unfinished. Pick up where the room left off.")), /*#__PURE__*/React.createElement(Card, {
    surface: "selected",
    rail: "parchment",
    padding: "26px 28px",
    style: {
      marginBottom: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 11.5,
      letterSpacing: 'var(--qm-ls-module)',
      color: 'var(--qm-text-4)',
      marginBottom: 12
    }
  }, "CONTINUE \xB7 6 HOURS AGO"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--qm-font-serif)',
      fontSize: 'var(--qm-type-scene-title)',
      lineHeight: 'var(--qm-type-scene-title-lh)',
      color: 'var(--qm-prose-1)'
    }
  }, resume.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(EraChip, null, resume.when), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: "VN"
  }), /*#__PURE__*/React.createElement(Avatar, {
    initials: "CB",
    style: {
      marginLeft: -7
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--qm-text-5)'
    }
  }, resume.cast)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--qm-font-serif)',
      fontSize: 16.5,
      lineHeight: 1.6,
      color: 'var(--qm-text-4)',
      marginTop: 16,
      maxWidth: 560
    }
  }, resume.excerpt)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 300,
      flex: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    onClick: onOpenScene,
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "play",
      size: 11
    }),
    style: {
      justifyContent: 'flex-start'
    },
    hint: resume.words + ' words'
  }, "Resume the prose"), /*#__PURE__*/React.createElement(Button, {
    variant: "quiet",
    size: "lg",
    fullWidth: true,
    onClick: onNewOutline,
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "list",
      size: 15
    }),
    style: {
      justifyContent: 'flex-start'
    },
    hint: "nothing yet"
  }, "Start an outline"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "tiny",
    fullWidth: true,
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "pencil",
      size: 13
    })
  }, "Rename"), /*#__PURE__*/React.createElement(Button, {
    variant: "destructive",
    size: "tiny",
    fullWidth: true,
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 13
    })
  }, "Delete"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 14,
      marginBottom: 38
    }
  }, [{
    icon: 'plus',
    title: 'New scene',
    body: 'A live room: cast, story-time, and the Director running turns beside your prose.',
    go: onNewScene,
    tone: 'var(--qm-gold)'
  }, {
    icon: 'list',
    title: 'New outline',
    body: 'Beats first. Rows, story-time markers and proposed events — no room required.',
    go: onNewOutline,
    tone: 'var(--qm-gold)'
  }, {
    icon: 'grip',
    title: 'Compose from candidates',
    body: 'Read a generated set side by side and take the best beat from each column.',
    go: onCompose,
    tone: 'var(--qm-violet)'
  }].map(c => /*#__PURE__*/React.createElement(Card, {
    key: c.title,
    hoverable: true,
    padding: "18px 20px",
    onClick: c.go
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.icon,
    size: 15,
    color: c.tone
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'var(--qm-prose-2)'
    }
  }, c.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      lineHeight: 1.6,
      color: 'var(--qm-text-6)'
    }
  }, c.body)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      letterSpacing: 'var(--qm-ls-module)',
      color: 'var(--qm-text-5)'
    }
  }, "EARLIER SCENES"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: 'var(--qm-text-6)'
    }
  }, "3 scenes")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, earlier.map(s => /*#__PURE__*/React.createElement(Card, {
    key: s.id,
    hoverable: true,
    padding: "18px 20px",
    onClick: () => onOpenOutline(s)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-serif)',
      fontSize: 20,
      color: 'var(--qm-prose-2)'
    }
  }, s.title), /*#__PURE__*/React.createElement(EraChip, {
    kind: s.era,
    size: "sm"
  }, s.when), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: 'var(--qm-text-5)'
    }
  }, s.cast), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--qm-font-mono)',
      fontSize: 12.5,
      color: 'var(--qm-text-6)'
    }
  }, s.opened)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(RouteChip, {
    state: s.proseState,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "play",
      size: 11
    })
  }, s.prose), /*#__PURE__*/React.createElement(RouteChip, {
    state: s.outlineState,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "list",
      size: 15
    })
  }, s.outline))))), /*#__PURE__*/React.createElement(EmptyState, {
    kind: "unknown",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "help",
      size: 14
    }),
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--qm-text-emph)'
    }
  }, "Unknown is not empty."), " When a scene\u2019s drafts can\u2019t be read \u2014 storage blocked, private mode \u2014 the chip shows the bare surface name and still opens it. It never claims the scene holds nothing."))));
}
Object.assign(window, {
  WritingRoom
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/story-engine/WritingRoom.jsx", error: String((e && e.message) || e) }); }

// ui_kits/story-engine/data.jsx
try { (() => {
const QM_SCENES = [{
  id: 'savior',
  title: 'Savior Reveal',
  when: 'Y−6 D1',
  era: 'time',
  cast: 'vera, cade-briggs',
  opened: '6 hours ago',
  words: 377,
  outline: '3 of 7 written',
  excerpt: '“It didn’t take me,” he said, more like a question than a statement. The figure didn’t move.'
}, {
  id: 'epigraphs',
  title: 'Epigraphs',
  when: 'timeless',
  era: 'timeless',
  cast: 'sarita-fernandes',
  opened: '6h ago',
  prose: 'prose · empty',
  proseState: 'count',
  outline: 'outline · 9 rows · 1 event',
  outlineState: 'count'
}, {
  id: 'mira',
  title: 'Mira Interview',
  when: 'timeless',
  era: 'timeless',
  cast: 'mira-sorokina',
  opened: '21d ago',
  prose: 'prose · empty',
  proseState: 'count',
  outline: 'start an outline',
  outlineState: 'invitation'
}, {
  id: 'dome',
  title: 'Dome Breach',
  when: 'Y−6 D1',
  era: 'time',
  cast: 'cade-briggs, boone',
  opened: '34d ago',
  prose: 'prose',
  proseState: 'unknown',
  outline: 'outline',
  outlineState: 'unknown'
}];
const QM_ROSTER = [{
  id: 'vera',
  name: 'vera',
  initials: 'VN',
  rank: 'Ensign — shuttle pilot',
  src: 'soul'
}, {
  id: 'cade-briggs',
  name: 'cade-briggs',
  initials: 'CB',
  rank: 'Lt. — security rotation',
  src: 'soul'
}, {
  id: 'ash-lucero',
  name: 'ash-lucero',
  initials: 'AL',
  rank: '',
  src: 'qm'
}, {
  id: 'boone',
  name: 'boone',
  initials: 'BC',
  rank: 'Dr. — geology',
  src: 'qm'
}, {
  id: 'mira-sorokina',
  name: 'mira-sorokina',
  initials: 'MS',
  rank: '',
  src: 'soul'
}];
const QM_STAGE_BEATS = [{
  text: 'The scientists wheel the apparatus into the annex',
  state: 'written'
}, {
  text: 'The corridor light shifts white to orange at 1009',
  state: 'written'
}, {
  text: 'Briggs kneels. The figure in the helmet does not move',
  state: 'here'
}, {
  text: '“Can you walk?” — the voice is human',
  state: 'written'
}, {
  text: 'He reads the nameplate: Ensign V. Nakamura',
  state: 'ahead'
}, {
  text: 'The seal order comes over the channel',
  state: 'ahead'
}, {
  text: 'He does not close the bulkhead',
  state: 'ahead'
}];
const QM_PROSE = ['He caught his own reflection in the opaque black mirror of her helmet: himself kneeling on the floor, cradling his shattered wrist, the iron sights of a standard-issue pistol trained between his eyes.', '“It didn’t take me,” he said, more like a question than a statement.', 'The figure didn’t move.', '“Can you walk?” she asked, her voice sounding somewhat familiar despite being projected through the helmet’s speaker. But more importantly, it sounded human.'];
const QM_COMPOSE_BEATS = [{
  n: 0,
  text: 'The scientists wheel the apparatus into the annex at 0850',
  slot: 1
}, {
  n: 1,
  text: 'At 1009 the light changes: a wash of orange on the corridor wall',
  slot: 0
}, {
  n: 2,
  text: 'Boots in the corridor, seven minutes later. The sergeant returns',
  slot: 1
}, {
  n: 3,
  text: 'Briggs’s hand is on the seal control through ten counted seconds',
  slot: 1
}, {
  n: 4,
  text: 'The apparatus has gone dark in its cradle and the hum has stopped',
  slot: 1
}, {
  n: 5,
  text: 'In the pressurised tunnel to the control complex: the lead scientist',
  slot: 1
}, {
  n: 6,
  text: 'Her shuttle comes off the pad with the cabin lights at quarter',
  slot: 1
}];
const QM_CANDIDATES = [{
  slot: 0,
  run: 'B3 · run e0c01f',
  rank: 'rank 3',
  chosen: '1/7 chosen',
  ranked: false,
  beats: [{
    beat: 'beat 1',
    lint: '6·5',
    tell: 'critical',
    fn: '0.9',
    chosen: false,
    text: 'At 1009 the light on the corridor wall shifted from white to orange. The change came without flicker, a wash of colour where before there had been only the cold glow of the station.'
  }]
}, {
  slot: 1,
  run: 'A · run 9c75f6',
  rank: 'rank 1',
  chosen: '6/7 chosen',
  ranked: true,
  beats: [{
    beat: 'beat 0',
    lint: '7·5',
    tell: 'critical',
    fn: '0.9',
    chosen: true,
    text: 'At 0850 the corridor hum changed. Six of them wheeled the cradle through the blast door, the castors grinding on the deck plates. Cade Briggs met them at the docking collar.'
  }]
}, {
  slot: 2,
  run: 'B1 · run 311d26',
  rank: 'rank 2',
  chosen: '0/7 chosen',
  ranked: false,
  beats: [{
    beat: 'beat 0',
    lint: '6·4',
    tell: 'warning',
    fn: '0.9',
    chosen: false,
    text: 'The scientists came at 0850, six of them in clean-room whites, and the apparatus came with them on a wheeled cradle that hummed against the deck plating.'
  }, {
    beat: 'beat 1',
    lint: '7·4',
    cut: true,
    chosen: false,
    selectable: true,
    text: 'The corridor ran empty for an hour. Briggs logged it secure at 0915, again at 0930, and at 1000 the word was beginning to feel like a lie he was telling himself on a schedule'
  }]
}];
const QM_YEARS = [{
  year: '−36',
  count: '1 event',
  events: [{
    title: 'Dr. Boone Harlan Clay is born in West Texas',
    meta: 'birth · depth 1',
    who: 'BC',
    state: 'canon'
  }]
}, {
  year: '−35',
  count: '1 event',
  events: [{
    title: 'Vera Nakamura is born on Earth, to an Osaka family',
    meta: 'birth · depth 1',
    who: 'VN',
    state: 'canon'
  }]
}, {
  year: '−28',
  count: '1 event',
  events: [{
    title: 'Cade Briggs is born on Earth, Detroit Military District',
    meta: 'birth · depth 1',
    who: 'CB',
    state: 'canon'
  }]
}, {
  year: '−6',
  count: '8 events',
  events: [{
    title: 'At the Luna Station Incident, Vera Nakamura is on shift',
    meta: 'Luna Station · depth 1',
    who: 'VN',
    state: 'canon'
  }, {
    title: 'Lt. Cade Briggs, age 22, junior security officer on rotation',
    meta: 'Luna Station · depth 1',
    who: 'CB',
    state: 'canon'
  }, {
    title: 'The Luna Shaper Fragment, classified inert, begins to move',
    meta: 'artifact · depth 1',
    who: '—',
    state: 'canon'
  }, {
    title: 'The dome breach order — critical for the prologue reveal',
    meta: 'proposed · depth 1',
    who: '—',
    state: 'proposed'
  }, {
    title: 'Briggs disobeys the seal order. He does not close the bulkhead',
    meta: 'suggested · depth 1',
    who: 'CB',
    state: 'suggested'
  }, {
    title: 'Briggs shoots his own squad — the men he had trained with',
    meta: 'casualty · depth 1',
    who: 'CB',
    state: 'canon'
  }]
}];
const QM_YEARS_COLLAPSED = [{
  year: 'Y−40',
  count: '1',
  dots: ['proposed'],
  here: true
}, {
  year: 'Y−36',
  count: '1',
  dots: ['canon']
}, {
  year: 'Y−35',
  count: '1',
  dots: ['canon']
}, {
  year: 'Y−28',
  count: '1',
  dots: ['canon']
}, {
  year: 'Y−26',
  count: '1',
  dots: ['canon']
}, {
  year: 'Y−6',
  count: '8',
  dots: ['canon', 'canon', 'canon', 'proposed', 'canon', 'canon', 'suggested', 'canon']
}, {
  year: 'Y−4',
  count: '3',
  dots: ['canon', 'canon', 'canon']
}, {
  year: 'Y−1',
  count: '2',
  dots: ['canon', 'canon']
}, {
  year: 'Y0',
  count: '11',
  dots: ['canon', 'canon', 'canon', 'canon', 'canon', 'canon', 'canon', 'suggested', 'canon', 'canon', 'canon']
}, {
  year: 'Y3',
  count: '6',
  dots: ['canon', 'canon', 'canon', 'canon', 'canon', 'canon']
}, {
  year: 'Y35',
  count: '9',
  dots: ['canon', 'canon', 'canon', 'canon', 'canon', 'canon', 'canon', 'canon', 'canon']
}];
const QM_OUTLINE_ROWS = ['Its authenticity in the age of AI was noteworthy', 'Its patterns and shape played tricks on the mind', 'It was presumed these were optical illusions. But no human or machine could figure it out', 'It became viewed as a threat by some, a divine gift by others, and eventually, an elaborate hoax by most', 'Eventually it faded into the back of public consciousness, an object of curiosity, but nothing more'];
const QM_HISTORY = [{
  what: 'Proposed by Consult · Sarita Fernandes',
  when: 'today, 09:41',
  state: 'suggested'
}, {
  what: 'Description edited — the directive “without naming it yet” added',
  when: 'today, 09:38',
  state: 'proposed'
}, {
  what: 'Re-anchored from Y0 to Y−40',
  when: 'today, 09:36',
  state: 'conflict'
}, {
  what: 'Created under Epigraphs',
  when: 'yesterday, 22:14',
  state: 'canon'
}];
Object.assign(window, {
  QM_SCENES,
  QM_ROSTER,
  QM_STAGE_BEATS,
  QM_PROSE,
  QM_COMPOSE_BEATS,
  QM_CANDIDATES,
  QM_YEARS,
  QM_YEARS_COLLAPSED,
  QM_OUTLINE_ROWS,
  QM_HISTORY
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/story-engine/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/story-engine/doc-page.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <doc-page> — paged-document shell for printable HTML.
 *
 * FIRST, decide how the document paginates — up front, before building:
 *
 * - FLOWING document (the default): write the whole document as one
 *   normal HTML flow inside <doc-page>; the browser's print engine
 *   splits it onto pages at export. Use for long-form documents with a
 *   single text flow: reports, memos, letters, essays.
 * - EXPLICIT pagination: a fixed set of pre-paginated pages, one
 *   <section class="page"> child per page. Use when the user asks for a
 *   specific page count, or the design implies one: a one-page resume, a
 *   two-sided flier, a poster, a certificate, a brochure — any richly
 *   laid-out document without a single text flow.
 * - If in doubt, ask the user as part of the build.
 *
 * PAGE SIZING — paper differs by country (letter vs A4), so the printed
 * sheet is not one fixed truth:
 * - FLOWING documents pin NO paper size: the print engine paginates
 *   onto the user's real paper, and the content reflows to it.
 * - EXPLICITLY PAGINATED documents print each page at a FIXED page box
 *   with overflow hidden — letter by default, size="a4" for a clearly
 *   metric user, the user's chosen paper when they export. Design each
 *   page to FILL that box, fitting letter and A4 alike without overlap.
 * - width/height pin an explicit fixed size, ONLY when the user gives
 *   one.
 * Never write your own @page rule or hard-code paper dimensions in the
 * content.
 *
 * Sizing modes (attributes):
 *   (none)                      — portrait: flowing docs use the user's
 *           paper; explicitly paginated pages use the named size box
 *           (letter unless size="a4")
 *   orientation="landscape"     — the same, landscape
 *   width / height              — explicit fixed size, ONLY when the user
 *           gives one (e.g. width="22in" height="30in" for a 22×30
 *           poster): the page IS the design's size, printed at true
 *           dimensions (or scaled onto the user's paper at print time).
 *           Any absolute CSS length: px/in/mm/cm/pt/pc.
 * The component announces the chosen mode to the host app at runtime (a
 * meta tag it injects), so the print path can inject the user's true
 * paper size.
 *
 * On screen the document renders on a desk background: a flowing
 * document as one tall scrolling sheet (Google Docs' pageless view);
 * explicitly paginated documents as one card per page.
 *
 * EXPLICIT pagination usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page>
 *     <section class="page" id="p1">…one page's design…</section>
 *     <section class="page" id="p2">…</section>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * How the page box works, concretely: each .page prints as ONE full-bleed
 * sheet at a FIXED physical size — letter by default (set size="a4" for
 * a clearly metric user), the user's chosen paper when they export —
 * with overflow hidden. Nothing scrolls and nothing reflows onto a next
 * sheet: content that misses the box is CLIPPED. Design each page to
 * FILL that page box, and to fit it — letter and A4 alike — without
 * overlap. Each page is a size container; don't size anything in
 * viewport units (they track the window, not the page), and never set
 * width or height on the .page section itself (the component sizes the
 * page box; an authored height like 100% is meaningless at print and is
 * overridden). The component owns the page box, the screen card chrome,
 * and the page breaks (never add your own break-before/after). Don't mix
 * .page sections with flowing content or header/footer slots in the same
 * document.
 *
 * FLOWING usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page margin="0.75in">
 *     <h1>Title</h1>
 *     <p>…body…</p>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * There is no manual page-splitting — the browser's print engine
 * paginates at export. Standard break-hygiene rules (`break-inside:
 * avoid` on figures, code blocks, images and table rows; `orphans/
 * widows: 3`) are applied so paragraphs and groups split cleanly. On
 * screen and at print, headings default to `text-wrap: balance` and
 * body text to `text-wrap: pretty`; the defaults have zero specificity,
 * so any text-wrap you declare wins.
 *
 * Other attributes:
 *   size    — letter | a4 | legal (default letter). Flowing documents:
 *           preview proportion only — it does NOT pin their printed
 *           paper (the print dialog's paper governs); leave it alone
 *           there. Explicitly paginated documents: it sets the page box
 *           the cards and the pinned @page share (the export dialog's
 *           choice overrides both at print) — set size="a4" for a
 *           clearly metric user. Scaled-fit: names the sheet the fit is
 *           computed against, same a4-for-metric-users advice.
 *   content-width / content-height — the design's own fixed dimensions
 *           (CSS lengths), for scaling a fixed-size design ONTO the
 *           named sheet: content lays out at exactly this size, and the
 *           component scales it to fit that sheet's printable area
 *           (centered horizontally, top-aligned; the export dialog
 *           re-fits to the user's actual paper choice where available).
 *           Both must be set; they do not change the page box. For pages
 *           WITHOUT running header/footer slots.
 *   margin  — printable inset on every page of a FLOWING document
 *           (default 0.75in); margin="0" makes pages full-bleed.
 *           Explicitly paginated pages are always full-bleed.
 *
 * Running header/footer (flowing documents only): give an element
 * `slot="header"` or `slot="footer"` and it repeats on every printed
 * page via `position: fixed`. To keep body text from sliding under it,
 * the component prints inside a single-cell table whose <thead>/<tfoot>
 * are spacers sized to the header/footer height — browsers repeat
 * thead/tfoot on every page, so each sheet's content starts below the
 * header and ends above the footer. On screen the header/footer render
 * once at the top/bottom of the sheet.
 *
 * At print the component injects `@page { margin: 0 }` (which leaves
 * Chrome no margin box to draw its date/URL/page-count header in) and
 * moves the visual margin onto the sheet's own padding. It also marks
 * the document as owning its print CSS (a
 * `meta[name="omelette-owns-print"]` it injects at runtime), so the
 * PDF export never injects page-geometry CSS of its own on top.
 *
 * Print best practices for the content you author:
 * - Multi-column text: use CSS columns (`column-count` +
 *   `column-gap`), never side-by-side flex/grid columns — only real
 *   CSS columns flow and break across pages. `column-span: all` lets
 *   a heading span the columns; `hyphens: auto` (needs `lang` on
 *   the html element) keeps narrow columns readable.
 * - Page breaks in flowing documents: `break-before: page` on an
 *   element that must start a new page (a chapter, an appendix). Add
 *   your own kept-together blocks (callouts, stat tiles, cards) to a
 *   `break-inside: avoid` rule, and keep each one shorter than a page.
 * - Extend `orphans: 3; widows: 3` to any custom text blocks you add
 *   (p and li are covered by default).
 * - Give long tables a <thead> — browsers repeat it on every printed
 *   page.
 * - No `position: fixed`/`sticky` and no viewport units in content:
 *   fixed elements stamp every printed page (running headers/footers go
 *   in the component's slots) and `100vh` mis-sizes at print.
 *
 * Author content as static HTML so the user can click-to-edit any text
 * directly. Do not set width/padding/background on the document body —
 * the component owns the sheet box.
 */
/* END USAGE */

(() => {
  const PAPER = {
    letter: ['8.5in', '11in'],
    a4: ['210mm', '297mm'],
    legal: ['8.5in', '14in']
  };
  const CSS_LENGTH = /^\d+(\.\d+)?(px|in|mm|cm|pt|pc)$/;
  // Unitless "0" is a valid CSS length and the natural way to write
  // margin="0"; normalise it to 0px so max()/calc() (which reject a bare
  // number) keep working.
  const safeLen = (v, fb) => {
    v = (v || '').trim();
    return v === '0' ? '0px' : CSS_LENGTH.test(v) ? v : fb;
  };
  // WebKit (Safari and every iOS browser shell) never repeats a table's
  // thead/tfoot on printed pages (WebKit bug 17205), so the spacer-borne
  // vertical margins of a FLOWING document reach only the first page
  // there. Engine check, not browser check: vendor is 'Apple Computer,
  // Inc.' exactly for WebKit and 'Google Inc.' for Blink.
  const WK_PRINT = /apple/i.test(navigator.vendor || '');
  // CSS length → px number (CSS absolute units are exact: 1in = 96px).
  // Returns NaN for anything safeLen would reject — callers gate on it.
  const PX_PER = {
    px: 1,
    in: 96,
    mm: 96 / 25.4,
    cm: 96 / 2.54,
    pt: 96 / 72,
    pc: 16
  };
  const toPx = v => {
    const m = /^(\d+(?:\.\d+)?)(px|in|mm|cm|pt|pc)$/.exec((v || '').trim());
    return m ? parseFloat(m[1]) * PX_PER[m[2]] : NaN;
  };
  const stylesheet = `
    :host {
      position: relative;
      display: block;
      /* When the viewport is narrower than the page, grow to wrap the
       * sheet (plus this padding) instead of staying viewport-width, so
       * the desk background and right margin reach the sheet's far edge
       * in the horizontal scroll. */
      min-width: max-content;
      min-height: 100vh;
      background: #f5f5f4;
      padding: 48px 24px;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
      --doc-page-w: 8.5in;
      --doc-page-h: 11in;
      --doc-page-margin: 0.75in;
      --doc-hdr-h: 0px;
      --doc-ftr-h: 0px;
      --doc-hdr-pad: 0px;
      --doc-ftr-pad: 0px;
    }
    .sheet {
      width: var(--doc-page-w);
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 2px 10px rgba(20, 20, 19, 0.12);
      border-radius: 7px;
      box-sizing: border-box;
      padding: var(--doc-page-margin);
    }
    .frame { width: 100%; border-collapse: collapse; }
    /* Scaled-fit mode (content-width/content-height): the inner .fit box
     * lays the content out at its authored fixed size and scales it onto
     * the printable area; .fit-box reserves the scaled footprint in flow
     * (transforms don't affect layout) and centers it. Without the mode,
     * both divs are unstyled block pass-throughs. */
    /* Explicit pagination: direct .page children are the pages. The sheet
     * becomes a transparent stack and each page carries the card look on
     * screen; at print each page is exactly one full-bleed sheet. The
     * ::slotted defaults are deliberately weak (document CSS wins), so
     * authored page styling can override any of this. */
    .sheet.paginated {
      background: transparent;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
    }
    .paginated ::slotted(.page) {
      position: relative;
      display: block;
      width: 100%;
      aspect-ratio: var(--doc-page-ar);
      container-type: size;
      overflow: hidden;
      box-sizing: border-box;
      background: #fff;
      border-radius: 7px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
      break-inside: avoid;
    }
    .paginated ::slotted(.page:not(:first-child)) { margin-top: 1rem; }
    @media print {
      .sheet.paginated { padding: 0; }
      /* The flowing-document vertical inset lives on the repeating
       * thead/tfoot spacers, not the sheet padding — they must go too,
       * or each full-sheet .page is pushed ~margin down and spills onto
       * a second sheet. Paginated pages are full-bleed by definition
       * (content owns its insets). */
      .sheet.paginated .hdr-space,
      .sheet.paginated .ftr-space { height: 0; }
      .paginated ::slotted(.page) {
        border-radius: 0 !important;
        box-shadow: none !important;
        margin: 0 !important;
        /* Physical page-box sizing, no viewport units: Safari resolves
         * 100vh against the window, not the page box, so a vh-sized card
         * paginates wrong there. --doc-page-w/h are the named size by
         * default and are overridden to the user's chosen paper by the
         * export path, so every card is exactly one sheet either way.
         * Width + height (same source values as @page size) rather than
         * width + aspect-ratio: the ratio is a 6-decimal rounding of the
         * same division, and a few millionths of overflow would spill a
         * blank sheet after every page. The screen-only aspect-ratio
         * (preview proportions) must not leak into print. cqh typography
         * tracks the same box.
         *
         * Every declaration is !important: per CSS Scoping, unimportant
         * shadow ::slotted rules LOSE to the document context, so a page
         * section's authored inline style would silently beat this print
         * geometry. A model-authored height:100% did exactly that — the
         * percentage resolves as auto in the all-auto print ancestry, the
         * base rule's size containment turns auto into ZERO, and
         * overflow:hidden then paints nothing: a blank PDF with perfect
         * page boxes. At print the component's geometry is the design's
         * whole contract, so it must win over any authored sizing. */
        aspect-ratio: auto !important;
        width: var(--doc-page-w) !important;
        height: var(--doc-page-h) !important;
        overflow: hidden !important;
      }
      .paginated ::slotted(.page:not(:first-child)) {
        break-before: page !important;
        margin-top: 0 !important;
      }
    }
    .fit-mode .fit-box {
      width: calc(var(--doc-fit-w) * var(--doc-fit-scale));
      height: calc(var(--doc-fit-h) * var(--doc-fit-scale));
      margin: 0 auto;
      break-inside: avoid;
    }
    .fit-mode .fit {
      width: var(--doc-fit-w);
      height: var(--doc-fit-h);
      transform: scale(var(--doc-fit-scale));
      transform-origin: top left;
    }
    .frame td, .frame th { padding: 0; text-align: left; font-weight: inherit; }
    .hdr-space { height: var(--doc-hdr-h); }
    .ftr-space { height: var(--doc-ftr-h); }
    ::slotted([slot="header"]),
    ::slotted([slot="footer"]) { display: block; box-sizing: border-box; }
    @media print {
      :host { background: none; padding: 0; min-width: 0; min-height: 0; }
      .sheet {
        width: auto; margin: 0; box-shadow: none; border-radius: 0;
        padding: 0 var(--doc-page-margin);
      }
      /* The thead/tfoot spacers repeat on every page, so they carry the
       * vertical page margin (which the sheet's own padding cannot, since
       * that padding is consumed once on the first/last page). The running
       * header/footer are fixed inside that band. */
      /* The 0.35in is breathing room between a running header/footer and
       * the body; without one the spacer is exactly the page margin, so a
       * margin="0" full-bleed document gets truly full-bleed pages. */
      .hdr-space { height: max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))); }
      .ftr-space { height: max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))); }
      /* WebKit flowing documents: @page carries the vertical margin (see
       * _syncPrintPageRule), so the spacers keep only whatever a running
       * header/footer needs BEYOND it — page 1 would otherwise double its
       * top inset. Paginated sheets already zero their spacers above. */
      .sheet.wk-print:not(.paginated) .hdr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))) - var(--doc-page-margin))); }
      .sheet.wk-print:not(.paginated) .ftr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))) - var(--doc-page-margin))); }
      ::slotted([slot="header"]) {
        position: fixed; top: 0; left: 0; right: 0; margin: 0;
        padding: calc(var(--doc-page-margin) * 0.45) var(--doc-page-margin) 0;
      }
      ::slotted([slot="footer"]) {
        position: fixed; bottom: 0; left: 0; right: 0; margin: 0;
        padding: 0 var(--doc-page-margin) calc(var(--doc-page-margin) * 0.45);
      }
    }
  `;
  class DocPage extends HTMLElement {
    static get observedAttributes() {
      return ['size', 'width', 'height', 'margin', 'orientation', 'content-width', 'content-height'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._mo = typeof MutationObserver === 'function' ? new MutationObserver(() => this._scheduleMeasure()) : null;
    }

    /** The named paper's [w, h], swapped when orientation="landscape".
     *  Only the named size swaps — explicit width/height are exact values
     *  the author already oriented. */
    _paperSize() {
      const named = PAPER[(this.getAttribute('size') || '').toLowerCase()] || PAPER.letter;
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? [named[1], named[0]] : named;
    }
    get pageWidth() {
      return safeLen(this.getAttribute('width'), this._paperSize()[0]);
    }
    get pageHeight() {
      return safeLen(this.getAttribute('height'), this._paperSize()[1]);
    }
    get pageMargin() {
      return safeLen(this.getAttribute('margin'), '0.75in');
    }

    /** Scaled-fit mode's content box [w, h] as CSS lengths, or null when
     *  the mode is off (either attribute missing/invalid/zero — a partial
     *  declaration falls back to normal flow rather than guessing). */
    _contentFit() {
      const w = safeLen(this.getAttribute('content-width'), null);
      const h = safeLen(this.getAttribute('content-height'), null);
      if (!w || !h) return null;
      const wPx = toPx(w),
        hPx = toPx(h);
      return wPx > 0 && hPx > 0 ? [w, h, wPx, hPx] : null;
    }
    connectedCallback() {
      if (!this._sheet) this._render();
      this._syncSize();
      this._syncPrintPageRule();
      this._ensureTextWrapDefaults();
      this._ensureOwnsPrintMeta();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      if (this._mo) this._mo.observe(this, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true
      });
      this._onResize = () => this._scheduleMeasure();
      window.addEventListener('resize', this._onResize);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => this._scheduleMeasure());
      }
      this._scheduleMeasure();
    }
    disconnectedCallback() {
      window.removeEventListener('resize', this._onResize);
      if (this._mo) this._mo.disconnect();
      if (this._raf) {
        cancelAnimationFrame(this._raf);
        this._raf = null;
      }
      // Drop the head rules when the last doc-page leaves, so a deleted
      // document's @page geometry and text-wrap defaults can't apply to
      // whatever replaces it.
      const survivor = document.querySelector('doc-page');
      if (!survivor) {
        ['doc-page-print', 'doc-page-text-wrap', 'doc-page-owns-print', 'doc-page-fixed-size', 'doc-page-print-sizing'].forEach(id => {
          const tag = document.getElementById(id);
          if (tag) tag.remove();
        });
        // A live deck-stage deferred its own print-sizing meta to ours —
        // hand the page-global meta over so the deck isn't left unmarked.
        const deck = document.querySelector('deck-stage');
        if (deck && typeof deck._ensurePrintSizingMeta === 'function') {
          deck._ensurePrintSizingMeta();
        }
      } else {
        // A departed owner hands each page-global meta to whatever
        // doc-page remains (or it's removed).
        if (typeof survivor._syncFixedSizeMeta === 'function') {
          survivor._syncFixedSizeMeta();
        }
        if (typeof survivor._syncPrintSizingMeta === 'function') {
          survivor._syncPrintSizingMeta();
        }
      }
    }
    attributeChangedCallback() {
      if (!this._sheet) return;
      this._syncSize();
      this._syncPrintPageRule();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      this._scheduleMeasure();
    }
    _render() {
      this._root.innerHTML = `
        <style>${stylesheet}</style>
        <style id="vars"></style>
        <div class="sheet" data-screen-label="Document">
          <table class="frame" role="presentation">
            <thead><tr><th><div class="hdr-space"><slot name="header"></slot></div></th></tr></thead>
            <tbody><tr><td class="body"><div class="fit-box"><div class="fit"><slot></slot></div></div></td></tr></tbody>
            <tfoot><tr><td><div class="ftr-space"><slot name="footer"></slot></div></td></tr></tfoot>
          </table>
        </div>`;
      this._sheet = this._root.querySelector('.sheet');
      this._vars = this._root.getElementById('vars');
    }

    /** Runtime sizing lives in a shadow <style> :host rule, never on the
     *  light-DOM host element, so serialize-persist can't write it back. */
    _syncSize(hdrH, ftrH) {
      // Scaled-fit mode: content at its authored size, scaled onto the
      // printable area (page minus margins on both axes). The factor is a
      // plain number var so calc(length * number) stays valid; 4 decimals
      // keeps the shadow style stable across re-measures. Upscaling is
      // allowed — print transforms are vector, so text and CSS stay crisp
      // (raster images soften, which the catalog bullet warns about).
      const fit = this._contentFit();
      let fitVars = '';
      if (fit) {
        const marginPx = toPx(this.pageMargin) || 0;
        const availW = toPx(this.pageWidth) - 2 * marginPx;
        const availH = toPx(this.pageHeight) - 2 * marginPx;
        const scale = Math.min(availW / fit[2], availH / fit[3]);
        if (scale > 0 && Number.isFinite(scale)) {
          fitVars = '--doc-fit-w:' + fit[0] + ';' + '--doc-fit-h:' + fit[1] + ';' + '--doc-fit-scale:' + scale.toFixed(4) + ';';
        }
      }
      this._sheet.classList.toggle('fit-mode', !!fitVars);
      // Numeric w/h ratio for the paginated page cards' aspect-ratio —
      // aspect-ratio takes a number, not a length ratio, so compute it
      // here (CSS length division isn't portable). 6 decimals keeps the
      // shadow style stable across re-syncs.
      const arW = toPx(this.pageWidth);
      const arH = toPx(this.pageHeight);
      const ar = arW > 0 && arH > 0 ? (arW / arH).toFixed(6) : '0.772727';
      this._vars.textContent = ':host{' + fitVars + '--doc-page-ar:' + ar + ';' + '--doc-page-w:' + this.pageWidth + ';' + '--doc-page-h:' + this.pageHeight + ';' + '--doc-page-margin:' + this.pageMargin + ';' + '--doc-hdr-h:' + (hdrH || 0) + 'px;' + '--doc-ftr-h:' + (ftrH || 0) + 'px;' + '--doc-hdr-pad:' + (hdrH ? '0.35in' : '0px') + ';' + '--doc-ftr-pad:' + (ftrH ? '0.35in' : '0px') + '}';
    }

    /** @page is a no-op inside shadow DOM, so the rule lives in <head>.
     *  Re-appended on every sync so it stays last in source order — the
     *  @page cascade is source-order per descriptor, so this rule wins
     *  over any other @page rule in the document.
     *
     *  The @page SIZE is pinned where the page box IS part of the design:
     *  explicit-fixed-size mode (width + height authored), scaled-fit
     *  mode (the named sheet the fit targets), and explicit pagination
     *  (the named size the cards share — so card and sheet agree on
     *  every print path, and the export path's chosen paper overrides
     *  BOTH with one later rule). For FLOWING documents no paper size is
     *  emitted at all — the true size comes from the user's preference,
     *  injected by the export path or chosen in the print dialog — so a
     *  flowing document never fights the paper it lands on.
     *  margin: 0 is emitted in every mode: it leaves Chrome no margin box
     *  to draw its date/URL/page-count header in, and the visual margin
     *  lives on the sheet's own padding. */
    _syncPrintPageRule() {
      const id = 'doc-page-print';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
      }
      document.head.appendChild(tag);
      // Three print-geometry regimes:
      // - true-size: the page IS the design — pin its exact size.
      // - scaled-fit (content-width/height): the fit factor is computed
      //   against the NAMED paper's printable area, so that paper must
      //   stay pinned or the scaled content overflows a smaller sheet
      //   (the export path re-fits and re-pins at print time on top).
      // - default modes: no paper size — but landscape still needs the
      //   paper-agnostic 'size: landscape' keyword, because the size
      //   descriptor is what carries orientation; without it a landscape
      //   document prints portrait whenever nothing injects a size.
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      // Explicit pagination pins the page box to the SAME values that
      // size the cards (the named size by default, the export path's
      // chosen paper when its later rule overrides both) — card and
      // sheet agree on every print path, and a mismatched real paper
      // shrinks-to-fit in the dialog instead of clipping a Letter card
      // on A4. Declared before the paginated read below so both derive
      // from one check.
      const paginatedNow = this.querySelector(':scope > .page') !== null;
      const sizeDescriptor = this._trueSizePx() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : this._contentFit() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : paginatedNow ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : landscape ? 'size: landscape; ' : '';
      // WebKit never repeats the thead/tfoot spacers that carry a flowing
      // document's vertical page margins (see WK_PRINT above), so pages
      // after the first print edge-to-edge there. Carry the VERTICAL
      // margins on @page for WebKit instead, and the shadow print CSS
      // trims the first-page spacers by the same amount (.sheet.wk-print
      // rules). Horizontal inset stays on the sheet's own padding in
      // every engine. Blink keeps margin: 0 (a nonzero margin there
      // re-opens the box Chrome draws its header furniture in). One cost,
      // learned in testing: Safari's own date/URL headers are a USER
      // dialog setting ("Print headers and footers") that renders in the
      // margin area when room exists — margin: 0 only suppressed it by
      // leaving no room, and no CSS controls it. The export dialog's
      // Safari guide teaches turning the setting off for flowing
      // documents. Explicitly paginated and fixed-size documents keep
      // margin: 0 everywhere: their pages ARE the sheet.
      const wkFlowing = WK_PRINT && !paginatedNow && !this._trueSizePx() && !this._contentFit();
      const marginDescriptor = wkFlowing ? 'margin: ' + this.pageMargin + ' 0; ' : 'margin: 0; ';
      // Shadow-internal marker (never serialized), kept in lockstep with
      // the @page decision above: the print CSS trims the first-page
      // spacers ONLY while @page actually carries the margins — a
      // true-size or scaled-fit sheet keeps margin: 0 and must keep its
      // spacers too. Re-synced here so attribute changes and pagination
      // flips move both together.
      if (this._sheet) this._sheet.classList.toggle('wk-print', wkFlowing);
      tag.textContent = '@page { ' + sizeDescriptor + marginDescriptor + '} ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; height: auto !important; overflow: visible !important; } ' + 'h1,h2,h3,h4,h5,h6 { break-after: avoid; } ' + 'figure,pre,blockquote,img,svg,tr { break-inside: avoid; } ' + 'p,li { orphans: 3; widows: 3; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; ' + 'backdrop-filter: none !important; -webkit-backdrop-filter: none !important; } ' + '*, *::before, *::after { animation-delay: -99s !important; animation-duration: .001s !important; ' + 'animation-iteration-count: 1 !important; animation-fill-mode: both !important; ' + 'animation-play-state: running !important; transition-duration: 0s !important; } }';
    }

    /** Typographic defaults for document text: balance headings, avoid
     *  widowed/orphaned words in body copy (browsers without text-wrap
     *  support drop the declarations). Zero-specificity via :where() so
     *  any text-wrap authored on those elements wins; document-level so the
     *  rules reach the slotted (light DOM) content — shadow styles can't.
     *  data-omelette-injected marks the tag for the host editor to strip
     *  at serialize, so it is never written back as authored source. */
    _ensureTextWrapDefaults() {
      if (document.getElementById('doc-page-text-wrap')) return;
      const tag = document.createElement('style');
      tag.id = 'doc-page-text-wrap';
      tag.setAttribute('data-omelette-injected', '');
      tag.textContent = ':where(h1,h2,h3,h4,h5,h6){text-wrap:balance}' + ':where(p,li,blockquote,figcaption){text-wrap:pretty}';
      document.head.appendChild(tag);
    }

    /** Declares that this document owns its print CSS. The instant-PDF
     *  export checks for the meta by NAME PRESENCE alone (content is
     *  ignored) and skips its automatic print-CSS injections, so the
     *  component's @page geometry is never overridden by a heuristic.
     *  data-omelette-injected keeps it out of serialized source. */
    _ensureOwnsPrintMeta() {
      if (document.getElementById('doc-page-owns-print')) return;
      const tag = document.createElement('meta');
      tag.id = 'doc-page-owns-print';
      tag.name = 'omelette-owns-print';
      tag.content = 'true';
      tag.setAttribute('data-omelette-injected', '');
      document.head.appendChild(tag);
    }

    /** This page's valid true-size page box (explicit width AND height)
     *  as [w, h] px ints, or null when the mode is off. */
    _trueSizePx() {
      if (!safeLen(this.getAttribute('width'), null) || !safeLen(this.getAttribute('height'), null)) return null;
      const w = Math.round(toPx(this.pageWidth));
      const h = Math.round(toPx(this.pageHeight));
      return w > 0 && h > 0 ? [w, h] : null;
    }

    /** True-size pages (explicit width AND height) also declare the page
     *  box as the preview size: the in-app preview reads
     *  meta[name="omelette-fixed-size"] (content "W,H" in px ints) and
     *  scales the sheet into view — without it an 18in poster previews at
     *  true size with scrollbars. Never overrides an author-set meta
     *  (only the component's own id is managed). The meta is page-global
     *  while doc-page instances are not, so every sync recomputes the
     *  page-wide owner — the first connected true-size doc-page — and a
     *  non-true-size sibling's sync can never delete the owner's meta.
     *  Removed when no true-size page remains (the owner's disconnect
     *  re-syncs via any survivor) or when an author-set meta exists. */
    _syncFixedSizeMeta() {
      const id = 'doc-page-fixed-size';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-fixed-size"]:not([data-omelette-injected])');
      // The page-wide owner, not this instance: an upgraded true-size page
      // anywhere in the document keeps the meta alive and sized.
      let box = null;
      for (const el of document.querySelectorAll('doc-page')) {
        box = typeof el._trueSizePx === 'function' ? el._trueSizePx() : null;
        if (box) break;
      }
      if (!box || authored) {
        if (own) own.remove();
        return;
      }
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-fixed-size';
      tag.content = box[0] + ',' + box[1];
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }

    /** This page's print-sizing mode: 'fixed' when an explicit width AND
     *  height are authored (the page is the design's own size), else the
     *  default paper in the authored orientation. */
    _printSizingMode() {
      if (this._trueSizePx()) return 'fixed';
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? 'default-landscape' : 'default-portrait';
    }

    /** Announces the print-sizing mode to the host app:
     *  meta[name="omelette-print-sizing"] with content 'default-portrait',
     *  'default-landscape', or 'fixed' (fixed pages also carry the
     *  omelette-fixed-size meta with the page box in px). The export path
     *  probes it to decide what true paper size to inject at print time —
     *  in the default modes the component emits no paper size of its own.
     *  Same page-global ownership rules as the fixed-size meta above:
     *  first connected doc-page owns it, an authored meta is never
     *  overridden, removed when no doc-page remains. */
    _syncPrintSizingMeta() {
      const id = 'doc-page-print-sizing';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-print-sizing"]:not([data-omelette-injected])');
      // A fixed page wins outright (mirroring the fixed-size loop above,
      // so the two metas can never contradict each other in a mixed
      // multi-page document); otherwise the first page's mode holds.
      let mode = null;
      for (const el of document.querySelectorAll('doc-page')) {
        if (typeof el._printSizingMode !== 'function') continue;
        const m = el._printSizingMode();
        if (m === 'fixed') {
          mode = m;
          break;
        }
        if (mode === null) mode = m;
      }
      if (!mode || authored) {
        if (own) own.remove();
        return;
      }
      // A deck-stage that connected first injected its own meta and
      // defers to any existing one — take it over, or the document ends
      // up with two conflicting injected metas (a doc-page page is the
      // document; the deck re-ensures its meta if every doc-page leaves).
      const deckMeta = document.getElementById('deck-stage-print-sizing');
      if (deckMeta) deckMeta.remove();
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-print-sizing';
      tag.content = mode;
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }
    _scheduleMeasure() {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => {
        this._raf = null;
        this._measure();
      });
    }

    /** Slot heights feed the print spacers (--doc-hdr-h / --doc-ftr-h), so
     *  they re-measure on content mutation, resize, and font load. The
     *  same pass detects explicit pagination (direct .page children) and
     *  toggles the sheet between the flowing-document card and the
     *  page-per-card stack — content edits can add or remove pages at any
     *  time, so this tracks the same mutations the measurement does. */
    _measure() {
      const hdr = this.querySelector(':scope > [slot="header"]');
      const ftr = this.querySelector(':scope > [slot="footer"]');
      const wasPaginated = this._sheet.classList.contains('paginated');
      this._sheet.classList.toggle('paginated', this.querySelector(':scope > .page') !== null);
      // The WebKit @page margin is flowing-only, so a pagination flip
      // must re-emit the rule (content edits can add or remove .page
      // sections at any time).
      if (this._sheet.classList.contains('paginated') !== wasPaginated) {
        this._syncPrintPageRule();
      }
      this._syncSize(hdr ? hdr.offsetHeight : 0, ftr ? ftr.offsetHeight : 0);
    }
  }
  if (!customElements.get('doc-page')) {
    customElements.define('doc-page', DocPage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/story-engine/doc-page.js", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.QM_ICONS = __ds_scope.QM_ICONS;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Kbd = __ds_scope.Kbd;

__ds_ns.StateDot = __ds_scope.StateDot;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.ModeBar = __ds_scope.ModeBar;

__ds_ns.Overlay = __ds_scope.Overlay;

__ds_ns.Refusal = __ds_scope.Refusal;

__ds_ns.SaveStatus = __ds_scope.SaveStatus;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Picker = __ds_scope.Picker;

__ds_ns.PromptField = __ds_scope.PromptField;

__ds_ns.PromptTextField = __ds_scope.PromptTextField;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.TextArea = __ds_scope.TextArea;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.AnnotationMark = __ds_scope.AnnotationMark;

__ds_ns.BeatCard = __ds_scope.BeatCard;

__ds_ns.BeatSpine = __ds_scope.BeatSpine;

__ds_ns.EntityToken = __ds_scope.EntityToken;

__ds_ns.EraChip = __ds_scope.EraChip;

__ds_ns.NoteBlock = __ds_scope.NoteBlock;

__ds_ns.RouteChip = __ds_scope.RouteChip;

__ds_ns.TimelineRow = __ds_scope.TimelineRow;

__ds_ns.VersionStrip = __ds_scope.VersionStrip;

__ds_ns.PanelHeader = __ds_scope.PanelHeader;

__ds_ns.StatusBar = __ds_scope.StatusBar;

__ds_ns.TopBar = __ds_scope.TopBar;

})();

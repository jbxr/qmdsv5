import React from 'react';
import { Field } from './Field.jsx';
import { warnUnknown, pick } from '../core/warn.js';

// `resize` reached CSSOM as the declaration value itself, so an unrecognised one
// was not a branch that missed but a declaration the browser dropped: the
// textarea fell back to the UA's `resize: both` and grew the drag handle this
// component exists to withhold. A table makes it fall back to `none` like
// everything else.
const RESIZE = { none: 'none', vertical: 'vertical' };

const RESET = {
  flex: 1, minWidth: 0, width: '100%', display: 'block',
  appearance: 'none', WebkitAppearance: 'none',
  background: 'transparent', border: 0, padding: 0, margin: 0,
  fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit',
  lineHeight: 'inherit', letterSpacing: 'inherit', color: 'inherit'
};

/** Many lines the author types into. `kind="serif"` for anything read as prose. */
export const TextArea = React.forwardRef(function TextArea({
  label, hint, kind = 'text', size = 'md', width, focused, rows = 3, resize = 'none', disabled,
  id, className, style, controlStyle, ...rest
}, ref) {
  const auto = React.useId();
  const inputId = id || auto;
  const grip = pick(RESIZE, resize, RESIZE.none);
  warnUnknown('TextArea', 'resize', resize, RESIZE, 'none');
  return (
    <Field
      label={label} hint={hint} labelFor={inputId} multiline disabled={disabled}
      kind={kind} size={size} width={width} focused={focused} style={style}
    >
      <textarea
        ref={ref} id={inputId} rows={rows} disabled={disabled}
        className={className ? `qm-control ${className}` : 'qm-control'}
        style={{ ...RESET, resize: grip, ...controlStyle }}
        {...rest}
      />
    </Field>
  );
});

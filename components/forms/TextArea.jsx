import React from 'react';
import { Field } from './Field.jsx';

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
  return (
    <Field
      label={label} hint={hint} labelFor={inputId} multiline disabled={disabled}
      kind={kind} size={size} width={width} focused={focused} style={style}
    >
      <textarea
        ref={ref} id={inputId} rows={rows} disabled={disabled}
        className={className ? `qm-control ${className}` : 'qm-control'}
        style={{ ...RESET, resize, ...controlStyle }}
        {...rest}
      />
    </Field>
  );
});

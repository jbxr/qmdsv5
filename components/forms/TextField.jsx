import React from 'react';
import { Field } from './Field.jsx';

const RESET = {
  flex: 1, minWidth: 0, width: '100%',
  appearance: 'none', WebkitAppearance: 'none',
  background: 'transparent', border: 0, outline: 'none', padding: 0, margin: 0,
  fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit',
  lineHeight: 'inherit', letterSpacing: 'inherit', color: 'inherit'
};

/** A single line the author types into — a real `<input>` in Field's inset well. */
export const TextField = React.forwardRef(function TextField({
  label, hint, kind = 'text', size = 'md', width, focused, trailing, disabled,
  id, className, style, controlStyle, ...rest
}, ref) {
  const auto = React.useId();
  const inputId = id || auto;
  return (
    <Field
      label={label} hint={hint} labelFor={inputId} disabled={disabled}
      kind={kind} size={size} width={width} focused={focused} style={style}
    >
      <input
        ref={ref} id={inputId} disabled={disabled}
        className={className ? `qm-control ${className}` : 'qm-control'}
        style={{ ...RESET, ...controlStyle }}
        {...rest}
      />
      {trailing}
    </Field>
  );
});

import React from 'react';
import { PromptField } from './PromptField.jsx';

const RESET = {
  flex: 1, minWidth: 0, width: '100%',
  appearance: 'none', WebkitAppearance: 'none',
  background: 'transparent', border: 0, padding: 0, margin: 0,
  fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit',
  lineHeight: 'inherit', letterSpacing: 'inherit', color: 'inherit'
};

/** An addressed line the author types into — a real `<input>` in PromptField's well. */
export const PromptTextField = React.forwardRef(function PromptTextField({
  audience, hintKey, trailing, focused, className, style, controlStyle, ...rest
}, ref) {
  return (
    <PromptField audience={audience} hintKey={hintKey} trailing={trailing} focused={focused} style={style}>
      <input
        ref={ref}
        className={className ? `qm-control ${className}` : 'qm-control'}
        style={{ ...RESET, ...controlStyle }}
        {...rest}
      />
    </PromptField>
  );
});

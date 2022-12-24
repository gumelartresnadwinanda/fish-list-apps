import React from 'react';

function Label({ text, children }) {
  return (
    <label className='form-label'>
      {text}
      {children}
    </label>
  );
}

export default Label;
import React from 'react';

function Input({ 
  name, 
  value, 
  onChange, 
  type = 'text', 
  pattern, 
  required, 
  onKeyDown,
  className,
  min,
  max
}) {
  return (
    <input
      className={className}
      type={type}
      value={value}
      name={name}
      onChange={(event) => onChange(event.target)}
      pattern={pattern}
      required={required}
      onKeyDown={onKeyDown}
      min={min}
      max={max}
    />
  );
}

export default Input;
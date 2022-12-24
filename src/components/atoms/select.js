import React from 'react';

function Select({ options, value, onChange, name, required }) {
  return (
    <select
      name={name} 
      value={value} 
      onChange={(event) => onChange(event.target)}
      required={required}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
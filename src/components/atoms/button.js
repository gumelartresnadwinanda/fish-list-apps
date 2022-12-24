import React from 'react';

export const Button = ({ text, onClick, type, rounded, displayType, disabled }) => {
  
  let className = 'button';
  if (displayType) className += ` button-${displayType}`;
  if (rounded) className += ` rounded`;

  return (
    <button 
      onClick={onClick} 
      className={className}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
import React from 'react';

function Form({ onSubmit, children }) {
  return (
    <form className="form position-relative" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default Form;
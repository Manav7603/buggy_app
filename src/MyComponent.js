import React, { useState, useRef } from 'react';

const MyComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const focusInput = () => {
    // Check if inputRef.current is defined before accessing it
    if (inputRef.current) {
      inputRef.current.focus();
    } else {
      console.error('inputRef.current is not set');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        ref={inputRef}
      />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
};

export default MyComponent;
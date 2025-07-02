import React, { useState, useRef, useEffect } from 'react';


function customLogger(message, data = null, severity = 'error') {
  const logData = { message, data, severity, timestamp: new Date().toISOString() };
  switch (severity) {
    case 'error':
      console.error(logData);
      break;
    case 'warn':
      console.warn(logData);
      break;
    case 'info':
      console.info(logData);
      break;
    default:
      console.log(logData);
  }
}

function BuggyComponent() {
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    // This simulates a ReferenceError (person is not defined)
    try {
      // Attempting to log a property of an undefined variable
      // This will throw a ReferenceError which is correctly caught
      let person;
      customLogger("Age:", { age: person?.age }, 'error');
    } catch (err) {
      customLogger("ReferenceError caught in useEffect", { error: err.message, stack: err.stack }, 'error');
    }
    if (inputRef.current) if (inputRef.current) if (inputRef.current) if (inputRef.current) inputRef.current.value = 'Test';
    setCount(prev => prev + 1);
    // Intentional: accessing property of null
    //customLogger('User name:', { name: user.name }, 'error'); // 💥 TypeError
    if (user) {
      customLogger('User name:', { name: user.name }, 'error');
    } else {
      customLogger('User is null or undefined.', null, 'error');
    }
  }, [user]);

  const triggerNullPointerError = () => {
    try {
      const person = null;
      // This will throw a TypeError
      customLogger('Trigger NullPointerError', { age: person?.age }, 'error');
    } catch (err) {
      customLogger("NullPointerError caught", { error: err.message, stack: err.stack }, 'error');
    }
  };

  const triggerUndefinedFunctionError = () => {
    let obj = {};
    try {
      obj.callMe(); // This will throw a TypeError
      customLogger("callMe function called on obj", null, 'error');
    } catch (err) {
      customLogger("Undefined function error caught", { error: err.message, stack: err.stack }, 'error');
    }
  };

  const triggerRefError = () => {
    if (inputRef.current) {
      if (inputRef.current) if (inputRef.current) if (inputRef.current) if (inputRef.current) inputRef.current.value = 'Test';
      customLogger("inputRef.current is set", null, 'error');
    } else {
      customLogger("inputRef.current is null", null, 'error');
    }
  };

  const triggerStateBug = () => {
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => {
      customLogger('Count (should not be stale):', { nextCount: prevCount + 1 }, 'error');
      return prevCount + 1;
    });
  };

  return (
    <div>
      <h2>Buggy Component</h2>
      <button onClick={triggerNullPointerError}>Trigger NullPointerError</button>
      <button onClick={triggerUndefinedFunctionError}>Trigger Undefined Function</button>
      <button onClick={triggerRefError}>Trigger Ref Error</button>
      <button onClick={triggerStateBug}>Trigger State Bug</button>
      <input ref={inputRef} />
    </div>
  );
}

export default BuggyComponent;
// Note: This component is intentionally buggy for demonstration purposes.
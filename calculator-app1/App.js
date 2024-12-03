import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    if (value === '=') {
      try {
        const result = eval(input);
        setInput(String(result));
      } catch (error) {
        setInput('Error');
      }
    } else if (value === 'C') {
      setInput('');
    } else {
      setInput((prev) => prev + value);
    }
  };

  return (
    <div className="App">
      <div className="calculator">
        <h1 className="title">Calculator</h1>
        <input
          type="text"
          value={input}
          readOnly
          className="calculator-display"
        />
        <div className="calculator-buttons">
          {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              className="btn"
            >
              {btn}
            </button>
          ))}
          <button onClick={() => handleClick('C')} className="btn clear-btn">
            C
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Email validation function
  const validateEmail = (email) => {
    // Check if email is in lowercase and ends with @gmail.com
    const emailRegex = /^[a-z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check email validity and password
    if (validateEmail(email) && password) {
      setMessage(`Login Successful! Welcome, ${email}`);
      setIsLoggedIn(true);
    } else if (!validateEmail(email)) {
      setMessage('Invalid email. Please enter a valid Gmail address.');
    } else {
      setMessage('Please enter a password.');
    }
  };

  return (
    <div className="app">
      <div className={`login-container ${isLoggedIn ? 'submitted' : ''}`}>
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              className="input-field"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default App;

/*import React, { useState } from 'react';
import axios from 'axios';
import '../styles/component.css';


const Register = () => {
  const [name, setName] = useState('');
  const [passkey, setPasskey] = useState('');

  const handleRegister = async () => {
    try {
      console.log('Attempting registration:', { name, passkey });
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username: name,
        password: passkey,
      });

      console.log('Backend Response:', res.data);
      alert(res.data.message || 'User registered successfully!');
      window.location.href = '/'; // Redirect to login
    } catch (error) {
      console.error('Registration Error:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Passkey"
        name="passkey"
        value={passkey}
        onChange={(e) => setPasskey(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <p>
        Already Registered? <a href="/">Login here</a>
      </p>
    </div>
  );
};

export default Register;

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/component.css';

const Register = () => {
  const [name, setName] = useState('');
  const [passkey, setPasskey] = useState('');
  const [confirmPasskey, setConfirmPasskey] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    if (passkey !== confirmPasskey) {
      setErrorMessage('Passwords do not match');
      return;
    }
    setErrorMessage(''); // Clear previous errors

    try {
      console.log('Attempting registration:', { name, passkey });
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username: name,
        password: passkey,
        email:email,
      });

      console.log('Backend Response:', res.data);
      alert(res.data.message || 'User registered successfully!');
      window.location.href = '/'; // Redirect to login
    } catch (error) {
      console.error('Registration Error:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="auth-input"
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Passkey"
          name="passkey"
          value={passkey}
          onChange={(e) => setPasskey(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Confirm Passkey"
          name="confirmPasskey"
          value={confirmPasskey}
          onChange={(e) => setConfirmPasskey(e.target.value)}
          className="auth-input"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button onClick={handleRegister} className="auth-button">
          Register
        </button>
        <p>
          Already Registered? <a href="/">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;*/

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/component.css';

const Register = () => {
  const [name, setName] = useState('');
  const [passkey, setPasskey] = useState('');
  const [confirmPasskey, setConfirmPasskey] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
 
  /*
  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]{3,30}$/; // Only letters and spaces, 3-30 characters long
    return nameRegex.test(name);
  };*/
  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z][a-zA-Z0-9_@#$%^&*()-+=]{2,29}$/;
    // Starts with a letter, allows letters, numbers, underscores, and special characters, 3-30 characters
    return nameRegex.test(name);
  };
  
  

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && /\d/.test(password) && /[A-Z]/.test(password);
  };

  const handleRegister = async () => {
    // Reset messages
    setErrorMessage('');
    setSuccessMessage('');

    // Field validations
    if (!name.trim() || !email.trim() || !passkey.trim() || !confirmPasskey.trim()) {
      setErrorMessage('All fields are required');
      return;
    }

    if (!validateName(name)) {
      setErrorMessage(
        "Username must start with a letter, 3-30 chars, and can include letters, numbers, and special symbols."
      );
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Invalid email format');
      return;
    }

    if (!validatePassword(passkey)) {
      setErrorMessage(
        'Password must be at least 8 characters long, include one uppercase letter, and one number'
      );
      return;
    }

    if (passkey !== confirmPasskey) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      console.log('Attempting registration:', { name, passkey, email });
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username: name,
        password: passkey,
        email: email,
      });

      console.log('Backend Response:', res.data);
      setSuccessMessage(res.data.message || 'User registered successfully!');
      setErrorMessage('');
      alert(res.data.message || 'User registered successfully!');
      window.location.href = '/'; // Redirect to login
    } catch (error) {
      const errorResponse = error.response?.data;
      console.error('Registration Error:', errorResponse || error.message);

      if (errorResponse?.error === 'User already exists') {
        setErrorMessage('User with this email or username already exists.');
      } else {
        setErrorMessage("User Already Exists" || 'Registration failed. Please try again.');

      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        <input
          type="text"
          name="name"
          placeholder="UserName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="auth-input"
        
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
          
        />
        <input
          type="password"
          placeholder="Passkey"
          name="passkey"
          value={passkey}
          onChange={(e) => setPasskey(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Confirm Passkey"
          name="confirmPasskey"
          value={confirmPasskey}
          onChange={(e) => setConfirmPasskey(e.target.value)}
          className="auth-input"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button onClick={handleRegister} className="auth-button">
          Register
        </button>
        <p>
          Already Registered? <a href="/">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;


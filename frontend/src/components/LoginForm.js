
import React, { useContext, useState } from 'react';
import axios from 'axios';
import '../styles/component.css';
import { UserContext } from '../App.js';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const [name, setName] = useState('');
  const [passkey, setPasskey] = useState('');
  const {isLogin,setIsLogin}=useContext(UserContext);
  const navigate=useNavigate();

  const handleLogin = async () => {
    try {
      console.log('Attempting login:', { name, passkey });
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username: name,
        password: passkey,
      });

      console.log('Backend Response:', res.data);
      //setIsLogin(true);
      //alert(res.data.message || 'Login successful!');
      toast.success('Login successful!', {
        position: "top-right",
        autoClose: 5000, // Toast will disappear after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });


      setTimeout(() => navigate("/dashboard"), 1500);
      localStorage.setItem('token', res.data.token); // Store token for future requests
      setIsLogin(true);
      //window.location.href = '/dashboard'; // Redirect to dashboard
      //navigate("/dashboard");
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div>
      <ToastContainer/>
      <div className="auth-container">
        <h1 className="auth-header">Welcome to Secure Notes</h1>
        <div className="auth-box">
          <h2>Login</h2>
          <input
            type="text"
            name="name"
            placeholder="UserName"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <button onClick={handleLogin} className="auth-button">
            Login
          </button>
          <p>
            New User? <a href="/register">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;





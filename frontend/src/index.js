import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new import for React 18
import './index.css';
import App from './App.js';

// Create a root for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component using the new method
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

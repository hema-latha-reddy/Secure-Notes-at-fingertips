import React, { useState } from 'react';
import axios from 'axios';
import '../styles/component.css';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handlePasswordChange = async () => {
    // Basic validation
    if (newPassword !== confirmPassword) {
      setErrorMessage("New Password and Confirm Password do not match");
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage

      // Send request to change password
      const res = await axios.post(
        'http://localhost:5000/api/auth/change-password', 
        { oldPassword:oldPassword, newPassword: newPassword ,confirmPassword:confirmPassword},
        {
          headers: {
            Authorization:  `Bearer ${token}`, // Sending token for authentication
          },
        }
      );

      // Handle success response
      setSuccessMessage(res.data.message || 'Password changed successfully!');
      setErrorMessage('');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      // Handle error response
      setErrorMessage(error.response?.data?.error || 'Password change failed. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <div className="auth-container">
        <h1 className="auth-header">Change Password</h1>
        <div className="auth-box">
          <h2>Change Your Password</h2>

          {/* Old Password */}
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="auth-input"
          />

          {/* New Password */}
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="auth-input"
          />

          {/* Confirm New Password */}
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="auth-input"
          />

          {/* Error/Success Message */}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

          {/* Button to submit password change */}
          <button onClick={handlePasswordChange} className="auth-button">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
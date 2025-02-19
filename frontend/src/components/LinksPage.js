


import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/pages.css';
import '../styles/toastStyles.css';

const toastOptions = {
  position: "top-right",
  autoClose: 3000, // Toast disappears after 5 seconds
  hideProgressBar: false, // Show the progress bar
  closeOnClick: true, // Close toast when clicked
  pauseOnHover: true, // Pause the auto-dismiss when hovered
  draggable: true, // Allow dragging to dismiss
  theme: "colored", // Default progress behavior
   // Use the colored theme for better contrast
};

const LinkPage = () => {
  const [link, setLink] = useState('');
  const [retrievedLinks, setRetrievedLinks] = useState([]);
  const [decryptedLinks, setDecryptedLinks] = useState([]);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [name, setName] = useState('');
  

  const isValidURL = (url) => {
    const urlRegex = /^(https?:\/\/)[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(:\d{1,5})?(\/.*)?$/;
    return urlRegex.test(url);
  };

  const saveLinkHandler = async () => {
    if (!isValidURL(link)) {
      toast.error('Invalid URL! Please enter a valid link.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('User is not authenticated', toastOptions);
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/links/save',
        { content: link },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message || 'Link saved successfully', toastOptions);
      setLink('');
    } catch (error) {
      toast.error('Failed to save the link', toastOptions);
    }
  };

  const retrieveLinksHandler = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('User is not authenticated', toastOptions);
        return;
      }

      const response = await axios.get('http://localhost:5000/api/links/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRetrievedLinks(response.data || []);
      setDecryptedLinks([]);
      toast.success('Encrypted links retrieved successfully.', toastOptions);
    } catch (error) {
      toast.error('Failed to retrieve links', toastOptions);
    }
  };

  const showDecryptionFields = () => {
    setShowPasswordField(true);
  };

  const handlePasswordSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('User is not authenticated', toastOptions);
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/links/decrypt',
        { username: name, password: password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setDecryptedLinks(response.data.decryptedLinks);
        setPasswordError('');
        setRetrievedLinks([]);
        setShowPasswordField(false);
        toast.success('Links decrypted successfully.', toastOptions);
      } else {
        setPasswordError('Invalid password or username! Please try again.');
      }
    } catch (error) {
      setPasswordError('Error occurred while verifying password.');
    }
  };

  return (
    <div className="page-container">
      <ToastContainer/> {/* Toast notification container */}
      <h2>Save a Link</h2>
      <input
        type="text"
        value={link}
        onChange={(e) => {
          setLink(e.target.value);
          setRetrievedLinks([]);
        }}
        placeholder="Enter your link"
      />
      <button onClick={saveLinkHandler}>Save</button>
      <button onClick={retrieveLinksHandler}>Retrieve Links</button>

      {retrievedLinks.length > 0 && (
        <div className="retrieved-container">
          <h3>Retrieved Encrypted Links:</h3>
          <ul>
            {retrievedLinks.map((retrievedLink, index) => (
              <li key={index}>{retrievedLink.content}</li>
            ))}
          </ul>
          <button onClick={showDecryptionFields}>Decrypt Links</button>
        </div>
      )}

      {showPasswordField && (
        <div>
          <h3>Enter Username and Password to Decrypt Links</h3>
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password to decrypt"
          />
          <button onClick={handlePasswordSubmit}>Submit Password</button>
          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        </div>
      )}

      {decryptedLinks.length > 0 && (
        <div className="retrieved-container">
          <h3>Decrypted Links:</h3>
          <ul>
            {decryptedLinks.map((decryptedLink, index) => (
              <li key={index}>{decryptedLink.decryptedData}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LinkPage;

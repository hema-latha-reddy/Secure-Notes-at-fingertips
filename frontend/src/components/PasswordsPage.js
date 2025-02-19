
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import '../styles/pages.css';
//import '../styles/toastStyles.css';

/*const toastOptions = {
  position: "top-right",
  autoClose: 3000, // Toast disappears after 5 seconds
  hideProgressBar: false, // Show the progress bar
  closeOnClick: true, // Close toast when clicked
  pauseOnHover: true, // Pause the auto-dismiss when hovered
  draggable: true, // Allow dragging to dismiss
  theme: "colored", // Default progress behavior
   // Use the colored theme for better contrast
};*/


const PasswordPage = () => {
  const [title, setTitle] = useState(''); // State for the title
  const [password, setPassword] = useState(''); // State for the password
  const [message, setMessage] = useState('');
  const [retrievedPasswords, setRetrievedPasswords] = useState([]);
  const [decryptedPasswords, setDecryptedPasswords] = useState([]);
  const [passwordError, setPasswordError] = useState('');
  const [showPasswordField, setShowPasswordField] = useState(false); // To show the password input
  const [name, setName] = useState('');


  const savePasswordHandler = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token
      if (!token) {
        setMessage('User is not authenticated');
        return;
      }

      // Send title and password to the backend
      const response = await axios.post(
        'http://localhost:5000/api/passwords/save',
        { title: title, content: password },
        { headers: { Authorization: `Bearer ${token}` }, }
      );

      // Clear retrievedPasswords to hide them after saving
      console.log('Response:', response);
      toast.success(response.data.message || 'Password saved successfully');

      setTitle(''); // Clear input fields
      setPassword('');
    } catch (error) {
      console.error('Error saving the password:', error);
      toast.error('Failed to save the password');

    }
  };

  const retrievePasswordsHandler = async () => {
    try {
     
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('User is not authenticated');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/passwords/all', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRetrievedPasswords(response.data || []);
      //setShowPasswordField(true);
      setDecryptedPasswords([]);
      toast.success('Encrypted passwords retrieved successfully.');

   
    } catch (error) {
      console.error('Error retrieving the passwords:', error);
      toast.error('Failed to retrieve passwords');
    }
  };

  const showDecryptionFields = () => {
    setShowPasswordField(true);
  };

  const handlePasswordSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('User is not authenticated');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/passwords/decrypt',
        { username:name,password:password }, // Send password to backend for decryption
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
       if (response.data) {
        setDecryptedPasswords(response.data.decryptedPasswords); // Set decrypted links
        setPasswordError(''); // Clear any previous errors
        //setShowPasswordField(false);
        setRetrievedPasswords([]);
         setTimeout(() => {
        setShowPasswordField(false);
      }, 0);  // Hide password input field *only after links are set*
      toast.success('Passwords decrypted successfully.');

      } else {
        setPasswordError('Invalid password or username! Please try again.');
      }
    } catch (error) {
      setPasswordError('Error occurred while verifying password.');
    }
  };

  console.log(decryptedPasswords);

  return (
    <div className='page-container'>
      <ToastContainer/>
      <h2>Save and Retrieve Passwords</h2>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setRetrievedPasswords([]); // Clear retrievedPasswords when user types a new password
        }}
        placeholder="Enter password"
      />
      <button onClick={savePasswordHandler}>Save</button>
      <button onClick={retrievePasswordsHandler}>Retrieve Passwords</button>
      
      {retrievedPasswords.length > 0 && (
        <div className='retrieved-container'>
          <h3>Retrieved  encrypted Passwords:</h3>
          <ul>
            {retrievedPasswords.map((item, index) => (
              <li key={index}>
                <strong>Title:</strong> {item.title} <br />
                <strong>Password:</strong> {item.content}
              </li>
            ))}
          </ul>
          <button onClick={showDecryptionFields}>Decrypt Passwords</button>

        </div>
      )}

{showPasswordField && (
        <div>
           <h3>Enter Username and Password to Decrypt Passwords</h3>
          <input
          type="text"
          name="name"
          placeholder="Userame"
          value={name}
          onChange={(e) => setName(e.target.value)}
          
        />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value);
            }}
            placeholder="Enter your password to decrypt"
          />
          <button onClick={handlePasswordSubmit}>Submit</button>
          
          {passwordError && <p>{passwordError}</p>}
        </div>
      )}
        {decryptedPasswords.length > 0 && (
              <div className="retrieved-container">
                <h3>Decrypted Passwords:</h3>
                <ul>
                  {decryptedPasswords.map((decryptedPassword, index) => (
                    <li key={index}>
                      <strong>Title:</strong> {decryptedPassword.title} <br />
                      <strong>Password:</strong> {decryptedPassword.decryptedData}
                      </li> 
                  ))}
                </ul>
              </div>
            )}


    </div>
  );
};

export default PasswordPage;




/*

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/pages.css';

const NotesPage = () => {
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');
  const [retrievedNotes, setRetrievedNotes] = useState([]);
  const [decryptedNotes, setDecryptedNotes] = useState([]);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPasswordField, setShowPasswordField] = useState(false); // To show the password input
  const [name, setName] = useState('');

  const saveNoteHandler = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      if (!token) {
        setMessage('User is not authenticated');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/notes/save',
        { content: note }, // Send the note content in the request body
        {
          headers: {
            "Authorization": `Bearer ${token}`, // Pass token in the Authorization header
          },
        }
      );
      setMessage(response.data.message || 'Note saved successfully');
      setNote(''); // Clear note input after saving
    } catch (error) {
      console.error('Error saving the note:', error);
      setMessage('Failed to save the note');
    }
  };

  const retrieveNotesHandler = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      if (!token) {
        setMessage('User is not authenticated');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/notes/all', {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in the Authorization header
        },
      });
      setRetrievedNotes(response.data || []); // Store the retrieved notes
      setShowPasswordField(true);

      setMessage('Notes retrieved successfully');
    } catch (error) {
      console.error('Error retrieving the notes:', error);
      setMessage('Failed to retrieve notes');
    }
  };
  
   const handlePasswordSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('User is not authenticated');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/notes/decrypt',
        { username:name,password:password }, // Send password to backend for decryption
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
       if (response.data) {
        setDecryptedNotes(response.data.decryptedNotes); // Set decrypted links
        setPasswordError(''); // Clear any previous errors
        
        setRetrievedNotes([]);
         setTimeout(() => {
        setShowPasswordField(false);
      }, 0);  // Hide password input field *only after links are set*
      } else {
        setPasswordError('Invalid password or username! Please try again.');
      }
    } catch (error) {
      setPasswordError('Error occurred while verifying password.');
    }
  };

  console.log(decryptedNotes);


  

  return (
    <div className='page-container'>
      <h2>Save and Retrieve Notes</h2>
      <textarea
        value={note}
        name="note"
        onChange={(e) => {
          setNote(e.target.value)
          setRetrievedNotes([])
        }}
        placeholder="Enter your note"
      />
      <button onClick={saveNoteHandler}>Save</button>
      <button onClick={retrieveNotesHandler}>Retrieve Notes</button>
      {message && <p>{message}</p>}
      {retrievedNotes.length > 0 && (
        <div className='retrieved-container'>
          <h3>Retrieved Encrypted Notes:</h3>
          <ul>
            {retrievedNotes.map((retrievedNote, index) => (
              <li key={index}>{retrievedNote.content}</li>
            ))}
          </ul>
        </div>
      )}
      
      {showPasswordField && (
        <div>
           <h3>Enter Username and Password to Decrypt Notes</h3>
          <input
          type="text"
          name="name"
          placeholder="Userame"
          value={name}
          onChange={(e) => setName(e.target.value)}/>
        <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value);
            }}
            placeholder="Enter your password to decrypt"
          />
          <button onClick={handlePasswordSubmit}>Submit</button>
          
          {passwordError && <p style={{ color: 'black' }}>{passwordError}</p>}
        </div>
          )}

          {decryptedNotes.length > 0 && (
                  <div className="retrieved-container">
                    <h3>Decrypted Notes:</h3>
                    <ul>
                      {decryptedNotes.map((decryptedNote, index) => (
                        <li key={index}>{decryptedNote.decryptedData}</li> 
                      ))}
                    </ul>
                  </div>
                )}
    </div>
  );
};

export default NotesPage;*/

import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/pages.css';

const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

const NotesPage = () => {
  const [note, setNote] = useState('');
  const [retrievedNotes, setRetrievedNotes] = useState([]);
  const [decryptedNotes, setDecryptedNotes] = useState([]);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showDecryptButton, setShowDecryptButton] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);

  const saveNoteHandler = async () => {
    if (!note.trim()) {
      toast.error('Note content cannot be empty', toastOptions);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('User is not authenticated', toastOptions);
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/notes/save',
        { content: note },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message || 'Note saved successfully', toastOptions);
      setNote('');
    } catch (error) {
      toast.error('Failed to save the note', toastOptions);
    }
  };

  const retrieveNotesHandler = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('User is not authenticated', toastOptions);
        return;
      }

      const response = await axios.get('http://localhost:5000/api/notes/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRetrievedNotes(response.data || []);
      setDecryptedNotes([]);
      setShowDecryptButton(true);
      setShowPasswordField(false);
      toast.success('Encrypted notes retrieved successfully.', toastOptions);
    } catch (error) {
      toast.error('Failed to retrieve notes', toastOptions);
    }
  };

  const showPasswordFieldHandler = () => {
    setShowDecryptButton(false);
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
        'http://localhost:5000/api/notes/decrypt',
        { username, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.decryptedNotes) {
        setDecryptedNotes(response.data.decryptedNotes);
        setPasswordError('');
        setRetrievedNotes([]);
        setShowPasswordField(false);
        toast.success('Notes decrypted successfully.', toastOptions);
      } else {
        setPasswordError('Invalid username or password! Please try again.');
      }
    } catch (error) {
      setPasswordError('Error occurred while decrypting notes.');
    }
  };

  return (
    <div className="page-container">
      <ToastContainer /> {/* Toast notification container */}
      <h2>Save and Retrieve Notes</h2>
      <textarea
        value={note}
        name="note"
        onChange={(e) => {
          setNote(e.target.value);
          setRetrievedNotes([]);
          setShowDecryptButton(false);
          setShowPasswordField(false);
        }}
        placeholder="Enter your note"
      />
      <button onClick={saveNoteHandler}>Save</button>
      <button onClick={retrieveNotesHandler}>Retrieve Notes</button>

      {retrievedNotes.length > 0 && (
        <div className="retrieved-container">
          <h3>Retrieved Encrypted Notes:</h3>
          <ul>
            {retrievedNotes.map((retrievedNote, index) => (
              <li key={index}>{retrievedNote.content}</li>
            ))}
          </ul>
          {showDecryptButton && <button onClick={showPasswordFieldHandler}>Decrypt Notes</button>}
        </div>
      )}

      {showPasswordField && (
        <div>
          <h3>Enter Username and Password to Decrypt Notes</h3>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handlePasswordSubmit}>Submit</button>
          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        </div>
      )}

      {decryptedNotes.length > 0 && (
        <div className="retrieved-container">
          <h3>Decrypted Notes:</h3>
          <ul>
            {decryptedNotes.map((decryptedNote, index) => (
              <li key={index}>{decryptedNote.decryptedData}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotesPage;





import Password from '../models/password.js';
import User from '../models/user.js';
import { encryptData, decryptData } from '../middleware/encryption.js';
import bcrypt from 'bcrypt';

const savePassword = async (req, res) => {
  const { title, content } = req.body; // Get title and content from request body
  try {
    const encryptedPassword = encryptData(content);
    const password = new Password({
      userId: req.user._id,
      title, // Save the title
      content: encryptedPassword.encryptedData,
      iv: encryptedPassword.iv,
    });

    await password.save();
    return res.json({ success: true, message: 'Password saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ userId: req.user._id });
    if (!passwords || passwords.length === 0) {
      return res.status(404).json({ message: 'No passwords found' });
    }

    // Decrypt passwords and include titles
    const decryptedPasswords = passwords.map((password) => {
      const decryptedData = decryptData(password.content, password.iv);
      return { ...password.toObject(), decryptedData };
    });

    res.status(200).json(decryptedPasswords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const decryptPasswords = async (req, res) => {
  //const { username,password } = req.body;

  try {
    const { username,password } = req.body;
    const user = await User.findOne({username}); 
    // Find the user by ID
    console.log("users",user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify password with bcrypt
    //const hashedpassword = await bcrypt.hash(password, 10);
    console.log("p",password)
    console.log("up",user.password)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Decrypt links if password matches
    const passwords = await Password.find({ userId: req.user._id });

    if (!passwords || passwords.length === 0) {
      return res.status(404).json({ message: "No passwords found" });
    }

    const decryptedPasswords = passwords.map(password => {
      const decryptedData = decryptData(password.content, password.iv);
      return { ...password.toObject(), decryptedData };
    });

    res.status(200).json({ success: true, decryptedPasswords });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export { savePassword, getPasswords ,decryptPasswords};

import Link from '../models/link.js';
import User from '../models/user.js';
import { encryptData, decryptData } from '../middleware/encryption.js';
import bcrypt from 'bcrypt';

// Save a new link
const saveLink = async (req, res) => {
  const { content } = req.body;
  const { url } = req.body;  // Assuming URL is the only field
  try {
    const encryptedLink = encryptData(content);
    const link = new Link({
      userId: req.user._id,
      content: encryptedLink.encryptedData,
      iv: encryptedLink.iv,
    });
    await link.save();
     return res.json({ success: true, message: 'Link saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all links for the authenticated user
const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ userId: req.user._id });

    if (!links || links.length === 0) {
      return res.status(404).json({ message: 'No links found' });
    }

    const decryptedLinks = links.map(link => {
      const decryptedData = decryptData(link.content, link.iv);
      return {...link.toObject(),decryptedData };
    });

    res.status(200).json(decryptedLinks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Decrypt links based on password
const decryptLinks = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify password with bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Get the links for the user
    const links = await Link.find({ userId: req.user._id });

    if (!links || links.length === 0) {
      return res.status(404).json({ message: 'No links found' });
    }

    // Decrypt the links
    const decryptedLinks = links.map(link => {
      const decryptedData = decryptData(link.content, link.iv);
      return { ...link.toObject(), decryptedData };
    });

    res.status(200).json({ success: true, decryptedLinks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
      
export { saveLink, getLinks, decryptLinks };


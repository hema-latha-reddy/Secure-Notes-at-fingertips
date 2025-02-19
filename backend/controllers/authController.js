import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

// Register User
const registerUser = async (req, res) => {
  try {
    const { username, password,email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword ,email});
    await user.save();

    res.status(200).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({ success: false, error: 'Wrong Password' });
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_TOKEN,
      { expiresIn: '10d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: { _id: user._id, username: user.username },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};




// Change Password
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Validate the new password and confirm password
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, error: 'New password and confirm password do not match' });
    }

    // Extract user from token
    const token = req.headers.authorization.split(' ')[1]; // Bearer token
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN); // Decode the token

    if (!decodedToken) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const user = await User.findById(decodedToken._id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Check if old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Incorrect old password' });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const verify = (req, res) => {
  res.status(200).json({ success: true, message: 'Welcome to your dashboard!', user: req.user });
};



export { registerUser, loginUser, verify ,changePassword};


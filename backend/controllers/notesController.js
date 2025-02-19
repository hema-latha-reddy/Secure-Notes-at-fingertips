import  Note from '../models/notes.js';
import User from '../models/user.js';
import  { encryptData, decryptData }  from '../middleware/encryption.js';
import bcrypt from 'bcrypt';

const saveNote = async (req, res) => {
  const { content } = req.body;
  try {
    const encryptedNote = encryptData(content);
    const note = new Note({userId: req.user._id ,content: encryptedNote.encryptedData, iv: encryptedNote.iv,});
    await note.save();
    res.json({ success:true,message: 'Note saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id });

    //console.log(notes)
    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: "No notes found" });
    }

    const decryptedNotes = notes.map(note => {
      const decryptedData  = decryptData(note.content,note.iv);

      return { ...note.toObject(),decryptedData}
  });

    res.status(200).json(decryptedNotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const decryptNotes = async (req, res) => {
  

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
    const notes = await Note.find({ userId: req.user._id });

    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: "No notes found" });
    }

    const decryptedNotes = notes.map(note => {
      const decryptedData = decryptData(note.content, note.iv);
      return { ...note.toObject(), decryptedData };
    });

    res.status(200).json({ success: true, decryptedNotes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export {saveNote,getNotes,decryptNotes};


import mongoose from 'mongoose';

const passwordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true }, // New title field
  content: { type: String, required: true }, // Encrypted password
  iv: { type: String, required: true }, // IV for decryption
});

const Password = mongoose.model('Password', passwordSchema);

export default Password;


import express from 'express';

import { saveNote, getNotes,decryptNotes } from '../controllers/notesController.js';
import verifyUser from '../middleware/authenticate.js';
const router = express.Router();
router.post('/save',verifyUser,saveNote);
router.get('/all', verifyUser,getNotes);
router.post('/decrypt',verifyUser,decryptNotes);


export default router;

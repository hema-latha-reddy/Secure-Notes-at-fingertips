import express from 'express';

import { savePassword, getPasswords ,decryptPasswords} from '../controllers/passwordController.js';
import verifyUser from '../middleware/authenticate.js';
const router = express.Router();
router.post('/save',verifyUser,savePassword);
router.get('/all', verifyUser,getPasswords);
router.post('/decrypt',verifyUser,decryptPasswords);

export default router;

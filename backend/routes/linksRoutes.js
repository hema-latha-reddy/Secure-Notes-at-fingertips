import express from 'express';

import { saveLink, getLinks, decryptLinks } from '../controllers/linksController.js';
import verifyUser from '../middleware/authenticate.js';
const router = express.Router();
router.post('/save',verifyUser,saveLink);
router.get('/all', verifyUser,getLinks);
router.post('/decrypt',verifyUser,decryptLinks);

export default router;

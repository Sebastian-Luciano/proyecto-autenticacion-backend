import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';
import { upload } from '../config/multerConfig.js';

const router = express.Router();

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, upload.single('photo'), updateProfile);

export default router;
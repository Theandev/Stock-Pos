import express from 'express';
import { googleSignIn, registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Google sign-in
router.post('/google', googleSignIn);

// Email/password auth
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;




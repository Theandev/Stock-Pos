import express from 'express';
import { googleSignIn } from '../controllers/authController.js';

const router = express.Router();

// Google-only authentication.
router.post('/google', googleSignIn);

// Explicitly block non-Google auth endpoints.
router.post('/register', (req, res) => res.status(405).json({ error: 'Google-only authentication' }));
router.post('/login', (req, res) => res.status(405).json({ error: 'Google-only authentication' }));

export default router;



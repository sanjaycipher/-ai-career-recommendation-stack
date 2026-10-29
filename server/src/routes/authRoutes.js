import { Router } from 'express';
import { register, login, me } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Registration endpoint
router.post('/register', register);

// Login endpoint
router.post('/login', login);

// Authenticated user profile endpoint (Protected)
router.get('/me', authenticate, me);

export default router;

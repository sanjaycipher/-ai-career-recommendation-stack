import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  createRecommendation,
  listRecommendations,
  getRecommendation,
  getMetaOptions,
} from '../controllers/recommendationController.js';

const router = Router();

// POST /api/recommend - Calculate & persist recommendation run
router.post('/recommend', authenticate, createRecommendation);

// GET /api/recommendations - List recommendation history for logged-in user
router.get('/recommendations', authenticate, listRecommendations);

// GET /api/recommendations/:id - Retrieve single recommendation details
router.get('/recommendations/:id', authenticate, getRecommendation);

// GET /api/meta/options - Master options list (skills, interests, subjects, experience)
router.get('/meta/options', authenticate, getMetaOptions);

export default router;


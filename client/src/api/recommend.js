import client from './client.js';

/**
 * POST /api/recommend
 * @param {{ skills: string[], interests: string[], subjects: string[], experience: string }} payload
 */
export const createRecommendation = async (payload) => {
  const response = await client.post('/recommend', payload);
  return response.data.data;
};

/**
 * GET /api/recommendations/:id
 */
export const getRecommendation = async (id) => {
  const response = await client.get(`/recommendations/${id}`);
  return response.data.data;
};

/**
 * GET /api/recommendations?page=1&limit=10
 */
export const listRecommendations = async ({ page = 1, limit = 10 } = {}) => {
  const response = await client.get('/recommendations', { params: { page, limit } });
  return response.data.data;
};


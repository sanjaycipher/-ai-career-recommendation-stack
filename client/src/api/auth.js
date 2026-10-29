import apiClient from './client.js';

/**
 * Register a new user account.
 * POST /api/auth/register
 * @returns {Promise<{ token: string, user: object }>}
 */
export const register = async ({ name, email, password }) => {
  const response = await apiClient.post('/auth/register', {
    name,
    email,
    password,
  });
  return response.data.data;
};

/**
 * Log in with existing email and password.
 * POST /api/auth/login
 * @returns {Promise<{ token: string, user: object }>}
 */
export const login = async ({ email, password }) => {
  const response = await apiClient.post('/auth/login', {
    email,
    password,
  });
  return response.data.data;
};

/**
 * Fetch current authenticated user's profile.
 * GET /api/auth/me
 * @returns {Promise<object>}
 */
export const me = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data.data.user;
};

export default {
  register,
  login,
  me,
};


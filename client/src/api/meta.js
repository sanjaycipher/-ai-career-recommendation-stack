import apiClient from './client.js';

/**
 * Fetch master options for career recommendation form chips and select inputs.
 * GET /api/meta/options
 * @returns {Promise<{ skills: Array, interests: Array, subjects: Array, experience_options: Array }>}
 */
export const getMetaOptions = async () => {
  const response = await apiClient.get('/meta/options');
  return response.data.data;
};

export default {
  getMetaOptions,
};


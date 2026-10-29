import axios from 'axios';

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://127.0.0.1:8000';
const TIMEOUT_MS = 15000;

const client = axios.create({
  baseURL: ML_SERVICE_URL,
  timeout: TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Handle Axios errors and map them to typed application errors.
 */
function handleAxiosError(error) {
  // Connection refused or host not reachable
  if (
    error.code === 'ECONNREFUSED' ||
    error.code === 'ENOTFOUND' ||
    error.code === 'EHOSTUNREACH' ||
    error.code === 'ECONNRESET'
  ) {
    const err = new Error('Recommendation engine is not reachable. Please try again shortly.');
    err.code = 'ML_SERVICE_UNAVAILABLE';
    err.status = 503;
    throw err;
  }

  // Request timeout
  if (error.code === 'ECONNABORTED' || (error.message && error.message.includes('timeout'))) {
    const err = new Error('Recommendation engine request timed out.');
    err.code = 'ML_SERVICE_ERROR';
    err.status = 502;
    throw err;
  }

  // HTTP response returned by ML Service
  if (error.response) {
    const statusCode = error.response.status;
    const responseData = error.response.data;
    const mlErrorMessage =
      responseData?.error ||
      responseData?.detail ||
      (typeof responseData === 'string' ? responseData : 'ML service validation error');

    if (statusCode >= 400 && statusCode < 500) {
      const err = new Error(typeof mlErrorMessage === 'string' ? mlErrorMessage : JSON.stringify(mlErrorMessage));
      err.code = 'ML_VALIDATION_ERROR';
      err.status = 400;
      throw err;
    }

    if (statusCode >= 500) {
      const err = new Error(typeof mlErrorMessage === 'string' ? mlErrorMessage : 'ML service internal server error');
      err.code = 'ML_SERVICE_ERROR';
      err.status = 502;
      throw err;
    }
  }

  // Catch-all network / unknown error
  const fallbackErr = new Error(error.message || 'ML service request failed');
  fallbackErr.code = 'ML_SERVICE_ERROR';
  fallbackErr.status = 502;
  throw fallbackErr;
}

/**
 * Check health status of ML Service.
 */
export const checkHealth = async () => {
  try {
    const res = await client.get('/health');
    return {
      healthy: res.status === 200 && res.data?.status === 'healthy',
      status: res.data,
    };
  } catch (error) {
    return {
      healthy: false,
      status: error.message,
    };
  }
};

/**
 * Fetch transparent scoring weights and experience mapping.
 */
export const getWeights = async () => {
  try {
    const res = await client.get('/weights');
    return res.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

/**
 * Send student profile and career data to ML engine for scoring.
 * Returns the parsed response data object { recommendations, input_echo }.
 */
export const requestRecommendations = async (payload) => {
  try {
    const res = await client.post('/recommend', payload);
    return res.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export default {
  checkHealth,
  getWeights,
  requestRecommendations,
};


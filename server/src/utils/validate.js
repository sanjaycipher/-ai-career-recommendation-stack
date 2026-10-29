/**
 * Check if required fields exist and are non-empty in request body
 * @param {object} body - Request body
 * @param {string[]} fields - Array of required field names
 * @returns {string|null} - Error message if missing or invalid, otherwise null
 */
export const validateRequiredFields = (body, fields) => {
  if (!body || typeof body !== 'object') {
    return 'Request body must be a valid JSON object';
  }

  for (const field of fields) {
    const val = body[field];
    if (val === undefined || val === null || (typeof val === 'string' && val.trim() === '')) {
      return `Field '${field}' is required`;
    }
  }

  return null;
};

/**
 * Validate standard email format
 * @param {string} email - Email to test
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validate registration input payload
 * @param {object} data - { name, email, password }
 * @returns {string|null} - Readable error message or null if valid
 */
export const validateRegisterInput = (data) => {
  const missingError = validateRequiredFields(data, ['name', 'email', 'password']);
  if (missingError) return missingError;

  const { name, email, password } = data;

  if (typeof name !== 'string' || name.trim().length < 2) {
    return 'Name must be at least 2 characters long';
  }

  if (!isValidEmail(email)) {
    return 'Please provide a valid email address';
  }

  if (typeof password !== 'string' || password.length < 6) {
    return 'Password must be at least 6 characters long';
  }

  return null;
};

/**
 * Validate login input payload
 * @param {object} data - { email, password }
 * @returns {string|null} - Readable error message or null if valid
 */
export const validateLoginInput = (data) => {
  const missingError = validateRequiredFields(data, ['email', 'password']);
  if (missingError) return missingError;

  const { email, password } = data;

  if (!isValidEmail(email)) {
    return 'Please provide a valid email address';
  }

  if (typeof password !== 'string' || password.length === 0) {
    return 'Password is required';
  }

  return null;
};

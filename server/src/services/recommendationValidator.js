const VALID_EXPERIENCE_LEVELS = new Set([
  'internship',
  '0-1',
  '1-3',
  '3-plus',
  'any',
]);

/**
 * Trim strings, filter out blanks, and deduplicate case-insensitively while preserving order.
 */
function cleanAndDedupeStringArray(inputList, maxCharLength = 60) {
  if (!Array.isArray(inputList)) {
    return { list: [], error: 'Expected an array of strings' };
  }

  const seen = new Set();
  const cleaned = [];

  for (let idx = 0; idx < inputList.length; idx++) {
    const item = inputList[idx];
    if (typeof item !== 'string') {
      return { list: [], error: `Item at index ${idx} must be a string` };
    }

    const trimmed = item.trim();
    if (!trimmed) {
      continue;
    }

    if (trimmed.length > maxCharLength) {
      return {
        list: [],
        error: `Item "${trimmed.slice(0, 15)}..." exceeds max length of ${maxCharLength} characters`,
      };
    }

    const lower = trimmed.toLowerCase();
    if (!seen.has(lower)) {
      seen.add(lower);
      cleaned.push(trimmed);
    }
  }

  return { list: cleaned, error: null };
}

/**
 * Validate and sanitize student input payload for career recommendation.
 *
 * @param {object} body - Request body containing student attributes
 * @returns {{ sanitized: object|null, error: string|null }}
 */
export const validateStudentInput = (body) => {
  if (!body || typeof body !== 'object') {
    return { sanitized: null, error: 'Request body must be a valid JSON object' };
  }

  // Support either body.student (nested) or direct body
  const student = body.student && typeof body.student === 'object' ? body.student : body;

  // 1. Validate Skills (1 to 50 items)
  if (!student.skills || !Array.isArray(student.skills)) {
    return { sanitized: null, error: 'Student skills must be provided as an array of strings' };
  }

  const skillsRes = cleanAndDedupeStringArray(student.skills, 60);
  if (skillsRes.error) {
    return { sanitized: null, error: `Invalid skills: ${skillsRes.error}` };
  }

  if (skillsRes.list.length < 1) {
    return { sanitized: null, error: 'At least 1 valid skill must be provided' };
  }

  if (skillsRes.list.length > 50) {
    return { sanitized: null, error: 'Skills list cannot exceed 50 items' };
  }

  // 2. Validate Interests (0 to 20 items)
  const interestsRaw = student.interests || [];
  const interestsRes = cleanAndDedupeStringArray(interestsRaw, 60);
  if (interestsRes.error) {
    return { sanitized: null, error: `Invalid interests: ${interestsRes.error}` };
  }

  if (interestsRes.list.length > 20) {
    return { sanitized: null, error: 'Interests list cannot exceed 20 items' };
  }

  // 3. Validate Subjects (0 to 30 items)
  const subjectsRaw = student.subjects || [];
  const subjectsRes = cleanAndDedupeStringArray(subjectsRaw, 60);
  if (subjectsRes.error) {
    return { sanitized: null, error: `Invalid subjects: ${subjectsRes.error}` };
  }

  if (subjectsRes.list.length > 30) {
    return { sanitized: null, error: 'Subjects list cannot exceed 30 items' };
  }

  // 4. Validate Experience
  const expRaw = (student.experience || '0-1').toString().trim().toLowerCase();
  if (!VALID_EXPERIENCE_LEVELS.has(expRaw)) {
    return {
      sanitized: null,
      error: `Invalid experience level "${expRaw}". Must be one of: internship, 0-1, 1-3, 3-plus, any`,
    };
  }

  const sanitized = {
    skills: skillsRes.list,
    interests: interestsRes.list,
    subjects: subjectsRes.list,
    experience: expRaw,
  };

  return { sanitized, error: null };
};

export default {
  validateStudentInput,
};


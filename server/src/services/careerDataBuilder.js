import { Career, Skill, Interest, AcademicSubject } from '../models/index.js';

let cachedCareerPayload = null;
let lastCacheTimestamp = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds TTL

/**
 * Invalidate in-memory career cache (useful if career attributes change).
 */
export const invalidateCache = () => {
  cachedCareerPayload = null;
  lastCacheTimestamp = 0;
};

/**
 * Fetch and construct all 28 careers in the exact payload shape expected by the ML service.
 * Cached in-memory for 60 seconds to avoid unnecessary MySQL load.
 */
export const buildCareerPayload = async () => {
  const now = Date.now();
  if (cachedCareerPayload && now - lastCacheTimestamp < CACHE_TTL_MS) {
    return cachedCareerPayload;
  }

  const rawCareers = await Career.findAll({
    include: [
      {
        model: Skill,
        as: 'skills',
        through: { attributes: ['weight', 'is_missing_highlight'] },
      },
      {
        model: Interest,
        as: 'interests',
        through: { attributes: ['weight'] },
      },
      {
        model: AcademicSubject,
        as: 'subjects',
        through: { attributes: ['weight'] },
      },
    ],
    order: [['id', 'ASC']],
  });

  const formattedCareers = rawCareers.map((career) => {
    return {
      id: career.id,
      title: career.title,
      typical_work_experience: career.typical_work_experience || 'any',
      skills: (career.skills || []).map((skill) => ({
        name: skill.name,
        weight: Number(skill.CareerSkill?.weight || 0),
        is_missing_highlight: Boolean(skill.CareerSkill?.is_missing_highlight),
      })),
      interests: (career.interests || []).map((interest) => ({
        name: interest.name,
        weight: Number(interest.CareerInterest?.weight || 0),
      })),
      subjects: (career.subjects || []).map((subject) => ({
        name: subject.name,
        weight: Number(subject.CareerSubject?.weight || 0),
      })),
    };
  });

  cachedCareerPayload = formattedCareers;
  lastCacheTimestamp = now;

  return formattedCareers;
};

export default {
  buildCareerPayload,
  invalidateCache,
};


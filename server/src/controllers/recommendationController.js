import {
  sequelize,
  Recommendation,
  RecommendationResult,
  Career,
  Skill,
  Interest,
  AcademicSubject,
} from '../models/index.js';
import mlClient from '../services/mlClient.js';
import { buildCareerPayload } from '../services/careerDataBuilder.js';
import { validateStudentInput } from '../services/recommendationValidator.js';

/**
 * POST /api/recommend
 * Protected: Validates student input, fetches all careers, calls ML engine,
 * persists recommendation run in a database transaction, and returns ranked results.
 */
export const createRecommendation = async (req, res, next) => {
  const startTime = Date.now();
  try {
    // 1. Validate student input
    const { sanitized, error } = validateStudentInput(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error,
      });
    }

    // 2. Build full career catalog payload for ML service
    const careers = await buildCareerPayload();

    // 3. Request scoring from ML Service
    let mlResponse;
    try {
      mlResponse = await mlClient.requestRecommendations({
        student: sanitized,
        careers,
      });
    } catch (mlErr) {
      if (mlErr.code === 'ML_SERVICE_UNAVAILABLE') {
        return res.status(503).json({
          success: false,
          error: mlErr.message,
        });
      }
      if (mlErr.code === 'ML_VALIDATION_ERROR') {
        return res.status(400).json({
          success: false,
          error: mlErr.message,
        });
      }
      if (mlErr.code === 'ML_SERVICE_ERROR') {
        return res.status(502).json({
          success: false,
          error: mlErr.message,
        });
      }
      return res.status(500).json({
        success: false,
        error: mlErr.message || 'Error occurred while communicating with ML engine',
      });
    }

    const recommendations = mlResponse?.data?.recommendations || [];
    if (!recommendations.length) {
      return res.status(502).json({
        success: false,
        error: 'Recommendation engine returned an empty result set',
      });
    }

    const topPick = recommendations[0];

    // 4. Persist to MySQL within a transaction
    const transaction = await sequelize.transaction();
    let recommendationRecord;

    try {
      recommendationRecord = await Recommendation.create(
        {
          user_id: req.user.id,
          input_snapshot: sanitized,
          top_career_title: topPick.career_title,
          top_match_percent: topPick.match_percent,
        },
        { transaction }
      );

      const resultRows = recommendations.map((rec) => ({
        recommendation_id: recommendationRecord.id,
        career_id: rec.career_id,
        rank: rec.rank,
        match_percent: rec.match_percent,
        matched_skills: rec.matched_skills || [],
        missing_skills: rec.missing_skills || [],
        explanation: null,
        gap_summary: {
          ...(rec.gap_summary || {}),
          sub_scores: rec.sub_scores,
          match_tier: rec.match_tier,
        },
      }));

      await RecommendationResult.bulkCreate(resultRows, { transaction });
      await transaction.commit();
    } catch (dbError) {
      await transaction.rollback();
      throw dbError;
    }

    // 5. Structured logging (no PII, no full payload)
    const durationMs = Date.now() - startTime;
    console.log(
      `[Recommendation] user_id=${req.user.id}, skills_count=${sanitized.skills.length}, top_career="${topPick.career_title}", top_match=${topPick.match_percent}%, duration=${durationMs}ms`
    );

    // 6. Return response
    return res.status(201).json({
      success: true,
      data: {
        recommendation_id: recommendationRecord.id,
        created_at: recommendationRecord.createdAt,
        top_career: {
          career_id: topPick.career_id,
          title: topPick.career_title,
          career_title: topPick.career_title,
          match_percent: topPick.match_percent,
          match_tier: topPick.match_tier,
        },
        results: recommendations,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/recommendations
 * Protected: Returns paginated history of recommendation runs for the logged-in user.
 */
export const listRecommendations = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const offset = (page - 1) * limit;

    const { count, rows } = await Recommendation.findAndCountAll({
      where: { user_id: req.user.id },
      order: [['created_at', 'DESC']],
      limit,
      offset,
      attributes: [
        'id',
        'created_at',
        'top_career_title',
        'top_match_percent',
        'input_snapshot',
      ],
    });

    const formattedRecs = rows.map((r) => ({
      id: r.id,
      created_at: r.createdAt,
      top_career_title: r.top_career_title,
      top_match_percent: r.top_match_percent,
      input_snapshot: r.input_snapshot,
    }));

    return res.status(200).json({
      success: true,
      data: {
        total: count,
        page,
        limit,
        pages: Math.ceil(count / limit) || 1,
        items: formattedRecs,
        recommendations: formattedRecs,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/recommendations/:id
 * Protected: Returns single recommendation details with full joined career results.
 */
export const getRecommendation = async (req, res, next) => {
  try {
    const recId = parseInt(req.params.id, 10);
    if (isNaN(recId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid recommendation ID parameter',
      });
    }

    const recommendation = await Recommendation.findOne({
      where: {
        id: recId,
        user_id: req.user.id,
      },
      include: [
        {
          model: RecommendationResult,
          as: 'results',
          include: [
            {
              model: Career,
              as: 'career',
              attributes: ['id', 'title'],
            },
          ],
        },
      ],
      order: [[{ model: RecommendationResult, as: 'results' }, 'rank', 'ASC']],
    });

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        error: 'Recommendation not found',
      });
    }

    const formattedResults = (recommendation.results || []).map((resItem) => {
      const rawGapSummary = resItem.gap_summary || {};
      const matchTier = rawGapSummary.match_tier || 'explore';
      const subScores = rawGapSummary.sub_scores || null;

      const cleanGapSummary = {
        core_gaps: rawGapSummary.core_gaps || [],
        secondary_gaps: rawGapSummary.secondary_gaps || [],
        core_gap_count: rawGapSummary.core_gap_count || 0,
        secondary_gap_count: rawGapSummary.secondary_gap_count || 0,
      };

      return {
        career_id: resItem.career_id,
        career_title: resItem.career?.title || '',
        rank: resItem.rank,
        match_percent: resItem.match_percent,
        match_tier: matchTier,
        matched_skills: resItem.matched_skills || [],
        missing_skills: resItem.missing_skills || [],
        gap_summary: cleanGapSummary,
        sub_scores: subScores,
      };
    });

    return res.status(200).json({
      success: true,
      data: {
        id: recommendation.id,
        created_at: recommendation.createdAt,
        input_snapshot: recommendation.input_snapshot,
        results: formattedResults,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/meta/options
 * Protected: Returns master list of skills, interests, academic subjects, and experience options.
 */
export const getMetaOptions = async (req, res, next) => {
  try {
    const [skills, interests, subjects] = await Promise.all([
      Skill.findAll({
        attributes: ['id', 'name', 'category'],
        order: [['name', 'ASC']],
      }),
      Interest.findAll({
        attributes: ['id', 'name'],
        order: [['name', 'ASC']],
      }),
      AcademicSubject.findAll({
        attributes: ['id', 'name', 'category'],
        order: [['name', 'ASC']],
      }),
    ]);

    const experience_options = [
      { value: 'internship', label: 'Internship / Fresher' },
      { value: '0-1', label: '0–1 year' },
      { value: '1-3', label: '1–3 years' },
      { value: '3-plus', label: '3+ years' },
      { value: 'any', label: 'Any' },
    ];

    return res.status(200).json({
      success: true,
      data: {
        skills,
        interests,
        subjects,
        experience_options,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createRecommendation,
  listRecommendations,
  getRecommendation,
  getMetaOptions,
};

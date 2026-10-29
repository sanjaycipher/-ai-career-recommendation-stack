import { Sequelize } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Skill from './Skill.js';
import Career from './Career.js';
import CareerSkill from './CareerSkill.js';
import Interest from './Interest.js';
import CareerInterest from './CareerInterest.js';
import AcademicSubject from './AcademicSubject.js';
import CareerSubject from './CareerSubject.js';
import Recommendation from './Recommendation.js';
import RecommendationResult from './RecommendationResult.js';

// Career <-> Skill Many-to-Many
Career.belongsToMany(Skill, {
  through: CareerSkill,
  foreignKey: 'career_id',
  otherKey: 'skill_id',
  as: 'skills',
});
Skill.belongsToMany(Career, {
  through: CareerSkill,
  foreignKey: 'skill_id',
  otherKey: 'career_id',
  as: 'careers',
});

// CareerSkill direct associations
Career.hasMany(CareerSkill, { foreignKey: 'career_id', as: 'career_skills' });
CareerSkill.belongsTo(Career, { foreignKey: 'career_id', as: 'career' });
Skill.hasMany(CareerSkill, { foreignKey: 'skill_id', as: 'career_skills' });
CareerSkill.belongsTo(Skill, { foreignKey: 'skill_id', as: 'skill' });

// Career <-> Interest Many-to-Many
Career.belongsToMany(Interest, {
  through: CareerInterest,
  foreignKey: 'career_id',
  otherKey: 'interest_id',
  as: 'interests',
});
Interest.belongsToMany(Career, {
  through: CareerInterest,
  foreignKey: 'interest_id',
  otherKey: 'career_id',
  as: 'careers',
});

// CareerInterest direct associations
Career.hasMany(CareerInterest, { foreignKey: 'career_id', as: 'career_interests' });
CareerInterest.belongsTo(Career, { foreignKey: 'career_id', as: 'career' });
Interest.hasMany(CareerInterest, { foreignKey: 'interest_id', as: 'career_interests' });
CareerInterest.belongsTo(Interest, { foreignKey: 'interest_id', as: 'interest' });

// Career <-> AcademicSubject Many-to-Many
Career.belongsToMany(AcademicSubject, {
  through: CareerSubject,
  foreignKey: 'career_id',
  otherKey: 'subject_id',
  as: 'subjects',
});
AcademicSubject.belongsToMany(Career, {
  through: CareerSubject,
  foreignKey: 'subject_id',
  otherKey: 'career_id',
  as: 'careers',
});

// CareerSubject direct associations
Career.hasMany(CareerSubject, { foreignKey: 'career_id', as: 'career_subjects' });
CareerSubject.belongsTo(Career, { foreignKey: 'career_id', as: 'career' });
AcademicSubject.hasMany(CareerSubject, { foreignKey: 'subject_id', as: 'career_subjects' });
CareerSubject.belongsTo(AcademicSubject, { foreignKey: 'subject_id', as: 'subject' });

// User <-> Recommendation One-to-Many
User.hasMany(Recommendation, { foreignKey: 'user_id', as: 'recommendations' });
Recommendation.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Recommendation <-> RecommendationResult One-to-Many
Recommendation.hasMany(RecommendationResult, {
  foreignKey: 'recommendation_id',
  as: 'results',
});
RecommendationResult.belongsTo(Recommendation, {
  foreignKey: 'recommendation_id',
  as: 'recommendation',
});

// RecommendationResult <-> Career Many-to-One
RecommendationResult.belongsTo(Career, {
  foreignKey: 'career_id',
  as: 'career',
});
Career.hasMany(RecommendationResult, {
  foreignKey: 'career_id',
  as: 'recommendation_results',
});

const db = {
  sequelize,
  Sequelize,
  User,
  Skill,
  Career,
  CareerSkill,
  Interest,
  CareerInterest,
  AcademicSubject,
  CareerSubject,
  Recommendation,
  RecommendationResult,
};

export {
  sequelize,
  Sequelize,
  User,
  Skill,
  Career,
  CareerSkill,
  Interest,
  CareerInterest,
  AcademicSubject,
  CareerSubject,
  Recommendation,
  RecommendationResult,
};

export default db;

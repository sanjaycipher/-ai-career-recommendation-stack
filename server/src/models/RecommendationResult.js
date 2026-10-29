import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class RecommendationResult extends Model {}

RecommendationResult.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    recommendation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'recommendations',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    career_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'careers',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    match_percent: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
    matched_skills: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    missing_skills: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    explanation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    gap_summary: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: 'Stores { core_gaps, secondary_gaps, core_gap_count, secondary_gap_count, sub_scores, match_tier }',
    },
  },
  {
    sequelize,
    modelName: 'RecommendationResult',
    tableName: 'recommendation_results',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['recommendation_id', 'career_id'],
        name: 'recommendation_results_rec_career_unique',
      },
    ],
  }
);

export default RecommendationResult;

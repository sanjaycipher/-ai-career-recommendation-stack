import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class CareerSkill extends Model {}

CareerSkill.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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
    skill_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'skills',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0.1,
        max: 3.0,
      },
    },
    is_missing_highlight: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'CareerSkill',
    tableName: 'career_skills',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['career_id', 'skill_id'],
        name: 'career_skills_career_skill_unique',
      },
    ],
  }
);

export default CareerSkill;

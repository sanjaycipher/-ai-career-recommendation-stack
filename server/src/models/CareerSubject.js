import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class CareerSubject extends Model {}

CareerSubject.init(
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
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'academic_subjects',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0.1,
        max: 2.0,
      },
    },
  },
  {
    sequelize,
    modelName: 'CareerSubject',
    tableName: 'career_subjects',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['career_id', 'subject_id'],
        name: 'career_subjects_career_subject_unique',
      },
    ],
  }
);

export default CareerSubject;

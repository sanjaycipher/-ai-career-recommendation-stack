import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class AcademicSubject extends Model {}

AcademicSubject.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: {
        name: 'academic_subjects_name_unique',
        msg: 'Academic subject name must be unique',
      },
      validate: {
        notEmpty: {
          msg: 'Subject name cannot be empty',
        },
      },
    },
    category: {
      type: DataTypes.ENUM('core_cs', 'math', 'science', 'engineering', 'elective', 'other'),
      allowNull: false,
      defaultValue: 'core_cs',
      validate: {
        isIn: {
          args: [['core_cs', 'math', 'science', 'engineering', 'elective', 'other']],
          msg: 'Invalid academic subject category',
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'AcademicSubject',
    tableName: 'academic_subjects',
    timestamps: true,
    underscored: true,
  }
);

export default AcademicSubject;

import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Skill extends Model {}

Skill.init(
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
        name: 'skills_name_unique',
        msg: 'Skill name must be unique',
      },
      validate: {
        notEmpty: {
          msg: 'Skill name cannot be empty',
        },
      },
    },
    category: {
      type: DataTypes.ENUM(
        'language',
        'frontend',
        'backend',
        'database',
        'devops',
        'cloud',
        'ai_ml',
        'design',
        'testing',
        'soft',
        'other'
      ),
      allowNull: false,
      validate: {
        isIn: {
          args: [[
            'language',
            'frontend',
            'backend',
            'database',
            'devops',
            'cloud',
            'ai_ml',
            'design',
            'testing',
            'soft',
            'other',
          ]],
          msg: 'Invalid skill category',
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'Skill',
    tableName: 'skills',
    timestamps: true,
    underscored: true,
  }
);

export default Skill;

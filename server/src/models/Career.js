import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Career extends Model {}

Career.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: {
        name: 'careers_title_unique',
        msg: 'Career title must be unique',
      },
      validate: {
        notEmpty: {
          msg: 'Career title cannot be empty',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Career description cannot be empty',
        },
      },
    },
    typical_work_experience: {
      type: DataTypes.ENUM('internship', '0-1', '1-3', '3-plus', 'any'),
      allowNull: false,
      defaultValue: 'any',
      validate: {
        isIn: {
          args: [['internship', '0-1', '1-3', '3-plus', 'any']],
          msg: 'Invalid typical work experience value',
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'Career',
    tableName: 'careers',
    timestamps: true,
    underscored: true,
  }
);

export default Career;

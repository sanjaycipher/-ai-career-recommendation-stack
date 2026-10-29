import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Recommendation extends Model {}

Recommendation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    input_snapshot: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Input snapshot is required',
        },
      },
    },
    top_career_title: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    top_match_percent: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Recommendation',
    tableName: 'recommendations',
    timestamps: true,
    underscored: true,
  }
);

export default Recommendation;

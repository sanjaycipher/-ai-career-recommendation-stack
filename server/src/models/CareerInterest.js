import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class CareerInterest extends Model {}

CareerInterest.init(
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
    interest_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'interests',
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
    modelName: 'CareerInterest',
    tableName: 'career_interests',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['career_id', 'interest_id'],
        name: 'career_interests_career_interest_unique',
      },
    ],
  }
);

export default CareerInterest;

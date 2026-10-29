import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Interest extends Model {}

Interest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: {
        name: 'interests_name_unique',
        msg: 'Interest name must be unique',
      },
      validate: {
        notEmpty: {
          msg: 'Interest name cannot be empty',
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'Interest',
    tableName: 'interests',
    timestamps: true,
    underscored: true,
  }
);

export default Interest;

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbHost = process.env.DB_HOST || '127.0.0.1';
const dbPort = parseInt(process.env.DB_PORT || '3307', 10);
const dbName = process.env.DB_NAME || 'career_db';
const dbUser = process.env.DB_USER || 'career_user';
const dbPassword = process.env.DB_PASSWORD || 'career_pass';
const isDev = process.env.NODE_ENV !== 'production';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
  logging: isDev ? (msg) => console.log(`[Sequelize SQL] ${msg}`) : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: true,
  },
});

export default sequelize;

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';
import authRoutes from './routes/authRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const isDev = process.env.NODE_ENV !== 'production';

// CORS configuration - only allow CLIENT_ORIGIN
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// JSON body parser
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'healthy',
      service: 'career-recommender-server',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    },
  });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Recommendation routes
app.use('/api', recommendationRoutes);

// 404 Not Found Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: `Resource not found: ${req.method} ${req.originalUrl}`,
  });
});

// Central Error Handler
app.use((err, req, res, next) => {
  console.error('[CentralErrorHandler]', err);

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message,
  });
});

// Server bootstrap
const startServer = async () => {
  try {
    const dbHost = process.env.DB_HOST || '127.0.0.1';
    const dbName = process.env.DB_NAME || 'career_db';

    // Verify database connection
    await sequelize.authenticate();
    console.log(`[Sequelize] Database connection established successfully: Host='${dbHost}', Database='${dbName}'`);

    // Synchronize models ONLY in development environment
    if (isDev) {
      await sequelize.sync();
      console.log('[Sequelize] Running in DEVELOPMENT mode: sequelize.sync() executed successfully.');
    } else {
      console.log('[Sequelize] Running in PRODUCTION mode: sequelize.sync() skipped (use migrations).');
    }

    // Start Express server
    app.listen(PORT, () => {
      console.log(`[Express] Server is listening on port ${PORT}`);
      console.log(`[Express] Health check URL: http://localhost:${PORT}/api/health`);
      console.log(`[Express] Allowed CORS Origin: ${CLIENT_ORIGIN}`);
    });
  } catch (error) {
    console.error(`[BootstrapError] Failed to connect to the database or start server:`, error.message);
    process.exit(1);
  }
};

startServer();

export default app;

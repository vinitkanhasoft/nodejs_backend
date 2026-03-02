import { app } from './app.ts';          // ← include .ts extension
import { connectDatabase } from './config/database.ts';
import { logger } from './config/logger.ts';
import { config } from './config/env.ts';
import dotenv from 'dotenv';

dotenv.config();

const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(config.app.port, () => {
      logger.info(`Server running on http://localhost:${config.app.port}`);
      logger.info(`Environment: ${config.app.nodeEnv}`);
    });
  } catch (err) {
    logger.error('Failed to start server', err);
    process.exit(1);
  }
};

startServer();
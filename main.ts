import { app } from './app';
import { connectDatabase } from './config/database';
import { logger } from './config/logger';
import { config } from './config/env';
import dotenv from 'dotenv';
import "./utils/global-debug";

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

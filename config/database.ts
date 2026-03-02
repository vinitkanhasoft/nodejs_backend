import mongoose from 'mongoose';
import { logger } from './logger.ts';
import { config } from './env.ts';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(config.database.uri);
    logger.info('MongoDB connected successfully.');
  } catch (err) {
    logger.error('MongoDB connection failed', err);
    process.exit(1);
  }
};
import mongoose from 'mongoose';
import { logger } from './logger';
import { env } from './env';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    logger.info('MongoDB connected successfully.');
  } catch (err) {
    logger.error('MongoDB connection failed', err);
    process.exit(1);
  }
};
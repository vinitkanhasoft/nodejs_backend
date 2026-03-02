import mongoose from 'mongoose';
import { logger } from '../../config/logger';
import { UserModel } from '../../modules/auth/infrastructure/schemas/user.schema';
import { CarModel } from '../../modules/car/infrastructure/schemas/car.schema';

export const createIndexes = async () => {
  try {
    await UserModel.createIndexes();
    await CarModel.createIndexes();
    logger.info('All indexes created successfully');
  } catch (err) {
    logger.error('Error creating indexes', err);
  }
};

import { CarModel } from '../modules/car/infrastructure/schemas/car.schema';
import { logger } from '../config/logger';
import cron from 'node-cron';

export const scheduleAnalyticsJob = () => {
  // Run every hour
  cron.schedule('0 * * * *', async () => {
    try {
      // Example: compute car price analytics
      const analytics = await CarModel.aggregate([
        {
          $group: {
            _id: '$brand',
            avgPrice: { $avg: '$price' },
            totalCars: { $sum: 1 }
          }
        },
      ]);
      logger.info('Car analytics updated:', JSON.stringify(analytics));
      // You can store analytics in a collection or cache
    } catch (err) {
      logger.error('Analytics job failed', err);
    }
  });
};
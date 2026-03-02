import { cloudinary } from '../config/cloudinary';
import { logger } from '../config/logger';
import { Queue } from '../shared/queue/queue';

export const processImageJob = async () => {
  Queue.process('image', async (job: any) => {
    try {
      const { filePath, folder } = job.data;
      const result = await cloudinary.uploader.upload(filePath, { folder });
      logger.info(`Image uploaded to Cloudinary: ${result.secure_url}`);
      return result.secure_url;
    } catch (err) {
      logger.error('Image job failed', err);
      throw err;
    }
  });
};
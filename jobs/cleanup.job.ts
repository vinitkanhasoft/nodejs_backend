import { logger } from '../config/logger';
import fs from 'fs';
import path from 'path';
import cron from 'node-cron';

export const scheduleCleanupJob = () => {
  // Run daily at 2:00 AM
  cron.schedule('0 2 * * *', async () => {
    try {
      const tmpDir = path.join(__dirname, '../tmp');
      if (!fs.existsSync(tmpDir)) return;

      const files = fs.readdirSync(tmpDir);
      files.forEach(file => {
        fs.unlinkSync(path.join(tmpDir, file));
      });
      logger.info('Cleanup job completed, temporary files removed');
    } catch (err) {
      logger.error('Cleanup job failed', err);
    }
  });
};
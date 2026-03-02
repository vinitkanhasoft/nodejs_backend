import { mailTransporter } from '../config/mail';
import { logger } from '../config/logger';
import { Queue } from '../shared/queue/queue'; // assuming you have a queue system

export const processEmailJob = async () => {
  Queue.process('email', async (job: any) => {
    try {
      const { to, subject, html } = job.data;
      await mailTransporter.sendMail({ from: `"No Reply" <noreply@example.com>`, to, subject, html });
      logger.info(`Email sent to ${to}`);
      return Promise.resolve();
    } catch (err) {
      logger.error('Email job failed', err);
      return Promise.reject(err);
    }
  });
};
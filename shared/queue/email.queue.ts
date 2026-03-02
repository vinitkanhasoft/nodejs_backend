import Queue from 'bull';
import { MailService } from '../mail/mail.service';

const emailQueue = new Queue('email');
const mailService = new MailService();

emailQueue.process(async (job) => {
  const { to, subject, html } = job.data;
  await mailService.sendMail(to, subject, html);
});

export { emailQueue };
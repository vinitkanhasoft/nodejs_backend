import nodemailer from 'nodemailer';
import { env } from './env';

export const mailTransporter = nodemailer.createTransport({
  host: env.mailHost,
  port: env.mailPort,
  auth: {
    user: env.mailUser,
    pass: env.mailPass,
  },
});

export const sendMail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: `"No Reply" <${env.mailUser}>`,
    to,
    subject,
    html,
  };
  return mailTransporter.sendMail(mailOptions);
};

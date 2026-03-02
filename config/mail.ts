import nodemailer from 'nodemailer';
import { config } from './env.ts';

export const mailTransporter = nodemailer.createTransport({
  host: config.mail.host,
  port: config.mail.port,
  auth: {
    user: config.mail.user,
    pass: config.mail.pass,
  },
});

export const sendMail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: `"No Reply" <${config.mail.from}>`,
    to,
    subject,
    html,
  };
  return mailTransporter.sendMail(mailOptions);
};

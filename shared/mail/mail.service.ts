import nodemailer from 'nodemailer';
import { env } from '../../config/env';

export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.mailHost,
      port: env.mailPort,
      secure: false,
      auth: {
        user: env.mailUser,
        pass: env.mailPass,
      },
    });
  }

  async sendMail(to: string, subject: string, html: string) {
    await this.transporter.sendMail({
      from: env?.mailFrom,
      to,
      subject,
      html,
    });
  }
}
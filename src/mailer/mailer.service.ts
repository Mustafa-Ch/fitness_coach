import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tahamuhammad468@gmail.com',
      pass: 'tzqk perd wzxt rbnt',
    },
  });

  async sendVerificationEmail(email: string, token: string) {
    const mailOptions = {
      from: 'tahamuhammad468@gmail.com',
      to: email,
      subject: 'Verify Your Email',
      text: `Your verification code is: ${token}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
    private transporter = nodemailer.createTransport({
        service: 'gmail', //  Gmail use kar rahe hain (ya apni SMTP details dein)
        auth: {
            user: 'furniro8@gmail.com', //  Apna email dalain
            pass: 'akix ymmb ektj myjh', //  Apna email password dalain (Ya App Password use karein)
        },
    });

    async sendVerificationEmail(email: string, token: string) {
        const mailOptions = {
            from: '"FitNex Team" furniro8@gmail.com', //   email ai gi yhn pr env sy
            to: email,
            subject: 'Verify Your Email',
            // html: `<p>Click <a href="http://localhost:3000/auth/verify?token=${token}">here</a> to verify your email.</p>`,
            text: `Your verification code is: ${token}`
        };

        await this.transporter.sendMail(mailOptions);
    }
}

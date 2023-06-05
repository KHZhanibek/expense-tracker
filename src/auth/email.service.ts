import { ImATeapotException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Create a Nodemailer transporter
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: 465,
      secure: true,
      auth: {
        user: process.env.CONFIRM_EMAIL, // Replace with your Mail.ru email address
        pass: process.env.CONFIRM_PASSWORD, // Replace with your Mail.ru password
      },
    });
  }

  async sendConfirmationEmail(email: string, confirmationLink: string) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: `Midas Team <${process.env.CONFIRM_EMAIL}>`, // Replace with your Mail.ru email address
      to: email,
      subject: 'Confirm your email in Midas Budget App',
      html: `
        <h1>Confirmation Email</h1>
        <p>Please click the following link to confirm your email:</p>
        <a href="${confirmationLink}">${confirmationLink}</a>
      `,
    };

    try {
      // Send the email
      await this.transporter.sendMail(mailOptions);
      console.log('Confirmation email sent successfully!');
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      throw new ImATeapotException("Failed to send confirmation email")
    }
  }
}





import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Create a Nodemailer transporter
    this.transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: "midasbudgetapp@outlook.com",
        pass: "Midas123",
      },
    });
  }

  async sendConfirmationEmail(email: string, confirmationLink: string) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'midasbudgetapp@outlook.com',
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
    }
  }
}
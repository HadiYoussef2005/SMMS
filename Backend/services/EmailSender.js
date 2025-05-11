import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

class EmailSender {
  /**
   * Send an email using Gmail SMTP
   * @param {string} to - Recipient email address
   * @param {string} subject - Email subject
   * @param {string} text - Plain text body
   */
  async sendEmail(to, subject, text) {
    try {
      const info = await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to,
        subject,
        text,
      });
      console.log('Email sent successfully:', info.messageId);
    } catch (err) {
      console.error('Email sending error:', err);
      throw err;
    }
  }
}

export default new EmailSender();

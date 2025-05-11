import { Resend } from 'resend';

class EmailSender {
    constructor() {
        this.client = new Resend(process.env.RESEND_API_KEY);
    }

    async sendEmail(to, subject, text) {
        try {
            const { data, error } = await this.client.emails.send({
                from: process.env.RESEND_SENDER_EMAIL, 
                to,
                subject,
                text,
            });

            if (error) {
                console.error('Failed to send email:', error);
                throw new Error('Email sending failed');
            }

            console.log('Email sent successfully:', data.id);
        } catch (err) {
            console.error('Email sending error:', err.message);
            throw err;
        }
    }
}

export default new EmailSender();

import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    service: 'gmail',
    port: process.env.EMAIL_PORT,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

async function sendEmail() {
    try {
        // Define email options
        const mailOptions = {
            from: '"Your Name" <your-email@gmail.com>',
            to: 'recipient@example.com',
            subject: 'Test Email from Nodemailer',
            text: 'This is a test email sent from Nodemailer!',
            html: '<p>This is a test email sent from <b>Nodemailer</b>!</p>'
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Call the function
sendEmail();
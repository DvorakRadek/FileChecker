import nodemailer from 'nodemailer';
import { getIp } from './helpers.js';

export const sendEmail = async (files, input) => {
  try {
    const ip = await getIp();
    const emailContent = `New suspicious files found:\n${files.join('\n')}`;

    // MacOS
    // let transporter = nodemailer.createTransport({
    //     sendmail: true,
    //     newline: 'unix',
    //     path: '/usr/sbin/sendmail'
    // });

    // transporter.sendMail({
    //     from: `sender@${ip}`,
    //     to: input.email,
    //     subject: 'Message',
    //     text: emailContent
    // }, (err, info) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log(info);
    // });
    // console.log('email sent');
    
    
    // Windows
    // let transporter = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 587,
    //     secure: false,
    //     auth: {
    //         user: input.email,
    //         pass: input.password,
    //       },
    // });

    // let info = await transporter.sendMail({
    //     from: input.email,
    //     to: input.email,
    //     subject: 'New Suspicious Files Found',
    //     text: emailContent,
    // });

    console.log('Email sent successfully:', info.messageId);
  } catch (err) {
    console.error('Failed to send email:', err.message);
  }
}
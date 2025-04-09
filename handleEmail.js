import nodemailer from 'nodemailer';
import { getIp } from './helpers.js';

export const sendEmail = async (files, email) => {
  const ip = await getIp();
  const emailContent = `New suspicious files found:\n${files.join('\n')}`;
  let transporter = nodemailer.createTransport({
      sendmail: true,
      newline: 'unix',
      path: '/usr/sbin/sendmail'
  });
  
  transporter.sendMail({
    from: `sender@${ip}`,
    to: email,
    subject: 'Message',
    text: emailContent
  }, (err, info) => {
      if (err) {
          console.log(err);
      }
      console.log(info);
  });
  console.log('email sent');
}

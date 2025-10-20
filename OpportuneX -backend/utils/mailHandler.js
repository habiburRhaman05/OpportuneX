const nodemailer = require('nodemailer');

console.log(process.env.SMTP_USER, 'asdadd');
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  post:  process.env.SMTP_PORT,
  auth: {
    user:  process.env.SMPT_USER,
    pass: process.env.SMTP_PASSWPRD
  },
});

module.exports = { transporter };

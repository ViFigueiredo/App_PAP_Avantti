import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const send = (to, subject, body) => {
  // console.log(transporter);

  transporter.sendMail({
    from: process.env.MAIL_FROM, // sender address
    to, // list of receivers
    subject, // Subject line
    text: body, // plain text body
  });
};

module.exports = send;

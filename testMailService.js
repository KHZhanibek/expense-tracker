const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: "midasbudgetapp@outlook.com",
    pass: "Midas123",
  },
});

const mailOptions = {
  from: "midasbudgetapp@outlook.com",
  to: "zkhodzhabekov@gmail.com",
    subject: 'Confirm your email in Midas Budget App',
    html: `
      <h1>Confirmation Email</h1>
      <p>Please click the following link to confirm your email:</p>
    `,
};


transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
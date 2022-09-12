require("dotenv").config();

// const sgMail = require("@sendgrid/mail");
// const { SENDGRID_API_KEY } = process.env;
// sgMail.setApiKey(SENDGRID_API_KEY);

// const sendEmail = async (data) => {
//   try {
//     const email = { ...data, from: "bogdan.lyamzin.d@gmail.com" };
//     console.log("send");
//     await sgMail.send(email);
//     return true;
//   } catch (error) {
//     console.log("Mail did not send");
//     throw error;
//   }
// };

const nodemailer = require("nodemailer");
const { META_PASSWORD } = process.env;
const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // 25, 465, 2255
  secure: true,
  auth: {
    user: "annafesenko7@meta.ua",
    pass: META_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};
const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "annafesenko7@meta.ua" };
    console.log(email);
    await transporter.sendMail(email);
    console.log("Verification email sent");
    return true;
  } catch (error) {
    console.log("Mail did not send", error.message);
    throw error;
  }
};

module.exports = sendEmail;

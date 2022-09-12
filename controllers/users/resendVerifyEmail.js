const { User } = require("../../models");
const createError = require("http-errors");
const { sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw createError.BadRequest();
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw createError.NotFound("Not found");
  }
  if (user.verify) {
    throw createError.NotFound("Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Confirmation of registration",
    html: `<a href = "http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank">Confirm registration</a>`,
  };
  await sendEmail(mail);
  res.json({
    message: "Verification email sent",
  });
};
module.exports = resendVerifyEmail;

const { User } = require("../../models");
const createError = require("http-errors");
// const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password, name, subscription } = req.body;
  const avatarURL = gravatar.url(email);
  const user = await User.findOne({ email });
  if (user) {
    throw createError.Conflict("Email in use");
  }
  const verificationToken = v4();

  const newUser = new User({
    email,
    name,
    subscription,
    avatarURL,
    verificationToken,
  });
  newUser.setPassword(password);
  newUser.save();

  // const hashPassword = await bcrypt.hash(password, 10);
  // const newUser = await User.create({
  //   email,
  //   name,
  //   subscription,
  //   password: hashPassword,
  // });
  // console.log("fgh");
  try {
    const mail = {
      to: email,
      subject: "Confirmation of registration",
      html: `<a href = "http://localhost:3000/api/users/verify/${verificationToken}" target="_blank"> Confirm registration </a>`,
    };
    await sendEmail(mail);
  } catch (err) {
    console.log(err.message);
  }

  res.status(201).json({
    status: "created",
    code: 201,
    user: {
      name: newUser.name,
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};
module.exports = register;

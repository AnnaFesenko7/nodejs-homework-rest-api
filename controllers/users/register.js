const { User } = require("../../models");
const createError = require("http-errors");
// const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { email, password, name, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError.Conflict("Email in use");
  }

  const newUser = new User({ email, name, subscription });
  newUser.setPassword(password);
  newUser.save();

  // const hashPassword = await bcrypt.hash(password, 10);
  // const newUser = await User.create({
  //   email,
  //   name,
  //   subscription,
  //   password: hashPassword,
  // });

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

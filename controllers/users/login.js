const { User } = require("../../models");
const createError = require("http-errors");

const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw createError.Unauthorized("Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, `${SECRET_KEY}`, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    status: "success",
    code: 200,
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};
module.exports = login;

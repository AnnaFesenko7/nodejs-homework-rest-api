// const { User } = require("../../models");
// const createError = require("http-errors");

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    status: "success",
    code: 200,

    user: {
      email,
      subscription,
    },
  });
};

module.exports = getCurrent;

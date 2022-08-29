const createError = require("http-errors");
const { User } = require("../models");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const auth = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw createError.Unauthorized("Not authorized");
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw createError.Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "jwt expired") {
      error.status = 401;
    }

    next(error);
  }
};
module.exports = auth;

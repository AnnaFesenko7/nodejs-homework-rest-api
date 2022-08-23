const createError = require("http-errors");

const validationBody = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(createError.BadRequest("missing required name field"));
    }
    next();
  };
  return func;
};

module.exports = validationBody;

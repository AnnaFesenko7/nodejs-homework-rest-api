const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");

const isValidId = (req, _, next) => {
  const { contactId } = req.params;

  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    const error = createError.BadRequest(
      `${contactId} is not correct id format`
    );
    next(error);
  }
  next();
};

module.exports = isValidId;

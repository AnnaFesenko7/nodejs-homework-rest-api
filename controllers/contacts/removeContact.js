const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await Contact.findByIdAndRemove(contactId);
  if (!removedContact) {
    throw createError.NotFound("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    removedContact,
    message: "contact deleted",
  });
};

module.exports = removeContact;

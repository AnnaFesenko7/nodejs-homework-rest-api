const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatingContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatingContact) {
    throw createError.NotFound("Not found");
  }
  res.json({ status: "success", code: 200, updatingContact });
};
module.exports = updateContact;

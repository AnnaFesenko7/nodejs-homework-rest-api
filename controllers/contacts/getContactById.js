const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const searchedContact = await Contact.findById(contactId);
  // const searchedContact = await Contact.findOne({ _id: contactId });
  if (!searchedContact) {
    throw createError.NotFound(`Contact with id=${contactId} not found.`);
  }
  res.json({ status: "success", code: 200, searchedContact });
};
module.exports = getContactById;

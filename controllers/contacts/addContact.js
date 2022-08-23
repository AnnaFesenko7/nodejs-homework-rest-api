const { Contact } = require("../../models/contact");

const addContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json({ status: "success", code: 201, newContact });
};
module.exports = addContact;

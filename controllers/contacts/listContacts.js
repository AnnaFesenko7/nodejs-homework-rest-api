const { Contact } = require("../../models/contact");

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite = false } = req.query;
  const skip = (page - 1) * limit;
  const args = favorite
    ? { $and: [{ owner: _id }, { favorite: true }] }
    : { owner: _id };

  const contacts = await Contact.find(args, "-createdAt -updatedAt", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  res.json({ status: "success", code: 200, contacts });
};

module.exports = listContacts;

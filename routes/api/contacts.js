const express = require("express");

const router = express.Router();

const { ctrlWrapper } = require("../../helpers");

const ctrl = require("../../controllers/contacts");

const { schemas } = require("../../models/contact");
const { validationBody, isValidId } = require("../../middlewares");

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  validationBody(schemas.contactAddSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  isValidId,
  validationBody(schemas.contactAddSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validationBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);
module.exports = router;

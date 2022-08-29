const express = require("express");

const router = express.Router();

const { ctrlWrapper } = require("../../helpers");

const { contacts: ctrl } = require("../../controllers");

const { schemas } = require("../../models/contact");

const { validationBody, isValidId, auth } = require("../../middlewares");

router.get("/", auth, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  auth,
  validationBody(schemas.contactAddSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  auth,
  isValidId,
  validationBody(schemas.contactAddSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  validationBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);
module.exports = router;

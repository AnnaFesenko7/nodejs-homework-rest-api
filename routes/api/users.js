const express = require("express");

const router = express.Router();
const { users: ctrl } = require("../../controllers");
const { schemas } = require("../../models/user");
const { validationBody, auth, upload } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");

router.post(
  "/register",
  validationBody(schemas.usersRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validationBody(schemas.usersLoginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.patch(
  "/",
  auth,
  validationBody(schemas.updateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
  "/verify",
  validationBody(schemas.usersVerifyEmailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

module.exports = router;

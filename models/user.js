const { Schema, model } = require("mongoose");
const { handleSchemaValidationErrors } = require("../helpers");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const codeRegexp =
  /^[a-z|0-9|A-Z]*([_][a-z|0-9|A-Z]+)*([.][a-z|0-9|A-Z]+)*([.][a-z|0-9|A-Z]+)*(([_][a-z|0-9|A-Z]+)*)?@[a-z][a-z|0-9|A-Z]*\.([a-z][a-z|0-9|A-Z]*(\.[a-z][a-z|0-9|A-Z]*)?)$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for user"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: codeRegexp,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },

    avatarURL: {
      type: String,
      required: true,
    },
    token: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSchemaValidationErrors);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};
const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});
const User = model("user", userSchema);

const usersRegisterSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
  repeat_password: Joi.ref("password"),
  email: Joi.string().pattern(codeRegexp).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const usersLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(codeRegexp).required(),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
  token: Joi.string(),
});

const usersVerifyEmailSchema = Joi.object({
  email: Joi.string().pattern(codeRegexp).required(),
});

const schemas = {
  usersRegisterSchema,
  usersLoginSchema,
  updateSubscriptionSchema,
  usersVerifyEmailSchema,
};

module.exports = {
  User,
  schemas,
};

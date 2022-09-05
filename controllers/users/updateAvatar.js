const { User } = require("../../models");
const createError = require("http-errors");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  try {
    const { path: tempUpload, filename } = req.file;

    const { _id } = req.user;
    const [extension] = filename.split(".").reverse();
    const avatarName = `${_id}.${extension}`;

    const resultUpload = path.join(avatarsDir, avatarName);

    await fs.rename(tempUpload, resultUpload);

    const resizedAvatar = await Jimp.read(resultUpload);
    await resizedAvatar.resize(250, 250).write(resultUpload);

    const avatarURL = path.join("avatars", avatarName);

    const updatingUser = await User.findByIdAndUpdate(
      _id,
      { avatarURL },
      { new: true }
    );
    res.json({
      avatarURL: updatingUser.avatarURL,
    });
  } catch (error) {
    fs.unlink(req.file.path);
    next(createError.Unauthorized("Not authorized"));
  }
};

module.exports = updateAvatar;

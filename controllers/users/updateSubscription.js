const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  // const { subscription } = req.body;

  const { _id } = req.user;

  const updatingUser = await User.findByIdAndUpdate(_id, req.body);
  res.json({
    status: "success",
    code: 200,
    user: {
      email: updatingUser.email,
      subscription: updatingUser.subscription,
    },
  });
};
module.exports = updateSubscription;

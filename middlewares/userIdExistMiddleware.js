const { User } = require("../models/userModel");

const idUserExist = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "id not found",
      });
    }

    req.user = user;
    next();
    
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  idUserExist,
};

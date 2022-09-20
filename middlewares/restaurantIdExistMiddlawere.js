const { Restaurants } = require("../models/restaurantsModel");

const idRestaurantExist = async (req, res, next) => {
  try {
    const { id } = req.params;

    const rest = await Restaurants.findOne({ where: { id } });

    if (!rest) {
      return res.status(404).json({
        status: "error",
        message: "id not found",
      });
    }

    req.rest = rest;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  idRestaurantExist,
};

const { Meals } = require("../models/mealsModel");
const { Restaurants } = require("../models/restaurantsModel");

const idMealExist = async (req, res, next) => {
  try {
    const { id } = req.params;

    const meal = await Meals.findOne({
      where: { id },
      include: { model: Restaurants },
    });

    if (!meal) {
      return res.status(404).json({
        status: "error",
        message: "id not found",
      });
    }

    req.meal = meal;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  idMealExist,
};

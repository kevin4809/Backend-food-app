const { Meals } = require("../models/mealsModel");
const { Restaurants } = require("../models/restaurantsModel");


const createNewMeal = async (req, res) => {
  try {
  
    const { id } = req.params;
    const { name, price, restaurantId } = req.body;
    const newMeal = await Meals.create({
      name,
      price,
      restaurantId: id,
    });

    res.status(201).json({
      status: "success",
      data: { newMeal },
    });
  } catch (error) {
    console.log(error);
  }
};

const getMealsByStatus = async (req, res) => {
  try {
    const mealByStatus = await Meals.findAll({
      where: { status: "active" },
      include: { model: Restaurants },
    });

    res.status(200).json({
      status: "success",
      data: { mealByStatus },
    });
  } catch (error) {
    console.log(error);
  }
};

const getMealsById = async (req, res) => {
  try {
    const { meal } = req;

    if (meal.status === "cancelled") {
      return res.status(404).json({
        status: "error",
        message: "this meal is not active",
      });
    }


    res.status(200).json({
      status: "success",
      data: {
        meal,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateMeal = async (req, res) => {
  try {
    const { name, price } = req.body;
    const { meal } = req;

    await meal.update({ name, price });

    res.status(204).json({
      status: "success",
      data: { meal },
    });
  } catch (error) {
    console.log(error);
  }
};

const toDisableMeal = async (req, res) => {
  try {
    const { meal } = req;

    await meal.update({ status: "cancelled" });

    res.status(204).json({ status: "success" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNewMeal,
  getMealsByStatus,
  getMealsById,
  toDisableMeal,
  updateMeal,
};

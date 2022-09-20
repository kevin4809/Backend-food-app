const express = require("express");

const mealRouter = express.Router();

//controller
const {
  createNewMeal,
  getMealsByStatus,
  getMealsById,
  toDisableMeal,
  updateMeal,
} = require("../controllers/mealsController");

//middlaweres
const { idMealExist } = require("../middlewares/mealIdExistMiddlawere");
const { createMealValidator } = require("../middlewares/validatorMiddleware");
const {
  protectSession,
  protectAdmin,
} = require("../middlewares/authenticationMiddlawere");

mealRouter.get("/", getMealsByStatus);

mealRouter.get("/:id", idMealExist, getMealsById);

mealRouter.use(protectSession);

mealRouter.post("/:id", createMealValidator, createNewMeal);

mealRouter.delete("/:id", idMealExist, protectAdmin, toDisableMeal);

mealRouter.patch("/:id", idMealExist, protectAdmin, updateMeal);

module.exports = { mealRouter };

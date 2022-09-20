const { Orders } = require("../models/ordersModel");
const { Meals } = require("../models/mealsModel");
const { Restaurants } = require("../models/restaurantsModel");

const createNewOrder = async (req, res) => {
  try {
    const { quantity, mealId } = req.body;
    const { sessionUser } = req;

    const meal = await Meals.findOne({ where: { id: mealId } });

    const totalPrice = meal.price * quantity;

    const newOrder = await Orders.create({
      quantity,
      mealId,
      userId: sessionUser.id,
      totalPrice,
    });

    res.status(201).json({
      status: "success",
      data: { newOrder },
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllOrderUser = async (req, res) => {
  try {
    const { sessionUser } = req;

    const ordersUser = await Orders.findAll({
      where: { userId: sessionUser.id },
      include: { model: Meals, include: { model: Restaurants } },
    });

    res.status(201).json({
      status: "success",
      data: { ordersUser },
    });
  } catch (error) {
    console.log(error);
  }
};
const orderComplete = async (req, res) => {
  try {
    const { id } = req.params;

    const ordersUser = await Orders.findOne({
      where: { id },
    });

    if (ordersUser.status !== "active") {
      return res.status(403).json({
        status: "error",
        message: "the status is not active ",
      });
    }

    await ordersUser.update({ status: "completed" });

    res.status(201).json({
      status: "success",
      data: { ordersUser },
    });
  } catch (error) {
    console.log(error);
  }
};

const orderCancelled = async (req, res) => {
  try {
    const { id } = req.params;

    const ordersUser = await Orders.findOne({
      where: { id },
    });

    if (ordersUser.status !== "active") {
      return res.status(403).json({
        status: "error",
        message: "the status is not active ",
      });
    }

    await ordersUser.update({ status: "cancelled" });

    res.status(201).json({
      status: "success",
      data: { ordersUser },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNewOrder,
  getAllOrderUser,
  orderComplete,
  orderCancelled,
};

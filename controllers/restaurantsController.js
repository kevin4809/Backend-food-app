const { Restaurants } = require("../models/restaurantsModel");
const { Meals } = require("../models/mealsModel");
const { Reviews } = require("../models/reviewsModel");

const createNewRestaurant = async (req, res) => {
  try {
    const { name, address, rating } = req.body;

    const newRestaurant = await Restaurants.create({
      name,
      address,
      rating,
    });

    res.status(201).json({
      status: "success",
      data: { newRestaurant },
    });
  } catch (error) {
    console.log(error);
  }
};

const getRestaurantByStatus = async (req, res) => {
  try {
    const restaurantsByStatus = await Restaurants.findAll({
      where: { status: "active" },
      include: [{ model: Meals }, { model: Reviews }],
    });

    res.status(200).json({
      status: "success",
      data: { restaurantsByStatus },
    });
  } catch (error) {
    console.log(error);
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;

    const rest = await Restaurants.findOne({ where: { id } });

    res.status(200).json({
      status: "success",
      data: {
        rest,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const cancelledRestaurant = async (req, res) => {
  try {
    const { rest } = req;

    await rest.update({ status: "cancelled" });

    res.status(204).json({ status: "success" });
  } catch (error) {
    console.log(error);
  }
};

const updateRestaurants = async (req, res) => {
  try {
    const { name, address } = req.body;
    const { rest } = req;

    await rest.update({ name, address });

    res.status(204).json({
      status: "success",
      data: { rest },
    });
  } catch (error) {
    console.log(error);
  }
};

const createReview = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { comment, rating } = req.body;
    const { sessionUser } = req;

    const newReview = await Reviews.create({
      restaurantId,
      comment,
      rating,
      userId: sessionUser.id,
    });

    res.status(201).json({
      status: "success",
      data: { newReview },
    });
  } catch (error) {
    console.log(error);
  }
};

const UpdateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, rating } = req.body;

    const reviewExist = await Reviews.findOne({
      where: { id },
    });

    if (!reviewExist) {
      return res.status(403).json({
        status: "error",
        message: "Review don't exist",
      });
    }

    await reviewExist.update({
      comment,
      rating,
    });

    res.status(201).json({
      status: "success",
      data: { reviewExist },
    });
  } catch (error) {
    console.log(error);
  }
};

const toDisableReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Reviews.findOne({
      where: { id },
    });

    if (!review) {
      return res.status(403).json({
        status: "error",
        message: "Review don't exist",
      });
    }

    await review.update({ status: "deleted" });

    res.status(201).json({
      status: "success",
      data: { review },
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createNewRestaurant,
  getRestaurantByStatus,
  getRestaurantById,
  cancelledRestaurant,
  updateRestaurants,
  createReview,
  UpdateReview,
  toDisableReview,
};

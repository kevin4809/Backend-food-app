const express = require("express");

const restaurantRoutes = express.Router();

//controllers
const {
  createNewRestaurant,
  getRestaurantByStatus,
  getRestaurantById,
  cancelledRestaurant,
  updateRestaurants,
  createReview,
  UpdateReview,
  toDisableReview,
} = require("../controllers/restaurantsController");

//middlaweres
const {
  idRestaurantExist,
} = require("../middlewares/restaurantIdExistMiddlawere");

const {
  createRestaurantsValidators,
} = require("../middlewares/validatorMiddleware");

const {
  protectSession,
  protectAdmin,
  validReviewSession,
} = require("../middlewares/authenticationMiddlawere");

restaurantRoutes.get("/", getRestaurantByStatus);

restaurantRoutes.get("/:id", idRestaurantExist, getRestaurantById);

restaurantRoutes.use(protectSession);

restaurantRoutes.post("/reviews/:restaurantId", createReview);

restaurantRoutes.post("/", createRestaurantsValidators, createNewRestaurant);

restaurantRoutes.patch("/reviews/:id", validReviewSession, UpdateReview);

restaurantRoutes.patch("/reviews/:id", validReviewSession, toDisableReview);

restaurantRoutes.delete(
  "/:id",
  idRestaurantExist,
  protectAdmin,
  cancelledRestaurant
);

restaurantRoutes.patch(
  "/:id",
  idRestaurantExist,
  protectAdmin,
  updateRestaurants
);

module.exports = { restaurantRoutes };

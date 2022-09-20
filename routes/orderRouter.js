const express = require("express");

const orderRouter = express.Router();

//Controllers
const {
  createNewOrder,
  getAllOrderUser,
  orderComplete,
  orderCancelled,
} = require("../controllers/orderController");

//middlaweres
const {
  protectSession,
  validOrderSession,
} = require("../middlewares/authenticationMiddlawere");

orderRouter.use(protectSession);

orderRouter.post("/", createNewOrder);

orderRouter.get("/me", getAllOrderUser);

orderRouter.patch("/:id", validOrderSession, orderComplete);

orderRouter.delete("/:id", validOrderSession, orderCancelled);

module.exports = { orderRouter };

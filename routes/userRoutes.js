const express = require("express");

//controllers
const {
  createUser,
  updateUser,
  toDisableUser,
  getAllUserOrders,
  getUserOrderById,
  loginUser,
} = require("../controllers/userController");

const userRouter = express.Router();

//middlewares
const { idUserExist } = require("../middlewares/userIdExistMiddleware");
const { createUserValidators } = require("../middlewares/validatorMiddleware");
const {
  protectSession,
  validUserSession,
} = require("../middlewares/authenticationMiddlawere");

userRouter.post("/signup", createUserValidators, createUser);

userRouter.post("/login", loginUser);

userRouter.use(protectSession);

userRouter.patch("/:id", idUserExist, validUserSession, updateUser);

userRouter.delete("/:id", idUserExist, validUserSession, toDisableUser);

userRouter.get("/orders", getAllUserOrders);

userRouter.get("/orders/:id", getUserOrderById);

module.exports = { userRouter };

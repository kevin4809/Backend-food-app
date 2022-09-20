const { User } = require("../models/userModel");
const { Orders } = require("../models/ordersModel");
const { Restaurants } = require("../models/restaurantsModel");
const { Meals } = require("../models/mealsModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      status: "success",
      data: { newUser },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { user } = req;

    await user.update({
      name,
      email,
    });

    res.status(204).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    console.log(error);
  }
};

const toDisableUser = async (req, res) => {
  try {
    const { user } = req;

    await user.update({ status: "cancelled" });

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllUserOrders = async (req, res) => {
  try {
    const { sessionUser } = req;

    const allUsers = await User.findAll({
      where: { id: sessionUser.id },
      include: {
        model: Orders,
        include: { model: Meals, include: { model: Restaurants } },
      },
    });

    res.status(200).json({
      status: "success",
      data: { allUsers },
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserOrderById = async (req, res) => {
  try {
    const { sessionUser } = req;
    const { id } = req.params;

    const orderUserById = await Orders.findAll({
      where: { userId: sessionUser.id },
      where: { id: id },
      include: { model: Meals, include: { model: Restaurants } },
    });

    res.status(200).json({
      status: "success",
      data: { orderUserById },
    });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User doesn't exist",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(404).json({
        status: "error",
        message: "Password invalid",
      });
    }

    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "10d" });

    res.status(200).json({
      status: "success",
      data: { user, token },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  updateUser,
  toDisableUser,
  getAllUserOrders,
  getUserOrderById,
  loginUser,
};

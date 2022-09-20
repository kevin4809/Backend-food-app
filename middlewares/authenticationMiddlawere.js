const { User } = require("../models/userModel");
const { Reviews } = require("../models/reviewsModel");
const { Orders } = require("../models/ordersModel");
const jwt = require("jsonwebtoken");

const protectSession = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(403).json({
        status: "error",
        message: "invalid session",
      });
    }

    const decoded = jwt.verify(token, "secret");

    const user = await User.findOne({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(403).json({
        status: "error",
        message: "the owner of the session is no longer active",
      });
    }

    req.sessionUser = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

const validUserSession = async (req, res, next) => {
  try {
    const { sessionUser, user } = req;

    if (sessionUser.id !== user.id) {
      return res.status(403).json({
        status: "error",
        message: "you are not the owner of thos acount ",
      });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

const validReviewSession = async (req, res, next) => {
  try {
    const { sessionUser } = req;
    const { id } = req.params;

    const validSession = await Reviews.findOne({ where: { id } });

    if (sessionUser.id !== validSession.userId) {
      return res.status(403).json({
        status: "error",
        message: "you are not the owner of thos acount ",
      });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

const validOrderSession = async (req, res, next) => {
  try {
    const { sessionUser } = req;
    const { id } = req.params;

    const validSession = await Orders.findOne({ where: { id } });

    if (!validSession) {
      return res.status(403).json({
        status: "error",
        message: "the order don't exist ",
      });
    }

    if (sessionUser.id !== validSession.userId) {
      return res.status(403).json({
        status: "error",
        message: "you are not the owner of thos acount ",
      });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

const protectAdmin = async (req, res, next) => {
  try {
    const { sessionUser } = req;

    if (sessionUser.role !== "admin") {
      return res.status(403).json({
        status: "error",
        message: "you dont have the access level for this operation ",
      });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  protectSession,
  validUserSession,
  protectAdmin,
  validReviewSession,
  validOrderSession,
};

const express = require("express");

//Routes
const { userRouter } = require("./routes/userRoutes");
const { restaurantRoutes } = require("./routes/restaurantRoutes");
const { mealRouter } = require("./routes/mealRoute");
const { orderRouter } = require("./routes/orderRouter");

const app = express();

app.use(express.json());

//EndPoints
app.use("/api/v1/users", userRouter);
app.use("/api/v1/restaurants", restaurantRoutes);
app.use("/api/v1/meals", mealRouter);
app.use("/api/v1/orders", orderRouter);

module.exports = { app };

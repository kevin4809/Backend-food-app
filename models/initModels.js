const { Restaurants } = require("./restaurantsModel");
const { Meals } = require("./mealsModel");
const { Orders } = require("./ordersModel");
const { User } = require("./userModel");
const { Reviews } = require("./reviewsModel");

const initModel = () => {
  
  Restaurants.hasMany(Meals, { foreignKey: "restaurantId" });
  Meals.belongsTo(Restaurants);

  Meals.hasOne(Orders, { foreignKey: "mealId" });
  Orders.belongsTo(Meals);

  User.hasMany(Orders, { foreignKey: "userId" });
  Orders.belongsTo(User);

  User.hasMany(Reviews, { foreignKey: "userId" });
  Reviews.belongsTo(User);

  Restaurants.hasMany(Reviews, { foreignKey: "restaurantId" });
  Reviews.belongsTo(Restaurants);
};

module.exports = { initModel };

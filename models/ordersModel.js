const { db } = require("../utils/databaseUtils");
const { DataTypes } = require("sequelize");

const Orders = db.define("orders", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  mealId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "active",
  },
});

module.exports = { Orders };

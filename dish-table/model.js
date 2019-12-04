const Sequelize = require("sequelize");
const { sequelize } = require("../db");

const Dish = sequelize.define(
  "dishes",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: "dishes"
  }
);

module.exports = Dish;

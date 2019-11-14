const Sequelize = require("sequelize");
const { sequelize } = require("../db");
const Type = require("../type-table/model");

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

Dish.belongsTo(Type);
Type.hasMany(Dish);

module.exports = Dish;

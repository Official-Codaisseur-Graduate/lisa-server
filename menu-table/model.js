const Sequelize = require('sequelize')
const { sequelize } = require('../db')

const Menu = sequelize.define('menus', {
  dish_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },

}, {
  timestamps: false,
  tableName: 'menus'
})

module.exports = Menu
const Sequelize = require('sequelize')
const { sequelize } = require('../db')

const Dishtype = sequelize.define('types',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: 'types'
  })

module.exports = Dishtype
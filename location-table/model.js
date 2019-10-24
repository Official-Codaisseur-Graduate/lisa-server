const Sequelize = require('sequelize');
const { sequelize } = require('../db');
const Menu=require('../menu-table/model')
const Dishtype=require('../type-table/model')
const Dish=require('../dish-table/model')

const Location = sequelize.define(
	'locations',
	{
		location_name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		location_description: {
			type: Sequelize.STRING
		}
	},
	{
		timestamps: false,
		tableName: 'locations'
	}
);

Menu.belongsTo(Location)
Dishtype.belongsTo(Location)
Dish.belongsTo(Location)
Location.hasOne(Menu)
Location.hasOne(Dishtype)
Location.hasOne(Dish)

module.exports = Location;

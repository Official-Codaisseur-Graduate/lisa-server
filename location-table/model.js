const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const Location = sequelize.define(
	'locations',
	{
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		address: {
			type: Sequelize.STRING,
			allowNull: false
		},
		latitude: {
			type: Sequelize.FLOAT,
			allowNull: false
		},
		longitude: {
			type: Sequelize.FLOAT,
			allowNull: false
		}
	},
	{
		timestamps: false,
		tableName: 'locations'
	}
);

module.exports = Location;

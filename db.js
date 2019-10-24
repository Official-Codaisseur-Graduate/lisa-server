const Sequelize = require('sequelize');
const ConnectionString =
	process.env.DATABASE_URL ||
	'postgres://postgres:secret@localhost:5432/postgres';
const sequelize = new Sequelize(ConnectionString, {
	define: { timestamps: false }
});

const dbSync = () => {
	return sequelize
		.sync
		  // Force switch, syncs database to model
		// {alter: true}      // Alter switch, syncs database without deleting rows
		({ force: true })
		.catch((err) => console.log(err));
};

module.exports = { sequelize, dbSync };

const Sequelize = require('sequelize');
const db = require('../config/database');

const Writable = db.define('writable', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	data: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: false
	},
	writablename: {
        type: Sequelize.STRING
    } 
});

module.exports = Writable;
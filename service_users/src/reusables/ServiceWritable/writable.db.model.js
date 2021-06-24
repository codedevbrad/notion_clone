const Sequelize = require('sequelize');
const db = require('../../config/database');

const Writable = db.define('writable', {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
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
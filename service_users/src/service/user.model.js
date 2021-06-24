const Sequelize = require('sequelize');
const db = require('../config/database');
const Writable = require('../reusables/ServiceWritable/writable.db.model');

const model__name = process.env.NODE_ENV == 'production' ? 'user' : 'user_testing';

const User = db.define('user', {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
		primaryKey: true
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	} ,
    password: {
		type: Sequelize.STRING,
		allowNull: false
    }
});

User.hasMany( Writable , {
	foreignKey: {
		allowNull: false
	}
 } );
 
Writable.belongsTo( User );

module.exports = User;
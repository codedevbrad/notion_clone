const Sequelize = require('sequelize');
const db = require('../config/database');

const Writable = require('../service/writable.model');

const User = db.define('user', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
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

// === RELATIONSHIPS === //

User.hasMany( Writable , {
	foreignKey: {
		allowNull: false
	}
 } );
 
Writable.belongsTo( User );

// === QUERIES == //

const tokenUserMatchesDatabase = async ( userFromToken ) => {
	let { username , password } = userFromToken;
	// find username in database
	return User.findOne( {
		where: { username , password }
	});
}

module.exports.userQueries = {
	tokenUserMatchesDatabase
}
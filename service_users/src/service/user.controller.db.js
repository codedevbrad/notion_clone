const User = require("./user.model");
const { generateHashedPassword , comparePasswords } = require('../authStrategy/auth.user');
const { generateAccessToken } = require('../authStrategy/auth.token');

function findAllUsers ( ) {
	return User.findAll();
}

function getUserById ( id ) {
	return User.findByPk( id );
}

function getUserByUsername ( username ) {
	return User.findOne({
		where: { username : username }
	})
}

const createNewUser = async( userObj ) => {
	userObj.password = await generateHashedPassword( userObj.password );
	let user = await User.create( userObj );
	return user;
};

function updateUser ( username , USER_MODEL ) {
	return User.update( USER_MODEL , { where: { username: username } });
}

function removeUser( username ) {
	return User.destroy({ where: { username: username } })
}

function destroyAll( ) {
	return User.sync({ force: true });
}

const matchUserByCredentials = ( userObject ) => new Promise( async ( resolve , reject ) => {
	try {
		let { username , password } = userObject;

		let usernameMatch = await getUserByUsername( username );

		if ( !usernameMatch ) resolve( false );

		let isUser = comparePasswords( password , usernameMatch.password );
		resolve( isUser );

	} catch ( err ) {
		reject( err );
	}
});

const findOrCreateUser = ( userObject ) => new Promise( async ( resolve , reject ) => {
	try {
		let { username , password } = userObject;

	    let usernameExists = await getUserByUsername( username );

		if ( usernameExists ) {
			let userPasswordMatches = await comparePasswords( password , usernameExists.password );

			if ( !userPasswordMatches ) reject( 'wrong credentials');

			resolve( {
				user : usernameExists  , 
				fresh: false
			});
		}
		else if ( !usernameExists ) {
			let newUser = userObject;
			createNewUser( newUser )
			 	.then( user => resolve({
					user , fresh : true
				}))
				.catch( err => reject('could not save new user' ));
		}
	}
	catch ( err ) {
		reject( 'error finding or creating user' );
	}
});


module.exports.finderQueries = {
	getUserById , getUserByUsername , findAllUsers
}

module.exports.mutableQueries = {
	createNewUser , updateUser , removeUser , destroyAll
}

module.exports.authQueries = {
	matchUserByCredentials , findOrCreateUser
}
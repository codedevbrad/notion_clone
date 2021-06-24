
const User = require('../user.model');

const { asyncSupport } = require('@codedevbrad/serverutils');

const { generateAccessToken } = require('../../authStrategy/auth.token');

const databaseMethods = require('../user.controller.db');

const { getUserByUsername } = databaseMethods.finderQueries;
const { createNewUser , updateUser , removeUser } = databaseMethods.mutableQueries;
const { findOrCreateUser } = databaseMethods.authQueries;

// TEST AUTH QUERIES

module.exports.matchUser = asyncSupport( async ( req , res , next ) => {
    let { username , password } = req.body;

    let userMatches = await matchUserByCredentials({ username , password });
    res.status( 200 ).send( userMatches );
});

module.exports.findorcreateUser = asyncSupport( async ( req , res , next ) => {
    let { username , password } = req.body;

    let user = await findOrCreateUser({ username , password });
    res.status( 200 ).send( user );
});

// TEST API ROUTES

module.exports.login = asyncSupport( async ( req , res , next ) => {
    let { username , password } = req.body;

    if ( !username || !password ) {
        throw new Error( 'missing username or password' );
    }

    let user = await findOrCreateUser( { username , password } );

    let userSigned = await generateAccessToken( user );

    res.status(201).send( {
        user: user , 
        token: userSigned 
    } );
});

// @expect BEARER token in HEADER.
module.exports.getuser = asyncSupport( async ( req , res , next ) => { 
     // return USER object from token asigned to res.
     let user = res.locals.user;
     res.status(200).send( user );
});


// TEST INDIVIDUAL QUERIES

// CREATE-ONE
exports.createOne = asyncSupport( async( req , res , next ) => {
	const USER_MODEL = {
            username: req.body.username,
            password: req.body.password
    }
    let user = await createNewUser( USER_MODEL );
    res.status(201).send( user );
});

// GET-ALL
exports.getAll = asyncSupport( async (req, res, next) => {
    let users = await findAllUsers();
    res.status( 200 ).send( users );
});

//GET-ONE
exports.getOne = asyncSupport( async (req, res, next) => {
    let { id } = req.params;

	let userByUsername = await getUserByUsername( id );

    res.status(200).send( {
        userByUsername 
    });
});

//UPDATE-ONE.
exports.updateOne = asyncSupport( async (req, res, next) => {
    let { username , usernameChange } = req.query;
    let model = {
        username : usernameChange 
    }
	let userUpdatad = await updateUser( username , model );
    res.status( 201 ).send( userUpdatad );
});

//DELETE-ONE
exports.deleteOne = asyncSupport( async ( req, res, next ) => {
    let { username } = req.query;
    await removeUser( username );
    res.status( 201 ).send('user deleted');
});

//DELETE-ALL
exports.deleteAll = asyncSupport( async ( req, res, next) => {
	await destroyAll();
    res.status( 201 ).send('users deleted');
});
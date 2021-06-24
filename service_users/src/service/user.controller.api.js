
const { asyncSupport } = require('@codedevbrad/serverutils');

const { generateAccessToken } = require('../authStrategy/auth.token');

const databaseMethods = require('./user.controller.db');

const { getUserByUsername } = databaseMethods.finderQueries;
const { createNewUser , updateUser , removeUser } = databaseMethods.mutableQueries;
const { findOrCreateUser } = databaseMethods.authQueries;

exports.login = asyncSupport(  async ( req , res , next ) => {

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

exports.getLoggedUser = asyncSupport(  async ( req , res , next ) => {
    // return USER object from token asigned to res.
    let user = res.locals.user;
    res.status(200).send( user );
});

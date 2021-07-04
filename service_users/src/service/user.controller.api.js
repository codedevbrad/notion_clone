
const { asyncSupport } = require('@codedevbrad/serverutils');

const { generateAccessToken } = require('../authStrategy/auth.token');

const databaseMethods = require('./user.controller.db');

const { findOrCreateUser } = databaseMethods.authQueries;
const { getUserById } = databaseMethods.finderQueries;

exports.login = asyncSupport(  async ( req , res , next ) => {

    let { username , password } = req.body;

    if ( !username || !password ) {
        throw new Error( 'missing username or password' );
    }

    let user = await findOrCreateUser( { username , password } );

    let token = await generateAccessToken( user );

    res.status(201).send( {
        user , 
        token  
    } );
});

exports.getLoggedUser = asyncSupport(  async ( req , res , next ) => {
    // return USER object from token asigned to res.
    let { user: userToken } = res.locals.user;
    // query USER in database.
    let { id , username } = await getUserById( userToken.id );
    res.status(200).send({
            id , username 
    });
});

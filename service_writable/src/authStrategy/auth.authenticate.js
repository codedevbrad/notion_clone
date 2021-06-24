
const { stripToken } = require('./auth.methods');
const { tokenUserMatchesDatabase } = require('./auth.model').userQueries;
const { ErrorMessageTemplate } = require('../util/errorMessage');

const authenticateTokenMiddleware = async( req , res, next ) => {
    try {
        // GET USER FROM JWT BEARER TOKEN.
        let userRequest = await stripToken( req );

        // MAKE SURE USER IS IN DATABASE
        let userPersistsInDB = await tokenUserMatchesDatabase( userRequest );
        if (!userPersistsInDB ) reject('user token does not match any user in DB');
        
        res.locals.user = userRequest;
        next( );
    }
    catch ( err ) {
        console.error( err );
        let ErrorMessage = ErrorMessageTemplate('error authorizing user');
        return res.status( 503 ).send( ErrorMessage );
    }
}

const authenticateToken = ( ) => new Promise( async ( resolve , reject ) => {
    try {
        // GET USER FROM JWT BEARER TOKEN.
        let userRequest = await stripToken( req );

        // MAKE SURE USER IS IN DATABASE
        let userPersistsInDB = await tokenUserMatchesDatabase( userRequest );
        if (!userPersistsInDB ) reject('user token does not match any user in DB');
        
        resolve( userRequest );
    }
    catch ( err ) {
        reject( err );
    }
});

module.exports = {
    authenticateTokenMiddleware , authenticateToken
};
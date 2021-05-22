const { asyncSupport } = require('@codedevbrad/serverutils');
const { stripToken }   = require('../auth.methods');
const { tokenUserMatchesDatabase } = require('../auth.model').userQueries;

// TEST USER STRATEGY 

// @expect token to be present & pass JWT verify
module.exports.testToken = asyncSupport( async ( req , res , next ) => { 
     // GET USER FROM JWT BEARER TOKEN.
     let userRequest = await stripToken( req );
     res.status(200).send( userRequest );
});

// protected route;
// @expect user from res.locals 
module.exports.testUserTokenMatches = asyncSupport( async ( req , res , next ) => {
    let userRequest = await stripToken( req );
    let userMatches = await tokenUserMatchesDatabase(userRequest);
    res.status( 200 ).send( userMatches );
});

module.exports.passauth = asyncSupport( async ( req , res , next ) => {
    let user = res.locals.user;
    res.status( 200 ).send( user );
});
const { asyncSupport } = require('@codedevbrad/serverutils');

const { generateHashedPassword , comparePasswords } = require('../auth.user');
const { generateAccessToken , authenticateTokenMiddleware , 
      authenticateToken } = require('../auth.token');
      
// TEST USER STRATEGY 

module.exports.createHashPassword = asyncSupport( async ( req , res , next ) => {
    let { password } = req.query;
    let hash = await generateHashedPassword(password);
    res.status( 200 ).send( hash );
});

module.exports.testpasswords = asyncSupport( async ( req , res , next ) => {

    let { password , passwordHash } = req.body;
    let userMatches = await comparePasswords( password , passwordHash );
    res.status( 200 ).send( userMatches );
});


// TEST TOKEN STATEGY

module.exports.generateAtoken = asyncSupport( async ( req , res , next ) => {
    // expect a token
});

module.exports.authenticateToken = asyncSupport( async ( req , res , next ) => {
    // expect a user from token
});
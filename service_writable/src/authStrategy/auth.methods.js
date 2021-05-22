const jwt    = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const stripToken = ( req ) => new Promise( ( resolve , reject ) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) reject('user not allowed access');
  
    jwt.verify(token, process.env.TOKEN_SECRET , ( err , user ) => {
        if ( err ) reject('token no longer authenticated');
        resolve( user.user );
    });
});

module.exports = {
    stripToken 
}
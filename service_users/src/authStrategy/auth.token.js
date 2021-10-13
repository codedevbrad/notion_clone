
const jwt = require('jsonwebtoken');

const generateAccessToken = ( user ) => new Promise( async ( resolve , reject ) => {
    let token = jwt.sign( user , process.env.TOKEN_SECRET, { expiresIn: '60d' });
    resolve( token );
});

function authenticateTokenMiddleware (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.status(401).send('user not allowed access');
  
    jwt.verify(token, process.env.TOKEN_SECRET , ( err , user ) => {

      if (err) return res.status(403).send('token no longer authenticated');

      res.locals.user = user;
      next( );
    });
}

const authenticateToken = ( ) => new Promise( async ( resolve , reject ) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) reject('user not allowed access');
  
    jwt.verify(token, process.env.TOKEN_SECRET , ( err , user ) => {

      if (err) return reject('token no longer authenticated');

      resolve( user );
    });
});

module.exports = {
    generateAccessToken , authenticateTokenMiddleware , authenticateToken
};
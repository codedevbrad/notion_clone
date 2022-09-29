const api_test = require('express').Router();

const test_controller_auth   = require('./authStrategy/test.request/test.api');
const test_controller_access = require('./accessStrategy/test.request/test.access');

const { authenticateTokenMiddleware  } = require('./authStrategy/auth.authenticate');
const { authenticateAccessMiddleware } = require('./accessStrategy/auth.authorize');

api_test.get('/v0/' , ( req , res ) => res.status(200).send('writable tests v0'));

// ==== AUTH-STRATEGY ==== // 

// @expect : bearer token to be sent in HEADERS.
api_test.get('/v0/testtoken' , test_controller_auth.testToken );

// @expect : bearer token to be sent in HEADERS.          
api_test.get('/v0/testmatch' , test_controller_auth.testUserTokenMatches );

// @expect : bearer token to be sent in HEADERS.      
// @expect : pass auth middleware and expect a user in res.locals    
api_test.get('/v0/passauth'  , authenticateTokenMiddleware , test_controller_auth.passauth );


// === ACCESS-STRATEGY === // 

api_test.get('/v0/testaccess' , 
    authenticateTokenMiddleware , authenticateAccessMiddleware ,
    test_controller_access.testaccess
);


// === SERVICE : DATABASE QUERIES ===== // 

// api.post('/v0/writable/'         , controller_writable.createWritable );
// api.get('/v0/writable/belongsto' , controller_writable.getByUser );

// api.get('/v0/writable/single/:id',    controller_writable.getOne);
// api.put('/v0/writable/single/:id',    controller_writable.updateOne);
// api.delete('/v0/writable/single/:id', controller_writable.deleteOne);

// ==== SERVICE : API REQUEST ===== //

module.exports = api_test;
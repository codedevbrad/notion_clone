
const api_test = require('express').Router();
const { authenticateTokenMiddleware } = require('./authStrategy/auth.token');

const test_authStrategy = require('./authStrategy/tests/test.api');
const test_serviceTEST  = require('./service/tests/user.controller.test');

api_test.get('/v0/' , ( req , res ) => res.status(200).send('users test v0'));

// @AUTHSTRATEGY USER / TOKEN TESTS

api_test
  .get( '/v0/auth/hash'     , test_authStrategy.createHashPassword )
  .post('/v0/auth/testhash' , test_authStrategy.testpasswords );

// @SERVICE - AUTH TESTS

api_test
  .post('/v0/user/match'        , test_serviceTEST.matchUser )
  .post('/v0/user/findorcreate' , test_serviceTEST.findorcreateUser );


// @SERVICE - API TESTS

api_test
  .post('/v0/user/login' , test_serviceTEST.login )
  .get('/v0/user/get'   , authenticateTokenMiddleware , test_serviceTEST.getuser );

// @SERVICE - PLAIN DB TESTS

api_test
  .get('/v0/users/',       test_serviceTEST.getAll)
  .get('/v0/users/:id',    test_serviceTEST.getOne)
  .post('/v0/users/',      test_serviceTEST.createOne)
  .put('/v0/users/:id',    test_serviceTEST.updateOne)
  .delete('/v0/users/single' , test_serviceTEST.deleteOne )
  .delete('/v0/users/all'    , test_serviceTEST.deleteAll );

module.exports = api_test;
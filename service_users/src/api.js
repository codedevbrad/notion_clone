
const api = require('express').Router();
const controller_user = require('./service/user.controller.api');
const { authenticateTokenMiddleware } = require('./authStrategy/auth.token');

api.get('/v0/' , ( req , res ) => res.status(200).send('users v0'));

api
  .post( '/v0/users/get'   , authenticateTokenMiddleware , controller_user.getLoggedUser )
  .post('/v0/users/login'  , controller_user.login );

// api
//   .get('/v0/users/',       controller.getAll)
//   .get('/v0/users/:id',    controller.getOne)
//   .post('/v0/users/',      controller.createOne)
//   .put('/v0/users/:id',    controller.updateOne)
//   .delete('/v0/users/:id', controller.deleteOne);

module.exports = api;
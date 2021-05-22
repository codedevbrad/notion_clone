const controller_writable = require('./service/writable.controller.api');
const api = require('express').Router();

const { authenticateTokenMiddleware  } = require('./authStrategy/auth.authenticate');
const { authenticateAccessMiddleware } = require('./accessStrategy/auth.authorize');


api.get('/v0/' , ( req , res ) => res.status(200).send('writable v0'));

api.get('/v0/writables' , authenticateTokenMiddleware , controller_writable.getWritables );
api.post('/v0/writable' , authenticateTokenMiddleware , controller_writable.createWritable );


module.exports = api;
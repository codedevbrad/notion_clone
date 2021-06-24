const controller_writable = require('./service/writable.controller.api');
const api = require('express').Router();

const { authenticateTokenMiddleware  } = require('./authStrategy/auth.authenticate');
const { authenticateAccessMiddleware } = require('./accessStrategy/auth.authorize');

api.get('/v0/' , ( req , res ) => res.status(200).send('writable v0'));

api.get('/v0/writables' , authenticateTokenMiddleware   , controller_writable.getWritables );

api.post('/v0/writable'   , authenticateTokenMiddleware , controller_writable.createWritable );
api.delete('/v0/writable' , authenticateTokenMiddleware , controller_writable.deleteWritable );
api.put('/v0/writable'    , authenticateTokenMiddleware , controller_writable.updateWritable );

api.get('/v0/writable/bookmark' , controller_writable.Writable__bookmark );

api.post('/v0/writable:imageUPLOAD'   , controller_writable.Writable__imageUPLOAD );
api.delete('/v0/writable:imageDELETE' , controller_writable.Writable__imageDELETE );

module.exports = api;
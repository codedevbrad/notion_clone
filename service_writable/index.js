const express = require('express');
const sequelize = require('./src/config/database');
const { asyncSupport } = require('@codedevbrad/serverutils');

const app = express();
const port = process.env.MICROSERVICE_PORT || 5000 ;

// add a database connection ...
var config = require('./src/config/settings.js');
    config.development( app , __dirname );
    config.middleware(  app , __dirname );

const promiseTest = ( ) => new Promise( ( resolve , reject ) => {
    resolve('hey dude');
});

app.get('/' , asyncSupport( async ( req , res , next ) => {
    let data = await promiseTest();
    res.status(201).send( data );
}));

app.use('/api'  , require('./src/api'));
app.use('/test' , require('./src/api.test'));

require('./src/util/errors').errors( app );

(async () => {
    try {
      await sequelize.sync(
        { force: false } //Reset db every time
      );
      app.listen(port, () => console.log(`writable service running in env: ${ process.env.NODE_ENV }`))
    } catch (error) {
      console.log(error);
    }
})();
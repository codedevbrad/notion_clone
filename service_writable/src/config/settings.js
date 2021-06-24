const express  = require('express');
const cors     = require('cors');
const morgan   = require('morgan');
const formData = require('express-form-data');

module.exports = {
    development: ( app ) => {
        // dev
        if ( process.env.NODE_ENV === "development" ) {
             app.use( morgan('dev') );
        }
    } ,
    middleware: ( app ) => {
        // body parser middleware
        app.use( express.urlencoded({ extended: true }))
        // parse application/json
        app.use( express.json());

        //Set proper Headers on Backend
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
        //allow for form data upload. 
        app.use( formData.parse());
    } ,

    authStrategy: ( app ) => {
        // set CORD FOR AUTH
        app.use( cors());
    }
}
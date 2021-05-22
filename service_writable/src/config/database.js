const Sequelize = require('sequelize');

//GET ENV VARIABLES FROM DOCKER or ENV.

function returnDatabaseURI ( ) {
    if ( process.env.NODE_ENV == 'development' ) {
        return new Sequelize(
            'writable_database' ,
            'postgres' ,
            'password',
            {
                host: 'localhost' ,
                dialect: 'postgres'
            }
        )
    } else {
        return new Sequelize(
            process.env.PGDATABASE,
            process.env.PGUSER,
            process.env.PGPASSWORD,
                {
                    host: process.env.PGHOST,
                    dialect: 'postgres'
                }
            );
    }
}

module.exports = returnDatabaseURI();


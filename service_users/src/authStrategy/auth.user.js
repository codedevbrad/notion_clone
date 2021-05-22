const bcrypt = require('bcrypt');

const generateHashedPassword = ( passwordString ) => new Promise( ( resolve , reject ) => {
    bcrypt.genSalt( 10 , ( err , salt ) => {
        if ( err ) reject( err );
        bcrypt.hash( passwordString , salt, ( err, hash ) => {
            if( err ) {
                reject( err );
            }
            resolve( hash );
        });
    });
});

const comparePasswords = ( passwordString , userHash ) => new Promise( ( resolve , reject ) => {
    bcrypt.compare( passwordString , userHash , ( err , isMatch ) => {

        if( err)    { reject( 'error comparing paswords' )   }
        if(isMatch) { resolve( true )   }
        else        { resolve( false )  }
    });
});

module.exports = {
    generateHashedPassword , comparePasswords
}
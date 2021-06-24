const { asyncSupport } = require('@codedevbrad/serverutils');

module.exports.testaccess = asyncSupport( async ( req , res , next ) => {
        res.status( 200 ).send( res.locals.user );
});

const authenticateAccessMiddleware = async( req , res , next ) => {
        try {            
            let userMatchesWorkspace = null;
            console.log('user access middleware');
            next();
        }
        catch ( err ) {
            console.error( err );
            return res.status( 503 ).send('error testing user access to workspace');
        }
};

module.exports = {
    authenticateAccessMiddleware
}
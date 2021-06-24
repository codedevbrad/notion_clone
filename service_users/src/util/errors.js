
module.exports.errors = function( app ) {

    app.use( ( req , res , next ) => {
        res.status( 404 ).send( 'error 404');
    });
  
    // error 500
    app.use( ( err , req , res , next ) => {
       console.log( err );
       res.status( err.status || 500 );
       res.send( {
            msg : err.message || err ,
        portMsg : 'the app doesnt seem to be working as intended. please refresh your broweser.'
       });
    });
  }
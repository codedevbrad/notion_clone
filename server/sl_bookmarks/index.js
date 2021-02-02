const generateBookmark = require('./functions/generateBookmark');

exports.handler = async ( event ) => {
      try {
        let data = await generateBookmark( event.url )
        const response = {
             statusCode: 200,
             body: data
         };
        return response;
      } catch ( err ) {
        return {
            statusCode: 500 ,
            body: JSON.stringify( err )
        }
      }
}

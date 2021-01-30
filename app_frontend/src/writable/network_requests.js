import axios from 'axios';
const config = { headers: { 'Content-Type': 'application/json' } };

export const requests = {
      generateBookmark : ( url ) => new Promise( ( resolve , reject ) => {
         axios.get( `http://localhost:5000/?url=${ url }`)
              .then(  res => resolve( res.data ) )
              .catch( err => reject( err ) );
      })
};

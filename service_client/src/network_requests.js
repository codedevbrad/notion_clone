import axios from 'axios';
const config = { headers: { 'Content-Type': 'application/json' } };
const configFile = { headers: {'Content-Type': 'multipart/form-data' }};

const WritablePort = 'http://localhost:5000';
const UsersPort    = 'http://localhost:5001';

export const userRequests = {
      login: ( ) => console.log( UsersPort )
};

export const WritableRequests = {

      generateBookmark : ( url ) => new Promise( ( resolve , reject ) => {

        axios.get( `${ WritablePort }/api/v0/writable/bookmark?scrapeURL=${ url }`)
             .then(  res => resolve( res.data ) )
             .catch( err => reject( err ) );
      }) ,

      imageUpload: ( file ) => {
          var formData = new FormData();
              formData.append('file' , file );
          return new Promise( ( resolve , reject ) => {
                  axios({  method: 'post', url: `${WritablePort}/image` , data: formData , config: configFile })
                     .then(  imageURL => resolve( imageURL.data ))
                     .catch( err => reject( err.response.data ));
          });
      } , 
      imageDelete: ( fileId ) => {

      }
};

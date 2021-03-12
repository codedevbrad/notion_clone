import axios from 'axios';
const config = { headers: { 'Content-Type': 'application/json' } };
const configFile = { headers: {'Content-Type': 'multipart/form-data' }};

const PORT = `http://localhost:5000`;

export const requests = ( { bookmarkUrl , imagesURLS } ) => ({
      generateBookmark : ( url ) => new Promise( ( resolve , reject ) => {
         axios.get( `${ PORT }/?url=${ url }`)
              .then(  res => resolve( res.data ) )
              .catch( err => reject( err ) );
      }) ,

      imageGet : ( file ) => new Promise( ( resolve , reject ) => {
          axios.get( `${ PORT }/image?name=${ file }` )
               .then(  res => resolve( res.data ) )
               .catch( err => reject( err ) );
      }) ,

      imageUpload: ( file ) => {
          var formData = new FormData();
              formData.append('file' , file );
          return new Promise( ( resolve , reject ) => {
                  axios({  method: 'post', url: `${PORT}/image` , data: formData , config: configFile })
                     .then(  imageURL => resolve( imageURL.data ))
                     .catch( err => reject( err.response.data ));
          });
      }
});

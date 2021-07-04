import axios from 'axios';
import { getAuthToken } from './social/social_token';

const config = { headers: { 'Content-Type': 'application/json' } };
const configFile = { headers: {'Content-Type': 'multipart/form-data' }};

const WritablePort = 'http://localhost:5000/api/v0';
const UsersPort    = 'http://localhost:5001/api/v0';

const configAuth = ( ) => {

      let token = getAuthToken();

      return { headers: { 
            Authorization: `Bearer ${ token }` , 
            'Content-Type': 'application/json'
      } }
}

class UserRequests {

      constructor ( ) {
            if ( UserRequests.instance == null ) {
                  this.token = null;
                  UserRequests.instance = this;
            }
            return UserRequests.instance;
      }

      getUser ( ) {
            return new Promise( ( resolve , reject ) => {
                  
                  let token = getAuthToken();

                  axios.get(`${ UsersPort }/users/get` , { headers: { Authorization: `Bearer ${ token }` } } )
                        .then(  res => {
                             
                              resolve( res.data )
                        })
                        .catch( err => reject( err.response.data ));
            });
      } 

      login ( email , googleId ) {
            return new Promise( ( resolve , reject ) => {
                  const body = JSON.stringify({
                        username: email ,
                        password: googleId
                  });
                  axios.post(`${ UsersPort }/users/login` , body , config )
                        .then(  res => resolve( res.data ))
                        .catch( err =>  reject( err.response.data ));
            });
      }
}

class WritableRequests {
      
      constructor ( ) {
            if ( WritableRequests.instance == null ) {
                  WritableRequests.instance = this;
            }
            return WritableRequests.instance;
      }

      pageAccess ( workspaceId ) {

            return new Promise( ( resolve , reject ) => {

                  let token = getAuthToken();

                  axios.get(`${ WritablePort }/writable/access?space=${ workspaceId }` , { headers: { Authorization: `Bearer ${ token }` } } )
                       .then(  res => resolve( res.data ))
                       .catch( err => reject( err.response.data ));
            });
      } 

      sync ( ) {

      }

      getWritable ( writableId ) {
            return new Promise( ( resolve , reject ) => {
                  axios.get(`${ WritablePort }/writable?writableId=${ writableId }` , configAuth() )
                       .then( res => resolve( res.data ))
                       .catch( err => reject( err.response.data ));
            });
      }

      getWritables ( ) {
            return new Promise( ( resolve , reject ) => {
                  axios.get(`${ WritablePort }/writables` , configAuth() )
                       .then( res => resolve( res.data ))
                       .catch( err => reject( err.response.data ));
            });
      }

      createWritable ( writablename ) {

            return new Promise( ( resolve , reject ) => {

                  const body = JSON.stringify({ writablename });

                  axios.post(`${ WritablePort }/writable/` , body , configAuth() )
                       .then(  res => {
                             console.log( res.data )
                             resolve( res.data );
                        })
                       .catch( err => reject( err.response.data ));
            });
      }

      update ( model ) {
      
            return new Promise( ( resolve , reject ) => {

                  axios.put( `${ WritablePort }/writable/` , configAuth() )
                        .then(  res => resolve( res.data ) )
                        .catch( err => reject( err ) );
            });
      }

      generateBookmark ( url ) {
            return new Promise( ( resolve , reject ) => {

                  axios.get( `${ WritablePort }/writable/bookmark?scrapeURL=${ url }`)
                        .then(  res => resolve( res.data ) )
                        .catch( err => reject( err ) );
            });
      }

      imageUpload ( file ) {
            return new Promise( ( resolve , reject ) => {
                  var formData = new FormData();
                        formData.append('file' , file );
                  axios({  method: 'post', url: `${WritablePort}/writable/image` , data: formData , config: configFile })
                        .then(  imageURL => resolve( imageURL.data ))
                        .catch( err => reject( err.response.data ));
            });
      }
}


const userRequests = new UserRequests();
Object.freeze( userRequests );

const writableRequests = new WritableRequests();
Object.freeze( writableRequests );

export {
    userRequests , writableRequests
}
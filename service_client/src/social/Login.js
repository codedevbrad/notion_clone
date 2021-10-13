import React, { useContext } from 'react';
import GoogleLogin from 'react-google-login';
import { SocialContext } from './social_context';
import useNavigate from '../utils/util.navigatePage';

const SocialLogin = ( ) => {

    let { changePage } = useNavigate();

    let { loginUserState } = useContext( SocialContext ); 

    const responseGoogleError = ( error ) => {
         console.log( 'error' , error );
    }

    const responseGoogleSuccess = ( { profileObj} ) => {
        
         const { email , googleId } = profileObj;

         loginUserState({ email , googleId })
            .then( workspacePage => changePage( workspacePage ))
            .catch( err => console.log( err ));
    }

    return (
        <div id="main__login">
            <div className="login__center">
                 <GoogleLogin
                    clientId={ process.env.REACT_APP_API_KEY }
                    buttonText="Login"
                    onSuccess={ responseGoogleSuccess }
                    onFailure={ responseGoogleError }
                    cookiePolicy={'single_host_origin'}
                 />
            </div>
        </div>
    )
}

export default SocialLogin;
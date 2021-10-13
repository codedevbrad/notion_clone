import React , { createContext , useState } from 'react';
import { userRequests } from '../network_requests';
import { setAuthToken } from './social_token';

export const SocialContext = createContext();

const SocialContextProvider = ( props  ) => {

    const { login , getUser } = userRequests;
        
    const [ user   , setUser  ] = useState( { } );
    const [ isUser , setUserBoolean ] = useState( false );

    const loginUserState = ( { email , googleId } ) => new Promise( ( resolve , reject ) => {
        login( email , googleId )
            .then( response => {
                let { user , token } = response;
                setUser( user );
                setUserBoolean( true );
                setAuthToken( token );
                resolve('/workspace/welcome');
            })
            .catch( err => {
                console.log( err );
                reject( err );
            });
    });

    const getUserFromDb = ( ) => new Promise( ( resolve , reject ) => {
            getUser()
                .then( user => {
                    setUser( user );
                    setUserBoolean( true );
                    resolve();
                })
                .catch( err => {
                    console.log( err );
                    reject('/login');
                });
    });

    const logoutState = ( ) => {
        setUserBoolean( false );
        setUser( { } );
        // remove token from localstorage.
    }

    return (
        <SocialContext.Provider value={ {
            user , isUser , loginUserState , logoutState , getUserFromDb
        } }>

            { props.children }

        </SocialContext.Provider>
    );
}

export default SocialContextProvider;
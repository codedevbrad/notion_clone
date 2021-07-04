
export function getAuthToken ( ) {
    return localStorage.getItem( 'user_token' );
}

export function setAuthToken ( value ) {
    return localStorage.setItem( 'user_token' , value );
}

export function removeAuthToken ( ) {
    localStorage.removeItem( 'user_token' );
}

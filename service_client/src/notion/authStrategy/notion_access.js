import React , { useContext , useEffect , useState } from 'react';
import { useParams } from 'react-router';
import { SocialContext } from '../../social/social_context';
import useNavigate from '../../utils/util.navigatePage';


/** 
 *  DO WE ASSUME THE USER IS LOGGED?
 *  DETERMINE ACCESS TO ROOM ( ISUSER OF SPACE ) ...
 *  NO loader ...
 */

 const NotionMessage = (  { message }) => {

    const { changePage } = useNavigate();

    return (
        <div id="notion__noaccess">
               <div> { message } </div>
               <p Onclick={ ( ) => changePage( '/welcome' ) }> back to my content </p>
        </div>
    )
}

const NotionLoading = ( ) => {

    return (
        <div id="notion__loading">
               <div> determining access ... </div>
        </div>
    )
}

/** 
 *  -  Not allowed.
 *  -  Page does not exist.
 */

const NotionPageAccess = ( { children } ) => {

    const [ hasAccess , setAccess ] = useState( {
            access: false , 
            determinedAccess: false , 
            accessMessage: ''
    } );

    let { idroom } = useParams();

    // change this to the writable network query...
    const { getUserFromDb } = useContext( SocialContext );

    useEffect( ( ) => {

        console.log( 'checking user is logged and has access to' , idroom );

        // re-write this function to check access instead.
           // writable does not exist
           // writable was found by querying writable by userId and writableId..

        getUserFromDb()
            .then( ( ) => setAccess( { 
                access : true
             }) )
            .catch( ( notAccessMSG ) => setAccess( {
                access : false , accessMessage : notAccessMSG
            }) );
    } , [ ] );

    return (
        <div id="notion_page">
                {  hasAccess.access && { children } }
                { !hasAccess.access && !hasAccess.determinedAccess && <NotionLoading /> }
                { !hasAccess.access &&  hasAccess.determinedAccess && <NotionMessage message={ hasAccess.accessMessage } /> }
        </div>
    )
}

export default NotionPageAccess;
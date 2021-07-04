import React from 'react';
import { useParams } from 'react-router';

/** 
 *  DETERMINE ACCESS TO ROOM ( LOGGED , ISUSER OF SPACE ) ...
 */

const NotionPageAccess = ( ) => {

    let { idroom } = useParams();

    return (
        <div id="notion_page">

        </div>
    )
}

export default NotionPageAccess;
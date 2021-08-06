import React, { useContext, useEffect , useState } from 'react';
import { Offline } from "react-detect-offline";
import { useLocation , useParams } from 'react-router-dom';
import { AppContext } from '../../context';

// import loadingSpinner component from template.

import './sync.scss';


const NotionSaveSync = (  ) => {

    const [ state , updateSync ] = useState( [ true , 'no new changes' ] );

    // session state true
            // no new changes.

    // session state false - saving new changes & loader component.
            // 5 seconds later
               // reset state to false.
    
    // logic performed in appContext.
     
    return (
       <div className={ `system_notify system_${ state ? "synced" : "updating" }` }> 
       
            <p> { state[ 1 ] } </p>
       
       </div>
    )
}

export default NotionSaveSync;
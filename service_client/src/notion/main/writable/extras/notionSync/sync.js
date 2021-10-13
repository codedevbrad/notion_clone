import React, { useContext, useEffect , useState } from 'react';
import { Offline } from "react-detect-offline";
import { useLocation , useParams } from 'react-router-dom';
import { AppContext } from '../../context';

// import loadingSpinner component from template.

import './sync.scss';

const calcPrevious = ( curr , size ) => curr > 0;

const calcNext = ( curr , size ) => curr < size;

const NotionHistory = ( ) => {

        let { redoHistory , redoHistoryProcedure } = useContext( AppContext );
        let { curr , size } = redoHistory;

        const handleHistoryTraversal = ( type , allowed ) => {
                if ( type === 'prev' && allowed ) { 
                        redoHistoryProcedure('prev'); 
                }
                else if ( type === 'next' && allowed ) { 
                        redoHistoryProcedure('next'); 
                }
                else { 
                        console.log('cannot change history'); 
                }
        }

        useEffect( ( ) => {     
                redoHistoryProcedure('build');
        } , [ ] );

        return (
                <div className={ 'history' }>
                        <div className={`history-btn ${ calcPrevious( curr ) ? 'active' : '' }`} 
                               onClick={ () => handleHistoryTraversal('prev' , calcPrevious( curr ) )
                        }> 
                             <i className="fas fa-long-arrow-alt-left"> </i>
                        </div>

                        <div className={`history-btn ${ calcNext( curr , size ) ? 'active' : '' }`} 
                               onClick={ () => handleHistoryTraversal('next' , calcNext( curr , size ) )
                        }> 
                             <i className="fas fa-long-arrow-alt-right"> </i>      
                        </div>
                </div>
        )
}


const NotionSaveSync = (  ) => {

    const { writingChanges } = useContext( AppContext );

    const {  state , msg } = writingChanges;

    // session state true
            // no new changes.

    // session state false - saving new changes & loader component.
            // 5 seconds later
               // reset state to false.
    
    // logic performed in appContext.
     
    return (
       <div className={ `system_notify` }> 
       
            <NotionHistory />
            <div className={`system_message system_${ state ? "required" : "synced" }` }>
                     <p> { msg } </p>
            </div>
       
       </div>
    )
}

export default NotionSaveSync;
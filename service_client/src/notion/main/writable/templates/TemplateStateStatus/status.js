import React from 'react';

const StateStatus = ( object ) => {
    return (
        <div> 
            { JSON.stringify( { object  }) }
        </div>
    )
}

export default StateStatus;
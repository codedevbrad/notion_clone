import React from 'react';

const TextFormUpload = ( { state , change } ) => {
    return (
            <input type="text"   
            pastable_override='true'
            value={ state } 
            placeholder={ `. . .`} onChange={ ( evt ) => change( evt.target.value ) } 
        />
    )
}

export default TextFormUpload;
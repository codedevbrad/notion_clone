import React , { useState } from 'react';

export const errors = ( ) => {
    let [ error , setError ] = useState( false );
    return {
        error , setError
    }
}
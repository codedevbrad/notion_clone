import React , { useEffect } from 'react';

const usePastable = ( element ) => {

    useEffect( ( ) => {

      element.addEventListener( 'onpaste' , handleOnPaste , true );
      return () => (
          element.removeEventListener( 'onpaste' , handleOnPaste , true );
      )
    } , [ ] );
}

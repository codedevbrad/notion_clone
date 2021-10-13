import { AppContext } from '../context';
import React , { useContext }  from 'react';
import ContentEditable  from 'react-contenteditable';

let timeout = null;

const PageHeading = ( ) => {
    const { heading , updateHeading , saveUpdateToDatabase } = useContext( AppContext );

    // update writablepage and sync with database.

    const handleChange = ( evt ) => { 
        let text = evt.target.value;
        updateHeading( value => text );

        if( timeout ) clearTimeout( timeout );
        timeout = setTimeout( ( ) => {
             saveUpdateToDatabase( 'heading' , text );
        }, 2500 );
    };

    return (
      <ContentEditable html={ heading }
                   onChange={ ( e ) => handleChange( e )}
                  className={ "editable editable-heading" }
                placeholder={ "Untitled" }
                    tagName={ 'h3' }
      />
    )
}

export default PageHeading;

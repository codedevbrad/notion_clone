import { AppContext } from '../context';
import React , { useContext }  from 'react';
import ContentEditable  from 'react-contenteditable';

const PageHeading = ( ) => {
    const { heading , updateHeading } = useContext( AppContext );

    // update writablepage and sync with database.

    const handleChange = ( evt ) => {
        updateHeading( value => evt.target.value );
    };

    return (
      <ContentEditable html={ heading }
                   onChange={ ( e ) => handleChange( e )}
                  className={ "editable editable-heading" }
                placeholder={ "Untitled" }
                    tagName={ 'h3'}
      />
    )
}

export default PageHeading;

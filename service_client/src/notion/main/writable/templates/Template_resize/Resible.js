import React, { Fragment , useState } from 'react';
import ResizeTooltip from '../../blocks/block.components/image/tooltip/tooltip';

const ResisableBlock = ( { children , handleResize , MenuItems , dropdown_flow , dropdown_scheme } ) => {

    const [ toolbar , setToolbarOpen ] = useState( false );
    
    const handleResize = ( newSize ) => {
        console.log( newSize );
    }

    const handleToolbar = ( element ) => {
        setToolbarOpen( true );
    }

    const handleToolbarclose = ( ) => {
        setToolbarOpen( false );
    }

    return (
        <Fragment>
              <ResizeTooltip dropState={ toolbar } close={ handleToolbarclose } required={ MenuItems } flow={ 'horz' } scheme={ 'dark' } />
              { children }
        </Fragment>
    )
}

export default ResisableBlock;
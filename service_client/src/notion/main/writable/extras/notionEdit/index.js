import React, { useContext } from 'react';
import { AppContext } from '../../context';

import './style.scss';

const NotionEdit = ( ) => {

    const { dragSelection , togglecanEdit } = useContext( AppContext );

    return (
        <p className={ `edit_control ${ dragSelection.canDrag ? 'edit_control_on' : ''  } `} onClick={ () => togglecanEdit() }>
             <i className="fas fa-edit"> </i>
         </p>
    )
}

export default NotionEdit;
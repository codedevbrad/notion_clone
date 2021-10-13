import React , { Fragment , useContext }  from 'react';
import { AppContext } from '../context';

import useComponentVisible from '../useEffects/useClickBoundary';
import styles from './tooltips.module.scss';

const TooltipSection = ( ) => {

    const { highlighted , tooltip_s_coordinates , closeTooltips , handleWrtableBlockUpdate } = useContext( AppContext );

    const { state , coor } = tooltip_s_coordinates;


    const handleBlockDeletion = ( ) => {
        handleWrtableBlockUpdate( 'delete' , highlighted );
        closeTooltips();
    }

    const {
     ref
    } = useComponentVisible( state , closeTooltips , [ 'content_edit' ] , 'section'  );

    return (
        <Fragment>
          { state &&
            <div className={`tooltip ${ styles.tooltip_section }`} style={ { left: coor[0] - 100, top: coor[1] - 10 } } ref={ ref }>
                <ul>
                    <li onClick={ ( ) => handleBlockDeletion() }> delete </li>
                    <li> turn into </li>
                </ul>
            </div>
          }
        </Fragment>
    )
}

export default TooltipSection;

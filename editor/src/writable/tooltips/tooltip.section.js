import React , { Fragment , useState , useRef , useEffect , useContext }  from 'react';
import { AppContext } from '../context';

import useComponentVisible from '../useEffects/useClickBoundary';

const TooltipSection = ( ) => {

    const { tooltip_s_coordinates , closeTooltips } = useContext( AppContext );

    const { state , coor } = tooltip_s_coordinates;

    const {
     ref
    } = useComponentVisible( state , closeTooltips , [ 'content_edit' ] , 'section'  );

    return (
        <Fragment>
          { state &&
            <div className="tooltip tooltip_section" style={ { left: coor[0] - 100, top: coor[1] - 10 } } ref={ ref }>
              <ul>
                <li> delete    </li>
                <li> turn into </li>
              </ul>
            </div>
          }
        </Fragment>
    )
}

export default TooltipSection;

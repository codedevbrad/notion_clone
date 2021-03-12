import React , { Fragment , useState , useRef , useEffect , useContext }  from 'react';
import { AppContext } from '../context';

import useComponentVisible from '../useEffects/useClickBoundary';

const TooltipHighlight = ( ) => {
    const {
      selectedText , closeTooltips , tooltip_h_coordinates ,
      handleBlockTagUpdate
    } = useContext( AppContext );

    let { state , coor } = tooltip_h_coordinates;

    const {
     ref
   } = useComponentVisible( state , closeTooltips , [ 'content_block' , 'tooltip' ] , 'highlght'  );

    const turnInto = ( type , tag ) => {
        handleBlockTagUpdate( type , tag );
    }

    return (
        <Fragment>

        { state &&
          <div className="tooltip tooltip_highlight" style={ { left: coor[0] , top: coor[1] } } ref={ ref }>
              <ul>
                  <li onClick={ () => turnInto('tag_update' , 'p' )}>    P  </li>
                  <li onClick={ () => turnInto('tag_update' , 'h1')}>   H1  </li>
                  <li onClick={ () => turnInto('tag_update' , 'h2')}>   H2  </li>
                  <li onClick={ () => turnInto('tag_update' , 'h3')}>   H3  </li>
                  <li onClick={ () => turnInto('highlight'  , null)}>   HL  </li>
                  <li onClick={ () => turnInto('underline'  , null)}>    U  </li>
              </ul>
          </div>
        }
        </Fragment>
    )
}

export default TooltipHighlight;

import React , { Fragment , useState , useRef , useEffect , useContext }  from 'react';
import { AppContext } from '../../context';

import useComponentVisible from '../useEffects/useClickBoundary';
import { scrubOffTags } from '../utils/util.blockHelpers';

const TooltipHighlight = ( ) => {
    const {
      writing , updateWriting , highlighted , selectedText , closeTooltips , tooltip_h_coordinates
    } = useContext( AppContext );

    let { state , coor } = tooltip_h_coordinates;

    const {
     ref
   } = useComponentVisible( state , closeTooltips , [ 'content_block' , 'tooltip' ] , 'highlght'  );

    const turnInto = ( type ) => {

           let arrayCopy = [ ...writing ];
           let currentItem = arrayCopy[ highlighted ];
           let { element , selected , selRange } = selectedText;

           switch ( type ) {
               case 'underline':
                let newText_U = currentItem.replace( selected , `<div class="underlined"> ${ selected } </div>` );
                arrayCopy[ highlighted ].text = newText_U;
                break;
               case 'highlight':
                let newText_HL = `<div class="highlighted"> ${ scrubOffTags( currentItem ) } </div>`;
                arrayCopy[ highlighted ].text = newText_HL;
                break;

              case 'header1':
                arrayCopy[ highlighted ].tag = 'h2';
                break;
              case 'header2':
                arrayCopy[ highlighted ].tag = 'h2';
                break;
              case 'header3':
                arrayCopy[ highlighted ].tag = 'h3';
                break;
              case 'paragraph':
                arrayCopy[ highlighted ].tag = 'p';
                break;
           }
           updateWriting( arrayCopy );
    }

    return (
        <Fragment>

        { state &&
          <div className="tooltip tooltip_highlight" style={ { left: coor[0] , top: coor[1] } } ref={ ref }>
              <ul>
                  <li onClick={ () => turnInto('paragraph')}>  P  </li>
                  <li onClick={ () => turnInto('header2')}>   H2  </li>
                  <li onClick={ () => turnInto('header3')}>   H3  </li>
                  <li onClick={ () => turnInto('highlight')}> HL  </li>
                  <li onClick={ () => turnInto('underline')}>  U  </li>
              </ul>
          </div>
        }
        </Fragment>
    )
}

export default TooltipHighlight;

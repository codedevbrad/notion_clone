import React , { Fragment , useState , useRef , useEffect , useContext }  from 'react';
import { AppContext } from '../../context';

import useComponentVisible from '../utils/util.handleVisibility';
import { scrubOffTags } from '../utils/util.blockHelpers';

const TooltipHighlight = ( ) => {
    const {
      writing , updateWriting , highlighted , updateHighlighted , tooltip_h_coordinates , update_tooltip_h_coordinates ,
      selectedText , updateSelected , closeTooltips
    } = useContext( AppContext );

    let { state , coor } = tooltip_h_coordinates;

    const {
     ref
   } = useComponentVisible( state , closeTooltips , [ 'content_block' , 'tooltip' ] , 'highlght'  );

    const turnInto = ( type ) => {

           let arrayCopy = [ ...writing ];

           let highlighted_is_multiLevel = Array.isArray( highlighted );
           let currentItem = highlighted_is_multiLevel ? arrayCopy[ highlighted[0] ].text[ highlighted[1] ].text : arrayCopy[ highlighted ].text;

           let { element , selected , selRange } = selectedText;

           const blockLevelAlter = ( value ) => {
                if ( highlighted_is_multiLevel ) {
                   arrayCopy[ highlighted[0] ].text[ highlighted[1] ].text = value;
                }  else {
                   arrayCopy[ highlighted ].text = value;
                }
           }

           // let newText_U = currentItem.replace( selected , `<div class="underlined"> ${ selected } </div>` );

           switch ( type ) {
               case 'underline':
                let newText_U = currentItem.replace( selected , `<div class="underlined"> ${ selected } </div>` );
                blockLevelAlter( newText_U );
                break;
               case 'highlight':
                let newText_HL = `<div class="highlighted"> ${ scrubOffTags( currentItem ) } </div>`;
                blockLevelAlter( newText_HL );
                break;
              case 'header2':
                let newText_H2 = `<h2> ${ scrubOffTags( currentItem ) } </h2>`;
                blockLevelAlter( newText_H2 );
                break;
              case 'header3':
                let newText_H3 = `<h3> ${ scrubOffTags( currentItem ) } </h3>`;
                blockLevelAlter( newText_H3 );
                break;
              case 'paragraph':
                let newText_p = ` ${ scrubOffTags( currentItem ) } `;
                blockLevelAlter( newText_p );
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

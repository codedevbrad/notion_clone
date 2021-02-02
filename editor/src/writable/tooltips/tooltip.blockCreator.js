import React , { Fragment , useState , useRef , useEffect , useContext }  from 'react';
import { AppContext } from '../../context';

import useComponentVisible from '../useEffects/useClickBoundary';
import { makeFocus , scrubOffTags } from '../utils/util.blockHelpers';

const BlockCreation  = ( ) => {
    const { writing , updateWriting , highlighted , tooltip_b_coordinates , closeTooltips } = useContext( AppContext );
    const { state , coor , anchor } = tooltip_b_coordinates;

    const createNewBlock = async ( type ) => {
          const arrayCopy = [ ...writing ];
          const currentElement = scrubOffTags( arrayCopy[ highlighted ].text );
          const stayInSection  = currentElement.length == 1;

          switch ( type ) {
            case 'text':
                if ( !stayInSection ) {
                  arrayCopy.splice( highlighted + 1 , 0 , { text: '' , type: 1 } );
                  await updateWriting( arrayCopy );
                  makeFocus( highlighted , 'next' , false );
                  // remove a / value from the current section.
                  // keep all tags. just remove the / value from the text.
                  // if multiple / exist. how do we get the position of the / we need to remove.

                } else {
                  writing[ highlighted ].text = '';
                  await updateWriting( arrayCopy );
                  makeFocus( highlighted , 'curr' , false );
                }
                closeTooltips( );
                break;
            case 'bullet':

                return { text: [ '' ] , type: 2 };
                break;
            default:
          }
    }

    return (
        <Fragment>
            { state &&
              <div className="tooltip tooltip_blockcreation" style={ { left: coor[0] , top: coor[1] - 10 } }>
                    <h3> create a new ... </h3>
                    <div onClick={ ( ) => createNewBlock( 'text' ) }>
                        <h3> Text block </h3>
                        <p> start writing text. </p>
                    </div>
                    <div onClick={ ( ) => createNewBlock( 'bullet' ) }>
                        <h3> Bulleted list </h3>
                        <p> simple bulleted block for making lists</p>
                     </div>
              </div>
            }
        </Fragment>
    )
}

export default BlockCreation;

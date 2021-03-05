import React , { Fragment , useState , useRef , useEffect , useContext }  from 'react';
import { AppContext } from '../../context';

import useComponentVisible from '../useEffects/useClickBoundary';
import { getblockData } from '../blocks/blockJSON';
import { makeFocus , scrubOffTags } from '../utils/util.blockHelpers';

const BlockCreation  = ( ) => {
    const { writing , highlighted , tooltip_b_coordinates , closeTooltips , handleWrtableBlockUpdate } = useContext( AppContext );
    const { state , coor , anchor } = tooltip_b_coordinates;

    const {
     ref
   } = useComponentVisible( state , closeTooltips , [  ] , 'blockcreator'  );

    const createNewBlock = async ( type ) => {
          const arrayCopy = [ ...writing ];
          const currentElement = scrubOffTags( arrayCopy[ highlighted ].text );

          switch ( type ) {
            case 'text':
                  let blockObject_1 = getblockData('text');
                  await handleWrtableBlockUpdate( 'new' , highlighted , blockObject_1 );
                  makeFocus( highlighted , 'next' , false );
                  closeTooltips( );
                  break;
            case 'bullet':
                  let blockObject_2 = getblockData('bullet');
                  await handleWrtableBlockUpdate( 'new' , highlighted , blockObject_2 );
                  makeFocus( highlighted , 'next' , false );
                  closeTooltips( );
            default:
          }
    }

    return (
        <Fragment>
            { state &&
              <div className="tooltip tooltip_blockcreation" style={ { left: coor[0] , top: coor[1] - 10 } } ref={ ref }>
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

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

    const createNewBlock = async ( type , targetElement ) => {
          const arrayCopy = [ ...writing ];
          const currentElement = scrubOffTags( arrayCopy[ highlighted ].text );

          let blockObject = getblockData( type );

          await handleWrtableBlockUpdate( 'new' , highlighted , blockObject );
          if ( typeof targetElement == 'string' && targetElement ) {
              makeFocus( highlighted , 'next' , {
                  elementTarget: targetElement
              } );
          }
          closeTooltips( );
    }

    return (
        <Fragment>
            { state &&
              <div className="tooltip tooltip_blockcreation" style={ { left: coor[0] , top: coor[1] - 10 } } ref={ ref }>
                    <h3> create a new ... </h3>
                    <div onClick={ ( ) => createNewBlock( 'text' , '.editable' ) }>
                        <h3> Text block </h3>
                        <p> start writing text. </p>
                    </div>
                    <div onClick={ ( ) => createNewBlock( 'bullet' , '.editable' ) }>
                        <h3> Bulleted list </h3>
                        <p> simple bulleted block for making lists</p>
                    </div>
                    <div onClick={ ( ) => createNewBlock( 'bookmark' , 'input' ) }>
                        <h3> Bookmark </h3>
                        <p>  save bookmarks by pasting in a link </p>
                    </div>
              </div>
            }
        </Fragment>
    )
}

export default BlockCreation;

import React , { Fragment , useState , useRef , useEffect , useContext }  from 'react';
import { AppContext } from '../../context';

import useComponentVisible from '../useEffects/useClickBoundary';
import { getblockData , blockChoices } from '../blocks/blockJSON';
import { makeFocus , scrubOffTags } from '../utils/util.blockHelpers';
import { v4 as uuidv4 } from 'uuid';

const BlockCreation  = ( ) => {
    const { writing , highlighted ,
            tooltip_b_coordinates , update_tooltip_b_coordinates , tooltip_b_blocks , update_tooltip_b_blocks ,
            closeTooltips , handleWrtableBlockUpdate
          } = useContext( AppContext );

    const { state , coor , anchor , blocks } = tooltip_b_coordinates;
    const { block_state , block_query } = tooltip_b_blocks;

    const {
     ref
    } = useComponentVisible( state , closeTooltips , [  ] , 'blockcreator'  );

    const createNewBlock = async ( type , targetElement ) => {
          const arrayCopy = [ ...writing ];
          const currentElement = scrubOffTags( arrayCopy[ highlighted ].text );

          let blockObject = getblockData( type ).block;

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
                    <h3> create a new .. { block_query } </h3>
                    { block_state.map( ( blockDescription , index ) =>
                        <div key={ uuidv4() }>
                            <h3> { blockDescription.block_title }      </h3>
                            <p>  { blockDescription.block_description } </p>
                        </div>
                    )}
              </div>
            }
        </Fragment>
    )
}

export default BlockCreation;

/*
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
*/

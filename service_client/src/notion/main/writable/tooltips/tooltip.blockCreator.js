import React , { Fragment , useContext, useEffect, useRef }  from 'react';
import { AppContext } from '../context';

import useComponentVisible from '../useEffects/useClickBoundary';
import { blockChoices } from '../blocks/blockJSON';
import { makeFocus } from '../utils/util.blockHelpers';
import { v4 as uuidv4 } from 'uuid';

import styles from './tooltips.module.scss';


const BlockCreation  = ( ) => {

    let inputRef = useRef( null );

    const { highlighted ,
            tooltip_b_coordinates , tooltip_b_blocks , update_tooltip_b_blocks ,
            closeTooltips , handleWrtableBlockUpdate
          } = useContext( AppContext );

    const { state , coor } = tooltip_b_coordinates;
    const { block_state , block_query } = tooltip_b_blocks;

    const {
     ref
    } = useComponentVisible( state , closeTooltips , [ ] , 'blockcreator'  );

    const createNewBlock = async ( block , targetElement ) => {
          await handleWrtableBlockUpdate( 'new' , highlighted , block );
          if ( typeof targetElement == 'string' && targetElement ) {
               makeFocus( highlighted , 'next' , {
                    elementTarget: targetElement
               } );
          }
          closeTooltips( );
    }

    const handleSearch = ( evt ) => {
          let block_searchString = evt.target.value;
          let generatedBlocksToShow = blockChoices( true , block_searchString );
          update_tooltip_b_blocks( { block_state: generatedBlocksToShow , block_query: block_searchString } );
    }

    useEffect( ( ) => {
            
            if ( state ) {
                inputRef.current.focus(); 
            }
    } , [ state ] );


    return (
        <Fragment>
            { state &&
              <div className={`tooltip ${ styles.tooltip_blockcreation }`} style={ { left: coor[0] , top: coor[1] - 10 } } ref={ ref }>
                    <h3> create a new .. </h3>

                    <input className={`${ styles.blockCreation_input }` } type="text" value={ block_query }
                            onChange={ ( evt ) => handleSearch( evt ) }
                         placeholder="filter blocks" 
                                 ref={ inputRef }
                    />

                    <section className={ `${ styles.blockCreation_blockchoices }` }>

                        { block_state.map( ( block , index ) =>

                            <div key={ uuidv4() } className={ `${ styles.blockCreation_choice }`} onClick={ ( ) => createNewBlock( block.block , block.definitions.classFocus ) }>
                                  <section className={ `${ styles.blockChoice_image } `}>
                                    <img src={ block.definitions.publicUrl } alt={ block.definitions.block_title } />
                                  </section>
                                  <section className={ `${ styles.blockChoice_description } ` }>
                                    <h3> { block.definitions.block_title }      </h3>
                                    <p>  { block.definitions.block_description } </p>
                                  </section>
                            </div>
                        )}

                    </section>
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

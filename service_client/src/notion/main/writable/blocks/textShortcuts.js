import { useEffect , useContext } from 'react';
import { AppContext } from '../context';

import { getblockData } from './blockJSON';

// why placeCaret and detectKeyIsCharacter is needed?.
import { 
      scrubOffTags , makeFocus , getTextWidth , placeCaretAtEnd , detectKeyIsCharacter 
} from '../utils/util.blockHelpers';

/**
  @peram { target } element to attach keybind function to.
  @peram { blockType } block to create when pressing enter as a keybind.
  @peram { options } not yet programmed.
*/

function useComponentKeybinds( target, blockType , ...options ) {

  const {
    writing , highlighted , handleWrtableBlockUpdate ,
    tooltip_b_coordinates , update_tooltip_b_coordinates , tooltip_b_blocks  ,
    closeTooltips
  } = useContext( AppContext );

  // could be used to filtern inline while writing instead of the filter search.
  const { block_state , block_query } = tooltip_b_blocks;

  const handleKeybind = async ( evt  ) => {

                // what does this do again?
                let currentAnchor = window.getSelection().anchorOffset;

                const currentText = writing[ highlighted ].text;
                const currentText_scrubbed = scrubOffTags( currentText );

                const block_toCreate = getblockData( blockType ).block;

                let keyInput   = evt.key;
                let keyElement = evt.target.innerHTML;

                // if a bullet element and < 1 then convert that block to a text element.

                if ( keyInput === 'Backspace' && !tooltip_b_coordinates.state ) {
                     if ( currentText_scrubbed < 1 ) {
                          evt.preventDefault();
                          await handleWrtableBlockUpdate( 'delete' , highlighted );
                     }
                }
                else if ( keyInput === 'Backspace' && tooltip_b_coordinates.state ) {
                          let textMatch = keyElement.slice( keyElement.length - 1 , keyElement.length );
                          if ( textMatch === '/' && tooltip_b_coordinates.state === true ) {
                              closeTooltips();
                          }
                }
                else if ( keyInput === 'Enter' && !tooltip_b_coordinates.state ) {
                     evt.preventDefault();
                     await handleWrtableBlockUpdate( 'new' , highlighted , block_toCreate );
                     makeFocus( highlighted , 'next' , {
                        elementTarget: '.editable'
                     } );
                }
                else if ( keyInput === '/' ) {
                     evt.preventDefault();
                     let curr_elm_coors = evt.target.getBoundingClientRect();
                     let curr_elm_text  = scrubOffTags( evt.target.innerHTML );
                     let curr_elm_text_length = getTextWidth( curr_elm_text );
                     update_tooltip_b_coordinates( {
                        ...tooltip_b_coordinates , state: true , coor: [ curr_elm_coors.x + ( curr_elm_text_length + 25 ) , curr_elm_coors.y + 40 ]
                     });
                }
                else if ( tooltip_b_coordinates.state ) {
                    // let keysAreAllowed   = detectKeyIsCharacter( evt );
                    let keysTriggerClose = evt.code === 'Space' || evt.key === 'Enter';
                    if ( keysTriggerClose ) {
                         closeTooltips();
                    }
                }
  }

  useEffect( ( ) => {
      const targetIsRef = target.hasOwnProperty("current");
      const currentTarget = targetIsRef ? target.current : target;
      if (currentTarget)
        currentTarget.addEventListener( 'keydown', handleKeybind, ...options);
      return () => {
        if (currentTarget)
          currentTarget.removeEventListener( 'keydown', handleKeybind, ...options);
      };
    },
    [ target , options ]
  );
}

export default useComponentKeybinds;

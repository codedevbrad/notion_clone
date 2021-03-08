import { useState, useEffect, useRef , useContext } from 'react';

import { AppContext } from '../../context';

import { getblockData } from './blockJSON';
import { scrubOffTags , placeCaretAtEnd , makeFocus , getTextWidth } from '../utils/util.blockHelpers';


function useComponentKeybinds( target, blockType , ...options ) {

  const {
  writing , highlighted , handleWrtableBlockUpdate , tooltip_b_coordinates , update_tooltip_b_coordinates , closeTooltips
  } = useContext( AppContext );

  const filterBlock = ( stringMatch ) => {
      // convert block data into an array and match based on string provided.
  }

  const handleKeybind = async ( evt  ) => {

                let currentAnchor = window.getSelection().anchorOffset;

                const currentText = writing[ highlighted ].text;
                const currentText_scrubbed = scrubOffTags( currentText );

                const block_toCreate = getblockData( blockType );

                let keyInput   = evt.key;
                let keyElement = evt.target.innerHTML;

                // if a bullet element and < 1 then convert that block to a text element.

                if ( keyInput == 'Backspace' ) {
                     if ( currentText_scrubbed < 1 ) {
                          evt.preventDefault();
                          await handleWrtableBlockUpdate( 'delete' , highlighted );
                          makeFocus( highlighted , 'prev' , {
                                elementTarget: '.editable'
                          } );

                     } else {
                          let textMatch = keyElement.slice( keyElement.length - 1 , keyElement.length );
                          if ( textMatch == '/' && tooltip_b_coordinates.state == true ) {
                              closeTooltips();
                          }
                     }
                }
                else if ( keyInput == 'Enter' && !tooltip_b_coordinates.state ) {
                     evt.preventDefault();
                     await handleWrtableBlockUpdate( 'new' , highlighted , block_toCreate );
                     makeFocus( highlighted , 'next' , {
                        elementTarget: '.editable'
                     } );
                }
                else if ( keyInput == '/' ) {
                     let curr_elm_coors = evt.target.getBoundingClientRect();
                     let curr_elm_text  = scrubOffTags( evt.target.innerHTML );
                     let curr_elm_text_length = getTextWidth( curr_elm_text );
                     update_tooltip_b_coordinates( {
                        state: true , coor: [ curr_elm_coors.x + ( curr_elm_text_length + 25 ) , curr_elm_coors.y + 40 ]
                     });
                }

                else if ( tooltip_b_coordinates.state ) {
                    let curr_elm_text    = scrubOffTags( evt.target.innerHTML );
                    let keysTriggerClose = evt.code == 'Space' || evt.key == 'Enter';
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
    [target , options ]
  );
}

export default useComponentKeybinds;

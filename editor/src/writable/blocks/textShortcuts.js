import { useState, useEffect, useRef , useContext } from 'react';

import { AppContext } from '../../context';

import { getblockData } from './blockJSON';
import { scrubOffTags , placeCaretAtEnd , makeFocus } from '../utils/util.blockHelpers';

function useComponentKeybinds( target, blockType , ...options ) {

  const {
  writing , highlighted , handleWrtableBlockUpdate , tooltip_b_coordinates , update_tooltip_b_coordinates , closeTooltips
  } = useContext( AppContext );

  const handleKeybind = async ( evt  ) => {

                let currentAnchor = window.getSelection().anchorOffset;

                const currentText = writing[ highlighted ].text;
                const currentText_scrubbed = scrubOffTags( currentText );

                const block_toCreate = getblockData( blockType );

                let keyInput   = evt.key;
                let keyElement = evt.target.innerHTML;

                // if a bullet element and < 1 then convert that block to a text element.

                // await handleWrtableBlockUpdate( 'update' , highlighted , block_toCreate );

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
                else if ( keyInput == 'Enter' ) {
                     evt.preventDefault();
                     await handleWrtableBlockUpdate( 'new' , highlighted , block_toCreate );
                     makeFocus( highlighted , 'next' , {
                            elementTarget: '.editable'
                     } );
                }
                else if ( keyInput == '/' ) {
                     let curr_elm = evt.target.getBoundingClientRect();
                     update_tooltip_b_coordinates( {
                        state: true , coor: [ curr_elm.x + 50 , curr_elm.y ]
                     });
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

import { useState, useEffect, useRef , useContext } from 'react';

import { AppContext } from '../../context';

import { getblockData } from './blockJSON';
import { scrubOffTags , placeCaretAtEnd , makeFocus } from '../utils/util.blockHelpers';

function useComponentKeybinds( blockType ) {

  const {
  writing , highlighted , handleWrtableBlockUpdate , tooltip_b_coordinates , update_tooltip_b_coordinates , closeTooltips
  } = useContext( AppContext );

  const ref = useRef(null);

  const handleKeybind = async ( evt  ) => {

                let currentAnchor = window.getSelection().anchorOffset;

                const currentText = writing[ highlighted ].text;
                const currentText_scrubbed = scrubOffTags( currentText );

                // detect if text or bullet

                const block_toCreate = getblockData( blockType );

                let keyInput   = evt.key;
                let keyElement = evt.target.innerHTML;

                console.log( blockType );

                // if a bullet element and < 1 then convert that block to a text element.

                // await handleWrtableBlockUpdate( 'update' , highlighted , block_toCreate );

                if ( keyInput == 'Backspace' ) {
                     if ( currentText_scrubbed < 1 ) {
                          evt.preventDefault();
                          await handleWrtableBlockUpdate( 'delete' , highlighted );
                          makeFocus( highlighted , 'prev' , false );

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
                     makeFocus( highlighted , 'next' , false );
                }
                else if ( keyInput == '/' ) {
                     let curr_elm = evt.target.getBoundingClientRect();
                     update_tooltip_b_coordinates( {
                        state: true , coor: [ curr_elm.x + 50 , curr_elm.y ]
                     });
                }
  }

  useEffect(() => {
      document.addEventListener("keydown", handleKeybind , true);
      return () => {
        document.removeEventListener("keydown", handleKeybind , true);
      };
  });

  return { ref };
}

export default useComponentKeybinds;

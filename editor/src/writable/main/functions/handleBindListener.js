
import React , { useEffect , useContext } from 'react';
import { AppContext } from '../../context';

import useStateRef  from '../../useEffects/useStateRef';

const usePageBindListeners = ( ) => {

      const { dragSelection , updateDragSelection , handleWrtableBlockUpdate } = useContext( AppContext );
      var [ dragSelection_updated ] = useStateRef( dragSelection );

      const handleKeybind = ( evt ) => {
            let { canDrag , selected } = dragSelection_updated.current;
            if ( canDrag && evt.key === 'Backspace' ) {
                 handleWrtableBlockUpdate('delete_many' , dragSelection.selected );
            }
      }

      const handlePaste = ( evt ) => {
          evt.preventDefault();
          var clipboardData = evt.clipboardData || window.clipboardData;
          var file = clipboardData.files[ 0 ];
          let pasteText = clipboardData.getData('Text');

          console.log( pasteText , file );
          if ( file ) {
            // create new file block...
          } else if ( pasteText ) {
            // create new text block...
          }
      }

      useEffect( ( ) => {
          window.addEventListener("keydown", handleKeybind );
          window.addEventListener("paste", handlePaste );
          return ( ) => {
              window.removeEventListener("keydown", handleKeybind );
              window.removeEventListener("paste", handlePaste );
          }
      } , [ ] );
}


export default usePageBindListeners;

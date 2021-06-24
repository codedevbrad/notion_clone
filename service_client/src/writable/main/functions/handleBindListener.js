
import React , { useEffect , useContext } from 'react';
import { AppContext } from '../../context';
import useStateRef  from '../../useEffects/useStateRef';

function validURL(str) {
      var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      return !!pattern.test(str);
  }
  
  const detectLinkType = ( link ) => {
      let isLink = validURL( link );
      let isVideo = /youtube.com*/.test(link);
      return {
            isLink , isVideo 
      }
  }
  
const videoFormat = ( input ) => {
        
    let match = 'watch?v=';

    var matchIndex = input.indexOf( match );
    var split = input.slice( matchIndex + match.length );

    var correctMedia = `https://www.youtube.com/embed/${ split }`;

    return {
        url: correctMedia
    }
}


const usePageBindListeners = ( ) => {

      const { highlighted , dragSelection , updateDragSelection , handleWrtableBlockUpdate } = useContext( AppContext );
      var [ dragSelection_updated ] = useStateRef( dragSelection );

      const handleKeybind = ( evt ) => {
            let { canDrag , selected } = dragSelection_updated.current;
            if ( canDrag && evt.key === 'Backspace' ) {
                 handleWrtableBlockUpdate('delete_many' , dragSelection.selected );
            }
      }

      // must associate paste within input elements and outer page

      const handlePaste = ( evt ) => {

          var clipboardData = evt.clipboardData || window.clipboardData;
          var file = clipboardData.files[ 0 ];
          let pasteText = clipboardData.getData('Text');

          /**
           *  cursor focussed on none ( outside override data-attr )
           *    - generate at last element
           *  cursor focussed on block (inside override data-attr )
           *    - provide popup dropdown to choose between link , 
           */

          /** 
           *  image
           *    - paste as a new image block.

           *  text
           *    - when to paste inside current block.
           *    - when to paste as a new block. 
  
           *  video
           *    - when to paste as a new video block.
           *    - when to paste as a link in new block.
           *    - when to paste as a bookmark in new block.
           
           *   text / video
           *    - when to dismiss and paste as link inside current block.
           */
          
          // detect if paste is inside a paste overridable element and terminate if true.
          let pastedInsideOverride = evt.target.getAttribute('pastable_override');
          if ( !pastedInsideOverride ) {
               // create new block.
               console.log('outside and create new block');
               evt.preventDefault();
               return;
          };

          console.log('inside');

          // if paste is an image.
          if ( file ) {
            // create new image block...
          } 
          // else, paste is text - decide if url to video or just text.
          else if ( pasteText ) {
                let pasteIsVideo = detectLinkType( pasteText );

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

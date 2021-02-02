
export const defaultEditableshortcuts = ( writable , evt , textLength ) => {
      let keyInput = evt.key;
      if ( keyInput == 'Backspace'
           &&
           textLength == 0 ) {
           return {
             data: 'backspace and section is empty.'
           }
      }
      else if ( keyInput == 'Backspace'
           &&
           textLength > 0 ) {
           return {
             data: 'backspace and section is not empty'
           }
      }
      else if ( keyInput == 'Enter' ) {
           return {
              data: 'pressed enter'
           }
      }
      else if ( keyInput == '/' ) {
           return {
             data: 'Create new block'
           }
      }
      else {
         return false;
      }
}

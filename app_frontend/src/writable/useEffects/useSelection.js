import { useEffect } from 'react';
import DragSelect from 'dragselect';

const useSelection = ( state , callback ) => {
   var df;
   useEffect( ( ) => {
     if ( state ) {
         console.log('can edit');
         df = new DragSelect({
             selectables: document.getElementsByClassName('writable_section') ,
             area: document.querySelector('.Page') ,
             selectedClass: 'drag_highlighted'
         });
       df.subscribe('callback', callback );
     }
     return () => {
          if( df != undefined ) {
            df.stop();
          }
     }
   } , [ state ] );
}

export default useSelection;

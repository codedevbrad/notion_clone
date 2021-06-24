import { useEffect } from 'react';
import DragSelect from 'dragselect';

const useSelection = ( state , callback ) => {
   var df;
   useEffect( ( ) => {
     if ( state ) {
         df = new DragSelect({
             selectables: document.querySelectorAll('.content_block .content_hover') ,
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

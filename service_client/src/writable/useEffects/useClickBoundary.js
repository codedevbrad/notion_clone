import { useEffect , useRef } from 'react';

/** 
 * @param condition - elements that are allowed to be clicked which wont trigger close.
 * @param type - defines the current tooltp being used. usage for testing.
 */

function useComponentVisible( state , closeTooltips , conditions , type  ) {

  const ref = useRef(null);

  const cycleClassNodes = ( node ) => {
      return node.parentNode;
  }

  const handleClickOutside = event => {
        if ( state ) {

          var i = 0;
          var el = event.target;
          var found = false;

          while( i < 4 ) {
              let next = cycleClassNodes( el );
              let array = [ ...next.classList ];

              let test = conditions.some( el => array.includes( el ) );
              if ( array.length > 0 && test ) {
                   found = true;
                   return;
              }
              el = next;
              i++;
          }
          // clck outside ...
          if ( ref.current && !ref.current.contains(event.target) && !found ) {
              console.log('clicked outside' , type );
              closeTooltips();
          }
        }
  };

  useEffect(() => {
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
  });

  return { ref };
}

export default useComponentVisible;

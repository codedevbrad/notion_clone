
const elementHasClass = ( el , classname ) => {
      return [ ...el.classList ].includes( classname );
}

const elementHasClassDeepTraversal = ( el , conditions ) => {
      var i = 0;
      var found = false;

      const cycleClassNodes = ( node ) => {
          return node.parentNode;
      }

      while( i < 4 ) {
          let next = cycleClassNodes( el );
          let array = [ ...next.classList ];
          let test = conditions.some( el => array.includes( el ) );

          if ( array.length > 0 && test ) {
               found = true;
               return;
               i = 5;
          }
          el = next;
          i++;
      }
      return found;
}

export {
    elementHasClass ,
    elementHasClassDeepTraversal
}

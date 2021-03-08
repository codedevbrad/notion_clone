
export const getblockData = ( type ) => {
    switch ( type ) {
          case 'text' :
              return {
                  type: 1 ,
                  tag: 'p' ,
                  text: '' ,
                  marginlevel: 0
              }
              break;
          case 'bullet' :
              return {
                  type: 2 ,
                  tag: 'p' ,
                  text: '' ,
                  marginlevel: 0
              }
              break;
          case 'bookmark' :
              return {
                  type: 3 ,
                  tag: 'div' ,
                  text: '' ,
                  marginlevel: 0
              }
              break;
          case 'image' :
              return {
                  type: 4 ,
                  tag: 'img' ,
                  text: false ,
                  marginlevel: 0
              }
              break;
    }
}

const 

// {
//   text: `https://miro.medium.com/max/1050/1*72VaNWlaJ6cFx5HNshHh1w.jpeg` ,
//   type: 4 ,
//   tag: 'img' ,
//   index: 1 ,
//   pagedisplay: 0
// } ,

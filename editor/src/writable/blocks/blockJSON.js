
export const getblockData = ( type ) => {
    switch ( type ) {
          case 'text' :
              return {
                  type: 1 ,
                  tag: 'p' ,
                  text: ''
              }
              break;
          case 'bullet' :
              return {
                  type: 2 ,
                  tag: 'div' ,
                  text: ''
              }
              break;
          case 'bookmark' :
              return {
                  type: 3 ,
                  tag: 'div' ,
                  text: ''
              }
              break;
          case 'image' :
              return {
                  type: 4 ,
                  tag: 'image' ,
                  text: false
              }
              break;
    }
}


// {
//   text: `https://miro.medium.com/max/1050/1*72VaNWlaJ6cFx5HNshHh1w.jpeg` ,
//   type: 4 ,
//   tag: 'img' ,
//   index: 1 ,
//   pagedisplay: 0
// } ,

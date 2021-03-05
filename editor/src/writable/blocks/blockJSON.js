
export const getblockData = ( type ) => {
    switch ( type ) {
          case 'text' :
              return {
                  type: 1 ,
                  tag: 'p'
              }
              break;
          case 'bullet' :
              return {
                  type: 2 ,
                  tag: 'div'
              }
              break;
          case 'bookmark' :
              return {
                  type: 3 ,
                  tag: 'div'
              }
          case 'image' :
              return {
                  tyoe: 4 ,
                  tag: 'image'
              }
    }
}


// {
//   text: `https://miro.medium.com/max/1050/1*72VaNWlaJ6cFx5HNshHh1w.jpeg` ,
//   type: 4 ,
//   tag: 'img' ,
//   index: 1 ,
//   pagedisplay: 0
// } ,
// {
//   text: {
//     title: 'medium' ,
//     description: 'article for medium.com. thinking of investing, then read the top 5 tips' ,
//     link: 'https://medium.com'
//   } ,
//   type: 3 ,
//   tag: 'div' ,
//   index: 2
// } ,

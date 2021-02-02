const generateBookmark = require('../functions/generateBookmark');

const test1 = async ( event ) => {
      try {
          let data = await generateBookmark( event.url )
        return data;
      } catch ( err ) {
          return {
            err
          }
      }
}

let test = test1( {
    url: "https://medium.com/data-scraper-tips-tricks/scraping-data-with-javascript-in-3-minutes-8a7cf8275b31"
})
.then( data => console.log( data  ) );

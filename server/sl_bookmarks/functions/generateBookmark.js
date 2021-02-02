const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports = async ( url ) => {
    let data = await rp(url)
      .then(function(html) {
          let $ = cheerio.load( html );
          var title = $('meta[property="og:title"]').attr('content');
          var desc =  $('meta[property="og:description"]').attr('content');
          var link =  $('meta[property="og:url"]').attr('content');
          return {
              title , desc , link
          }
      });
    return data;
}

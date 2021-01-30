
const scrubOffTags = ( input , both ) => {
    var regex = /(<([^>]+)>)/ig
    return input.replace( regex , '' ).replace(/&nbsp;/i , "" ).trim();
}


const makeFocus = ( highlighted , direction , setToEnd ) => {

    let index = direction === 'prev' ? highlighted - 1 : highlighted + 1;
    let div = document.querySelector(`.data-content-identifier-${ direction === 'curr' ? highlighted : index } .editable`);
    div.focus();
};

function retrieveImageFromClipboardAsBlob ( pasteEvent , callback ) {
    console.log('ran')
  	if(pasteEvent.clipboardData == false){
          if(typeof(callback) == "function"){
              callback(undefined);
          }
      };

      var items = pasteEvent.clipboardData.items;

      if(items == undefined){
          if(typeof(callback) == "function"){
              callback(undefined);
          }
      };

      for (var i = 0; i < items.length; i++) {
          // Skip content if not image
          if (items[i].type.indexOf("image") == -1) continue;
          // Retrieve image on clipboard as blob
          var blob = items[i].getAsFile();

          if(typeof(callback) == "function"){
              callback(blob);
          }
      }
}

// retrieveImageFromClipboardAsBlob( e, function(imageBlob){
//       if(imageBlob){
//           var canvas = document.querySelector("page_right")[ 0 ];
//           var ctx = canvas.getContext('2d');
//           var img = new Image();
//           img.onload = function ( ) {
//               canvas.width = this.width;
//               canvas.height = this.height;
//               ctx.drawImage(img, 0, 0);
//           };
//
//           var URLObj = window.URL || window.webkitURL;
//           img.src = URLObj.createObjectURL(imageBlob);
//       }
// });

export {
    scrubOffTags , makeFocus , retrieveImageFromClipboardAsBlob
}

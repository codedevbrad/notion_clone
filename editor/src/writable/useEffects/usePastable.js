import React , { useEffect } from 'react';

function retrieveImageFromClipboardAsBlob ( pasteEvent , callback )  {
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

export {
    retrieveImageFromClipboardAsBlob
}

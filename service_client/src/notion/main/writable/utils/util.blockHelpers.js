
const scrubOffTags = ( input , both ) => {
    var regex = /(<([^>]+)>)/ig
    return input.replace( regex , '' ).replace(/&nbsp;/i , "" ).trim();
}

const detectKeyIsCharacter = ( event ) => {
    return event.keyCode >= 65 && event.keyCode <= 90;
}

function getTextWidth(text, font) {
    // if given, use cached canvas for better performance
    // else, create new canvas
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
};

function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}


/** 
 * @param highlighted - current integer position of active block
 */

const makeFocus = ( highlighted , direction , options ) => {

    let { elementTarget } = options;

    const returnIndex = ( direction ) => {
        switch( direction ) {
            case 'prev':
              return highlighted - 1;
            case 'curr':
              return highlighted;
            case 'next':
              return highlighted + 1;
            default:
              return false;
        }
    }

    let indexOfelement = returnIndex( direction );
    
    // if div does not exist, do not call to focus element.
    let div = document.querySelector(`[data-editable-id="${ indexOfelement }"] ${ elementTarget }`);
    if ( div !== null ) {
        placeCaretAtEnd( div );
    }
};

export {
    scrubOffTags , makeFocus , placeCaretAtEnd , getTextWidth , detectKeyIsCharacter
}


const scrubOffTags = ( input , both ) => {
    var regex = /(<([^>]+)>)/ig
    return input.replace( regex , '' ).replace(/&nbsp;/i , "" ).trim();
}

// what is the highlighted variable?
const makeFocus = ( highlighted , direction , setToEnd ) => {

    const returnIndex = ( direction ) => {
        switch( direction ) {
            case 'prev':
              return highlighted - 1;
              break;
            case 'curr':
              return highlighted;
              break;
            case 'next':
              return highlighted + 1;
        }
    }

    let indexOfelement = returnIndex( direction );
    let div = document.querySelector(`[data-editable-id="${ indexOfelement }"] .editable`);
    div.focus();
};

export {
    scrubOffTags , makeFocus
}

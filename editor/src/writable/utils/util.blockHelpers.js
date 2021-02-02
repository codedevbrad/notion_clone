
const scrubOffTags = ( input , both ) => {
    var regex = /(<([^>]+)>)/ig
    return input.replace( regex , '' ).replace(/&nbsp;/i , "" ).trim();
}


const makeFocus = ( highlighted , direction , setToEnd ) => {

    let index = direction === 'prev' ? highlighted - 1 : highlighted + 1;
    let div = document.querySelector(`.data-content-identifier-${ direction === 'curr' ? highlighted : index } .editable`);
    div.focus();
};

export {
    scrubOffTags , makeFocus 
}

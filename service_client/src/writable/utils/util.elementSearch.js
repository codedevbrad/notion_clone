
/** 
 * @param { amount } - how many parents to navigate
 * @param { element } - the html element to start at
 */
export const getParent = ( { amount , element } ) => {
    if ( amount === 0 ) {
        return element;
    }
    return getParent( { amount: amount - 1 , element: element.parentNode });
}

/** 
 *  let parent = getParent({
            amount: 5 , element: currElement
    });
 */
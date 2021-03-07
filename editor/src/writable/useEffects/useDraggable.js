import React , { useEffect , useContext } from 'react';
import { elementHasClass } from '../utils/util.classSearch';

/*
   dragging down from element before last causes an issue.
*/

const useDraggable = ( update , item ) => {

    function diff ( num1, num2  ) {

        if ( num1 == num2 ) {
            return {
                direction: 'same' ,
                canChange: false
            }
        }

        if (num1 > num2) {
            return {
                direction: 'down' ,
                canChange: (num1 - num2) > 1 ,
                updateIndex: num1 ,
                prepend: false
            };
        }
        else {
            return {
               direction: 'up' ,
               canChange:  ( num2 - num1 ) >= 1 ,
               updateIndex: num1 > 0 ? num1 - 1 : num1 ,
               prepend: num1 == 0
            };
        }
    }

    const handleDraggableStart = evt => {
        let data_id = evt.target.getAttribute( 'data-editable-id' );
        localStorage.setItem("item", data_id );
    }

    const handleDraggableEnter = evt => {
        evt.preventDefault();
        let element = evt.target;
        let currentElement  = parseInt( element.getAttribute( 'data-editable-id' ));
        let isOverEditable  = elementHasClass( element , 'content_hover' );
        let lastElement     = parseInt( localStorage.getItem( 'item' ) );

        let canDrop = diff( currentElement , lastElement );

        if ( isOverEditable && canDrop.canChange ) {
             element.classList.add('content_hover_active');
        }
    }

    const handleDraggableLeave = evt => {
        evt.preventDefault();
        let isOverEditable = elementHasClass( evt.target , 'content_hover' );
        if ( isOverEditable ) {
             evt.target.classList.remove('content_hover_active');
        }
    }

    const handleDraggableOver = evt => {
        evt.preventDefault();
    }

    const handleDraggableDrop = evt => {
        evt.preventDefault();
        let element = evt.target;
        let isOverEditable = elementHasClass( element , 'content_hover' );
        let stored_element = parseInt( localStorage.getItem( 'item' ) );
        let moveToPosition = parseInt( element.getAttribute('data-editable-id') );
        element.classList.remove('content_hover_active');

        let canDrop = diff( moveToPosition , stored_element );

        if ( isOverEditable ) {
             console.log( canDrop );
        }
    }

    useEffect( ( ) => {
        document.addEventListener( 'dragstart' , handleDraggableStart , true );
        document.addEventListener( 'dragenter' , handleDraggableEnter , true );
        document.addEventListener( 'dragover'  , handleDraggableOver  , true );
        document.addEventListener( 'dragleave' , handleDraggableLeave , true );
        document.addEventListener( 'drop'      , handleDraggableDrop  , true );

        return () => {
            document.removeEventListener("dragstart" , handleDraggableStart , true );
            document.removeEventListener("dragenter" , handleDraggableEnter , true );
            document.removeEventListener("dragover"  , handleDraggableOver  , true );
            document.removeEventListener("dragleave" , handleDraggableLeave , true );
            document.removeEventListener( 'drop'     , handleDraggableDrop  , true );
        }
    } , [ ] );
}

export default useDraggable;

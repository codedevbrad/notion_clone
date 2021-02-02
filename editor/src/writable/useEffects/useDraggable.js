import React , { useEffect } from 'react';
import { elementHasClass } from '../utils/util.classSearch';

const useDraggable = ( evt , editableClass ) => {

    const changeWritableindexes = ( ) => {

    }

    const handleDraggableStart = evt => {
        let data_id = evt.target.getAttribute( 'data-editable-id' );
        evt.dataTransfer.setData( 'text/plain', data_id );
    }

    const handleDraggableEnter = evt => {
        evt.preventDefault();
        let isOverEditable = elementHasClass( evt.target , 'content_hover' );
        if ( isOverEditable ) {
             evt.target.classList.add('content_hover_active');
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
        let isOverEditable = elementHasClass( evt.target , 'content_hover' );
        if ( isOverEditable ) {
             evt.target.classList.remove('content_hover_active');
             let data   = evt.dataTransfer.getData('text/plain');
             let moveTo = evt.target.getAttribute('data-editable-id');
             console.log( data , moveTo );
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

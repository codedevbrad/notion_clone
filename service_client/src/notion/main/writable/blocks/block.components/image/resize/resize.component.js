import React, { useEffect , useRef } from 'react';
import styles from './resize.module.scss';

const ResizableHighlight = ( { imageId , dragPos , resize } ) => {

    const imageResizeRef = useRef( null );

    const dragOver = ( e ) => {
        console.log('dragging' );
    }

    const dragDrop = ( e ) => {
        let currElement = imageResizeRef.current;
        console.log( 'drop' );
    }

    useEffect( ( ) => {
            let item = imageResizeRef.current;
            item.addEventListener('mousedown' , dragOver  , true );
            item.parentNode.parentNode.addEventListener('mouseup' , dragDrop  , true );
    } , [ ] );

    return (
        <div className={ styles.image_resize } ref={ imageResizeRef }> </div>
    )
}

export default ResizableHighlight;


// <ResizableHighlight blockId={ mainIndex } dragPos={ 'right' } resize={ handleResize } />
import React , { Fragment , useState , useRef , useEffect , useContext }  from 'react';
import ContentEditable  from 'react-contenteditable';
import Side from '../../block.chunks/chunk.side';
import { AppContext } from '../../../../context';

import styles from './image.module.scss';

const ImageBlock = ( { section , mainIndex } ) => {

    const { writing } = useContext( AppContext );

    const resizeImage = ( ) => {

    }

    return (
        <div className="content_hover content_hover_allowed" data-editable-id={ mainIndex }>
              <Side curr={ mainIndex } />
              <div className={ styles.content_image } >

              </div>
         </div>
    )
};

export default ImageBlock;

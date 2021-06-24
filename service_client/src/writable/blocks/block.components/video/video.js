import React , { Fragment , useState , useRef , useEffect , useContext }  from 'react';
import ContentEditable  from 'react-contenteditable';
import Side from '../../block.chunks/chunk.side';
import { AppContext } from '../../../context';

import styles from './image.module.scss';

const VideoBlock = ( { section , mainIndex } ) => {

    const { writing } = useContext( AppContext );

    return (
        <div className="content_hover content_hover_allowed" data-editable-id={ mainIndex }>
              <Side curr={ mainIndex } />
              <div>
                 
              </div>
         </div>
    )
};

export default VideoBlock;

import React , { Fragment , useState , useRef , useEffect , useContext }  from 'react';
import Side from '../../block.chunks/chunk.side';
import styles from './bookmark.module.scss';

const BookmarkBlock = ( { section , mainIndex } ) => {

    return (
        <div className="content_hover content_hover_allowed" data-editable-id={ mainIndex }>
              <Side curr={ mainIndex } />
              <div className={ styles.content_bookmark }>
                  <div className={ styles.content_bookmark_metadata }>
                    <h2> { section.text.title } </h2>
                    <p> { section.text.description } </p>
                    <a href={ section.text.link }> { section.text.link } </a>
                  </div>
                  <div className={ styles.content_bookmark_image }>

                  </div>
              </div>
         </div>
    )
};

export default BookmarkBlock;

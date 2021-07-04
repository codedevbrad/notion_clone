import React  from 'react';
import Side   from '../../block.chunks/chunk.side';
import styles from './bookmark.module.scss';

import { writableRequests } from '../../../../../../network_requests';
import BlockUploadTemplate  from '../../../templates/Template_upload/upload';

const { generateBookmark } = writableRequests;

const BookmarkBlock = ( { section , mainIndex , initialState = false } ) => {

    // DOES THIS RETURN THE OBJECT?
    /** 
     * {
     *    title , description , url
     * }
     */

    const uploadMethod = ( url ) => {
        return generateBookmark( url )
    }

    const uploadData = {
        uploadMethod , 
        uploadBlockData: { 
            blockName: 'bookmark' , 
            blockDescription: 'upload a bookmark to notion' , 
            blockFormValue: '' ,
            blockFormType:  'text'
        }
    }

    return (
        <div className="content_hover content_hover_allowed" data-editable-id={ mainIndex }>

                    <Side curr={ mainIndex } />
                    
                    <BlockUploadTemplate section={ section } mainIndex={ mainIndex } templateRequired={ uploadData } completedBorder={ true }>
                        <div className={ styles.content_bookmark }>
                            <div className={ styles.content_bookmark_metadata }>
                                <h2> { section.text.title } </h2>
                                <p> { section.text.description } </p>
                                <a href={ section.text.url } target="_blank" rel="noopener noreferrer"> { section.text.url } </a>
                            </div>
                            <div className={ styles.content_bookmark_image }> 
                                    <img src={ section.text.favicon } alt={ `bookmark ${ section.text.title }` } />
                            </div>
                        </div>
                    </BlockUploadTemplate>
         </div>
    )
};

export default BookmarkBlock;

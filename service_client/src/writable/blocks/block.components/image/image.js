import React from 'react';
import Side  from '../../block.chunks/chunk.side';
import { AppContext } from '../../../context';

import BlockUploadTemplate from '../../../templates/Template_upload/upload';

import styles from './image.module.scss';

const ImageBlock = ( { section , mainIndex } ) => {

    const uploadMethod = ( data ) => {
        return new Promise( ( resolve ) => resolve( data ));
    }

    const uploadData = {
        uploadMethod , 
        uploadBlockData: { 
            blockName: 'image' , 
            blockDescription: 'upload an image to notion' , 
            blockFormValue: '' ,
            blockFormType: 'media'
        } , 
        customStyles: {
            inputStyle: 'custom_media'
        }
    }

    return (
            <div className="content_hover content_hover_allowed" data-editable-id={ mainIndex }>
                 <div className={ styles.content_image }>
                    <Side curr={ mainIndex } />
                     <BlockUploadTemplate section={ section } templateRequired={ uploadData }>
                        <div>
                            <p> data </p>
                        </div>
                     </BlockUploadTemplate>
                </div>
            </div>
    )
};

export default ImageBlock;

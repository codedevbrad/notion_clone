import React from 'react';

import BlockUploadTemplate  from '../../../templates/Template_upload/upload';
import { videoFormat } from './funcs/decodeVideoURL';

import Side from '../../block.chunks/chunk.side';

import styles from './video.module.scss';

const uploadMethod = ( urlQuery ) => new Promise( ( resolve , reject ) => {
        try {
            let { url } = videoFormat( urlQuery );
            resolve({ 
                url ,
                size: 50
            });
        } 
        catch( err ) {
            reject( 'error' );
        }
});

const uploadData = {
    uploadMethod , 
    uploadBlockData: { 
        blockName:      'video' , 
        blockDescription: 'save a youtube video to notion' , 
        blockFormValue: '' ,
        blockFormType:  'text'
    }
}

const VideoBlock = ( { block , mainIndex } ) => {

    const { url } = block.text;

    return (
        <div className="content_hover content_hover_allowed" data-editable-id={ mainIndex }>
              <Side curr={ mainIndex } />
 
              <BlockUploadTemplate section={ block } mainIndex={ mainIndex } templateRequired={ uploadData } completedBorder={ false }>
                    <div className={ styles.video }>
                        <iframe src={ url } title={`youtube video url ${ block.text }`}> </iframe>
                    </div> 
              </BlockUploadTemplate>
         </div>
    )
};

export default VideoBlock;

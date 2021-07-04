import React , { useState, useContext } from 'react';
import Side   from '../../block.chunks/chunk.side';
import styles from './image.module.scss';

import { writableRequests } from '../../../../../../network_requests';
import BlockUploadTemplate  from '../../../templates/Template_upload/upload';

import ResizeTooltip from './tooltip/tooltip';
import { AppContext } from '../../../context';

const { imageUpload } = writableRequests;

const ImageBlock = ( { section , mainIndex } ) => {

    const { url , size } = section.text;

    const [ toolbar , setToolbarOpen ] = useState( false );

    const { handleWritableUpdate } = useContext( AppContext );
    
    const handleResize = ( newSize ) => {
       handleWritableUpdate(
           { url , size: newSize } , mainIndex
       );
    }

    const handleToolbar = ( element ) => {
        setToolbarOpen( true );
    }

    const handleToolbarclose = ( ) => {
        setToolbarOpen( false );
    }

    const MenuItems = { 
        items: [ 
            { element: 'center' , 
              value: 50 
            } , 
            { element: 'full'   ,
              value: 100 
            } , 
            {
              element: 'full-page' ,
              value: 200
            }
        ] ,
        clickMethod: handleResize
    }

    const uploadMethod = ( imageObject ) => {
        return imageUpload( imageObject ).then( imageUrl => {
                return {
                    url: imageUrl , 
                    size: 50
                }
        });
    }

    const uploadData = {
        uploadMethod , 
        uploadBlockData: { 
            blockName: 'image' , 
            blockDescription: 'upload an image to notion' , 
            blockFormValue: '' ,
            blockFormType: 'media'
        }
    }

    return (
        <div className="content_hover content_hover_allowed" data-editable-id={ mainIndex } >

            <Side curr={ mainIndex } />
                    
            <BlockUploadTemplate mainIndex={ mainIndex } 
                                   section={ section } 
                          templateRequired={ uploadData } size={ `${ size > 100 ? 'full' : 'half' }`} 
                           completedBorder={ false }
            >
                 
                <div className={ styles.block_imageTemplate } onClick={ ( e ) => handleToolbar( e.target ) }>
                    
                    <ResizeTooltip dropState={ toolbar } close={ handleToolbarclose } required={ MenuItems } flow={ 'horz' } scheme={ 'dark' } />
            
                    <div className={ `${ styles.block_image }`} style={ { width: `${ size }%`} }>

                            <div className={ styles.block_img_container }> 
                                <img src={ url } alt={ 'upload to notion'} /> 
                            </div>

                    </div>
                </div>
            </BlockUploadTemplate>
        </div>
    )
};

export default ImageBlock;

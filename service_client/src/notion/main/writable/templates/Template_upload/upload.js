import React , { Fragment , useState , useEffect , useContext } from 'react';
import styles from './upload.module.scss';
import { delay } from '@codedevbrad/clientutils';
import TextFormUpload  from '../Template_form/form.text';
import MediaFormUpload from '../Template_form/form.media';
import UploadLoader    from '../Template_loader/loader';

import { AppContext } from '../../context';

const CorrectMediaUpload = ( { formType , stateChange } ) => {

        let { state , change } = stateChange;
        
        return (
           <Fragment>
                {
                  formType === 'text' &&
                    <TextFormUpload state={ state } change={ change } /> 
                }
                {
                  formType === 'media' &&
                    <MediaFormUpload state={ state } change={ change } uploadDisplayType={ 0 } />
                }
           </Fragment>
        )
}

const Uploader = ( { uploadCompleted , parentProps } ) => {

    const { templateRequired , mainIndex } = parentProps;

    const { uploadMethod , uploadBlockData } = templateRequired;

    const { blockName , blockDescription , blockFormValue , blockFormType } = uploadBlockData;

    const [ isError ] = useState(false);
    const [ uploadMade , updatePending ] = useState( false );

    const [ uploadValue , updateUploadValue ] = useState( blockFormValue );

    const { handleWritableUpdate } = useContext( AppContext ); 

    const Upload = ( e , uploadValue ) => {
        e.preventDefault();
        updatePending( true );
        uploadMethod( uploadValue )
            .then( async uploadData => {
                handleWritableUpdate( uploadData , mainIndex );
                await delay( 1000 );
                uploadCompleted( true );
            })
            .catch( err => console.log( err ));
    }

    return  (
        <Fragment>
            {
                !uploadMade 
                ? 
                <div className={ styles.form_placeholder }>
                    <h3> generate an { blockName } </h3>
                    <p> { blockDescription } </p>
                    <form onSubmit={ ( e ) => Upload ( e , uploadValue ) }>
                        <div id={ styles.form_input } className={ isError ? 'input_error' : '' }> 
                            <CorrectMediaUpload formType={ blockFormType } 
                                             stateChange={ { state: uploadValue , change: updateUploadValue } } 
                            />

                            <input type="submit" value={ `upload ${ blockName }`} className={ isError ? 'submit_error' : '' } />
                        </div>   
                    </form>
                </div> 
                
                :

                <UploadLoader />
            }
        </Fragment>
    )
}

const BlockUploadTemplate = ( { children , ...props } ) => {
    const [ state , changeState ] = useState( false );
    const { section , size , completedBorder } = props;

    useEffect( ( ) => {
        if ( section.text != false ) {
            changeState( true );
        } else if ( section.text === false ) {
            changeState( false );
        }
    } , [ ] );

    return (
        <div className={ 
            `${ styles.block_upload_template } ${ size === 'full' ? styles.template__full : styles.template__half } 
             ${ state && !completedBorder ? styles.template__border :  '' }` }>
            { !state ?
                <Uploader uploadCompleted={ changeState } parentProps={ props } />
                :
                <Fragment>
                    { children }
                </Fragment>
             }
        </div>
    )
}

export default BlockUploadTemplate;
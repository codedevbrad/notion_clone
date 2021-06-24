import React , { Fragment , useState , useEffect } from 'react';
import styles from './upload.module.scss';
import { delay } from '@codedevbrad/clientutils';
import TextFormUpload  from '../Template_form/form.text';
import MediaFormUpload from '../Template_form/form.media';
import UploadLoader    from '../Template_loader/loader';

const CorrectMediaUpload = ( { formType , stateChange } ) => {

        let { state , change } = stateChange;
        
        return (
           <Fragment>
                {
                  formType === 'text' &&
                    <TextFormUpload state={ state } change={ change }/> 
                }
                {
                  formType === 'media' &&
                    <MediaFormUpload change={ change }/>
                }
           </Fragment>
        )
}

const Placeholder = ( { update , parentProps } ) => {

    const { templateRequired } = parentProps;

    const { uploadMethod , uploadBlockData , customStyles } = templateRequired;

    const { blockName , blockDescription , blockFormValue , blockFormType } = uploadBlockData;
    const { inputStyle } = customStyles;

    const [ isError ] = useState(false);
    const [ uploadMade , updateComplete ] = useState( false );

    const [ uploadValue , updateUploadValue ] = useState( blockFormValue );

    const Upload = ( e , dataReq ) => {
        e.preventDefault();
        uploadMethod( dataReq )
            .then( async data => {
                console.log( data );
                updateComplete( true );
                await delay( 1500 );
                update( true );
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
    const { section } = props;

    useEffect( ( ) => {
        if ( section.text != false ) {
            changeState( true );
        } else if ( section.text === false ) {
            changeState( false );
        }
    } , [ ] );

    return (
        <Fragment>
            { !state ?
                <Placeholder update={ changeState } parentProps={ props } />
                :
                <Fragment>
                    { children }
                </Fragment>
             }
        </Fragment>
    )
}

export default BlockUploadTemplate;

import React from 'react';
import styles from './loader.module.scss';

const UploadLoader = ( ) => {
    return (
        <div className={ styles.element_loader }> 
            <i className="fas fa-circle-notch fa-spin"> </i>
        </div> 
    )
}

export default UploadLoader;
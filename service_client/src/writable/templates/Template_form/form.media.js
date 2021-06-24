
import React from 'react';
import styles from './form.module.scss';

const MediaFormUpload = ({ change , mediaElClass = false }) => {

	const changeHandler = (event) => {
		change(event.target.files[0]);
	};

	return (
        <input type="file" name="file" onChange={ changeHandler }  
            className={ styles.form_media } 
        />
	)
}

export default MediaFormUpload;

import React  , { useState } from 'react';
import styles from './form.module.scss';
import { v4 as uuidv4 } from 'uuid';

const MediaFormUpload = ({ state , change , uploadDisplayType }) => {

	const [ idUnique , setId ] = useState( uuidv4() );

	let { name } = state;

	const changeHandler = (event) => {
		change(event.target.files[0]);
	};

	return (
		<div className={styles.form_media }>
			<label htmlFor={ idUnique }>
				<i className="far fa-caret-square-up"></i>
			</label>

			<input type="file" 
		    	   name="file" 
			   onChange={ changeHandler }  
				     id={ idUnique }
      	    />

			<p> { !state ? 'no file selected' : name } </p>
		</div>
	)
}

export default MediaFormUpload;
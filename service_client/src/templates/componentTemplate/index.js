import React from 'react';
import styles from './style.module.scss';

const ComponentTemplate = ( { children , title } ) => {
        return (
            <div className={ `scrollbar ${ styles.page_template }` }> 
                   <div className={ styles.page_template__inner }>
                        <h1 className={  styles.page_template_head }> { title } </h1>
                        <div className={ styles.page_template_body }>
                            { children }
                        </div>
                   </div>
            </div>
        )
}

export default ComponentTemplate;
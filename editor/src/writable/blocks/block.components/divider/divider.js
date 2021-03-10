import React  from 'react';
import Side   from '../../block.chunks/chunk.side';
import styles from './divider.module.scss';

const DividerBlock = ( { section , mainIndex } ) => {

    return (
        <div className="content_hover content_hover_allowed" data-editable-id={ mainIndex }>
              <Side curr={ mainIndex } />
              <div className={ styles.divider }> </div>
         </div>
    )
};

export default DividerBlock;

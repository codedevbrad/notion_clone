import React , { Fragment , useState , useRef , useEffect , useContext }  from 'react';
import ContentEditable  from 'react-contenteditable';
import Side from '../../block.chunks/chunk.side';
import { AppContext } from '../../../../context';

import useComponentKeybinds from '../../textShortcuts';

const TextBlock = ( { section , mainIndex } ) => {

    const {
        handleWritableUpdate , updateHighlighted , handleWritableHighlighting , dragSelection
    } = useContext( AppContext );

    const highlightedFunc = ( ) => {
       updateHighlighted( value => mainIndex );
    }

    const elementRef = useRef( null );
    useComponentKeybinds( elementRef , 'text' , mainIndex  );

    return (
        <div className="content_hover content_hover_allowed content_header" data-editable-id={ mainIndex } ref={ elementRef }>
              <Side curr={ mainIndex } />

              <ContentEditable html={ section.text }
                           onChange={ ( e ) => handleWritableUpdate( e.target.value , mainIndex )}
                          className={ "editable editable-body" }
                            onFocus={ ( e ) => highlightedFunc( ) }
                        placeholder={ 'heading 1' }
                          onMouseUp={ ( e ) => handleWritableHighlighting( e ) }
                            tagName={ section.tag }
                           disabled={ dragSelection.canDrag }
              />
         </div>
    )
};

export default TextBlock;

import React , {  useRef , useContext }  from 'react';
import ContentEditable  from 'react-contenteditable';
import Side from '../../block.chunks/chunk.side';
import { AppContext } from '../../../context';

import useComponentKeybinds from '../../textShortcuts';

const TextBlock = ( { section , mainIndex } ) => {
    const {
        handleWritableUpdate , updateHighlighted , handleWritableHighlighting , dragSelection
    } = useContext( AppContext );

    const highlightedFunc = ( e ) => {
       let currentIndex = parseInt( e.target.parentNode.getAttribute('data-editable-id') );
       updateHighlighted( currentIndex );
    }
    const elementRef = useRef( null );
    useComponentKeybinds( elementRef , 'text' );

    return (
        <div className="content_hover content_hover_allowed" data-editable-id={ mainIndex } ref={ elementRef }>

              <Side curr={ mainIndex } />

              <ContentEditable html={ section.text }
                           onChange={ ( e ) => handleWritableUpdate( e.target.value , mainIndex )}
                          className={ "editable editable-body" }
                            onFocus={ ( e ) => highlightedFunc( e ) }
                        placeholder={ 'start writing or use / to create a new block' }
                          onMouseUp={ ( e ) => {
                              handleWritableHighlighting( e );
                            } }
                            tagName={ section.tag }
                           disabled={ dragSelection.canDrag }
                           pastable_override='true'
              />
         </div>
    )
};

export default TextBlock;

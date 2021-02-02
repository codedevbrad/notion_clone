import React , { Fragment , useState , useRef , useEffect , useContext }  from 'react';
import ContentEditable  from 'react-contenteditable';
import Side from '../../block.chunks/chunk.side';
import { AppContext } from '../../../../context';

import { scrubOffTags , placeCaretAtEnd , makeFocus } from '../../../utils/util.blockHelpers';

const TextBlock = ( { section , mainIndex } ) => {

   const {
       writing , handleWritableUpdate , updateHighlighted , handleWritableHighlighting , dragSelection
   } = useContext( AppContext );

    const highlightedFunc = ( ) => {
       updateHighlighted( value => mainIndex );
    }

    const handleKeyboardShortcuts = ( keybind ) => {

    }

    return (
        <div className="content_hover content_hover_allowed" onKeyDown={ ( evt ) => handleKeyboardShortcuts( evt ) }
             data-editable-id={ mainIndex }>
              <Side curr={ mainIndex } />

              <ContentEditable html={ section.text }
                           onChange={ ( e ) => handleWritableUpdate( e.target.value  , mainIndex )}
                          className={ "editable editable-body" }
                            onFocus={ ( e ) => highlightedFunc( ) }
                        placeholder={ 'start writing or use / to create a new block' }
                          onMouseUp={ ( e ) => handleWritableHighlighting( e ) }
                            tagName={ section.tag }
                           disabled={ dragSelection.canDrag }
              />
         </div>
    )
};

export default TextBlock;
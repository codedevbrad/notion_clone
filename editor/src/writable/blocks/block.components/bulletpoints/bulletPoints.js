import React , { Fragment , useState , useRef , useEffect , useContext }  from 'react';
import ContentEditable  from 'react-contenteditable';
import { AppContext }   from '../../../../context';
import Side from '../../block.chunks/chunk.side';

import useComponentKeybinds from '../../textShortcuts';

import './styles.scss';

const BulletedBlock = ( {  section , mainIndex } ) => {
    const {
        handleWritableUpdate , updateHighlighted , handleWritableHighlighting , dragSelection
    } = useContext( AppContext );

    const highlightedFunc = (e ) => {
        let currentIndex = parseInt( e.target.parentNode.parentNode.getAttribute('data-editable-id') );
        updateHighlighted( currentIndex );
    }

    const elementRef = useRef( null );
    useComponentKeybinds( elementRef , 'bullet' , mainIndex  );

    return (
        <Fragment>
            <div className={ `content_hover content_hover_allowed content_bullet_each margin-level-${ section.level }` } key={ mainIndex }
                 data-editable-id={ mainIndex }
                 ref={ elementRef }
                 >

                <Side curr={ mainIndex } />

                <div className="bullet-point">
                  <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="5" cy="5" r="5" fill="black"/>
                  </svg>
                </div>

                <div className="bullet-editable">
                    <ContentEditable html={ section.text }
                                 onChange={ ( e ) => handleWritableUpdate( e.target.value  , mainIndex )}
                                className={ "editable editable-body" }
                                  onFocus={ ( e ) => highlightedFunc( e ) }
                              placeholder={ 'list item' }
                                onMouseUp={ ( e ) => handleWritableHighlighting( e ) }
                                  tagName={ section.tag }
                                 disabled={ dragSelection.canDrag }
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default BulletedBlock;

import React , { Fragment , useState , useRef , useEffect , useContext }  from 'react';
import ContentEditable  from 'react-contenteditable';
import { AppContext }   from '../../context';

import Side from './block.chunks/chunk.side';

import { scrubOffTags , placeCaretAtEnd , makeFocus , retrieveImageFromClipboardAsBlob } from '../utils/util.blockHelpers';

const BulletedBlock = ( { array , mainIndex } ) => {

    const {
         writing , updateWriting , updateHighlighted , update_tooltip_h_coordinates , updateSelected ,
         closeTooltipsExcept
     } = useContext( AppContext );

    const handleChange = ( evt , itemIndex ) => {
        // index [ main ] , index [ each bullet item in list ].
        let arrayCopy = [ ...writing ];
        arrayCopy[ mainIndex ].text[ itemIndex ].text = evt.target.value;
        updateWriting( arrayCopy );
    };

    const highlightedFunc = ( itemIndex ) => {
        updateHighlighted( value => [ mainIndex , itemIndex ] );
    }

    const handleKeyShortcuts = ( evt , itemIndex ) => {
        let command = evt.which;
        let currentAnchor = window.getSelection().anchorOffset;
        const currentText = writing[ mainIndex ].text[ itemIndex ].text;
        const currentText_scrubbed = scrubOffTags( currentText );

        // [ Delete | Return | empty block item ] - delete current block..
        if ( command === 8 && currentAnchor < 1 || command === 13 && currentAnchor < 1  ) {
            evt.preventDefault();
            console.log( 'hit' , currentAnchor );
        }

        // [ Return | section contains text ]
        if ( command === 13 && currentText_scrubbed.length > 0 ) {
            evt.preventDefault();
            console.log( currentText_scrubbed );
        }

        // [ TAB X 2 | must be at anchor beggining ] - only allow as many spaces right as block items before this block + 1.
        if ( command === 9 && currentAnchor == 0 ) {
            evt.preventDefault();
            console.log( 'beginning' , mainIndex );
        }
    }

    const handleHighlighting = async ( evt ) => {
          let curr_elm = evt.target.getBoundingClientRect();
          var selObj   = window.getSelection();
          let selected = selObj.toString();

          if ( selected.length > 0 ) {
              var selRange = selObj.getRangeAt(0);
              await closeTooltipsExcept('highlight');
              await updateSelected( {
                 element: evt.target , selected , selRange: [ selRange.startOffset , selRange.endOffset ]
              } );
              await update_tooltip_h_coordinates({
                 state: true , coor: [ curr_elm.x , curr_elm.y - 30 ]
              });
          }
    }

    return (
        <Fragment>
            { array.map( ( item , blockbulletIndex ) =>
                <div className={ `content_hover content_bullet_each bullet-item-identifier-${ blockbulletIndex } margin-level-${ item.level }` } key={ blockbulletIndex }
                     onKeyDown={ ( evt ) => handleKeyShortcuts( evt , blockbulletIndex ) } >
                    <Side mainIndex={ mainIndex } bullet-index={ blockbulletIndex }/>

                    <div className="bullet-point">
                      <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="5" cy="5" r="5" fill="black"/>
                      </svg>
                    </div>

                    <div className="bullet-editable">
                      <ContentEditable html={ item.text }
                                   onChange={ ( e ) => handleChange( e  , blockbulletIndex )}
                                  className={ "editable editable-body" }
                                    onFocus={ ( e ) => highlightedFunc( blockbulletIndex ) }
                                placeholder={ 'list item' }
                                  onMouseUp={ ( e ) => handleHighlighting( e ) }
                      />
                    </div>
                </div>
            ) }
        </Fragment>
    )
}

export default BulletedBlock;

import React , { Fragment , useState , useRef , useEffect , useContext }  from 'react';
import ContentEditable  from 'react-contenteditable';
import Side from './block.chunks/chunk.side';
import { AppContext } from '../../context';

import { scrubOffTags , placeCaretAtEnd , makeFocus , retrieveImageFromClipboardAsBlob } from '../utils/util.blockHelpers';

const TextBlock = ( { section , mainIndex } ) => {
    const {
        writing , updateWriting ,
        pageWidth , setPageWidth ,
        highlighted , updateHighlighted ,
        tooltip_h_coordinates , update_tooltip_h_coordinates ,
        tooltip_b_coordinates , update_tooltip_b_coordinates ,
        updateSelected , closeTooltipsExcept
     } = useContext( AppContext );

    const handleChange = ( evt , index ) => {
        let newState = [ ...writing ];
        newState[ index ].text = evt.target.value;
        updateWriting( newState );
    };

    const highlightedFunc = ( evt , index ) => {
        updateHighlighted( value => index );
    }

    const handleKeyShortcuts = async ( evt ) => {

        // const currentText =  writing[ mainIndex ].text;
        // const currentText_scrubbed = scrubOffTags( currentText );
        //
        // let currentAnchor = window.getSelection().anchorOffset - 1;
        //
        // // delete a section if it's empty.
        // if ( evt.which === 8 && currentText_scrubbed.length == 0 ) {
        //     let arrayCopy = [ ...writing ];
        //     // remove current section object.
        //     arrayCopy.splice( mainIndex , 1 );
        //     updateWriting( arrayCopy );
        //     makeFocus( mainIndex , 'prev' , true );
        // }
        //
        // // delete a section but put the remaining text from the section into the previous block.
        // if ( evt.which === 8 && currentText_scrubbed.length > 0 && currentAnchor < 1 ) {
        //     let arrayCopy = [ ...writing ];
        //
        //     // strip previous and get length.
        //     let a_prev = writing[ mainIndex - 1 ].text
        //     let a_prev_length = a_prev.length - 6;
        //
        //     let string = [ a_prev.slice( 0 , a_prev_length ) , currentText_scrubbed + '/' , a_prev.slice( a_prev_length ) ].join('');
        //     // remove current section object.
        //     arrayCopy.splice( mainIndex , 1 );
        //     arrayCopy[ mainIndex - 1 ].text = string;
        //     updateWriting( arrayCopy );
        //     makeFocus( mainIndex , 'prev' , true );
        // }
        //
        // // create new section when pressing return
        // if (evt.which === 13 ) {
        //     evt.preventDefault();
        //     let currentAnchor = window.getSelection().anchorOffset;
        //
        //     const arrayCopy = [ ...writing ];
        //
        //     const spliced__keep = currentText_scrubbed.slice( 0 , currentAnchor );
        //     const sliced__new   = currentText_scrubbed.slice( currentAnchor , currentText_scrubbed.length );
        //
        //     console.log( currentAnchor , spliced__keep , sliced__new );
        //
        //     arrayCopy[highlighted].text = `<div> ${ spliced__keep } </div>`;
        //     arrayCopy.splice( highlighted + 1 , 0 , { text: sliced__new.length == 0 ?  '' : `<div> ${ sliced__new } </div>` , type: 1 } );
        //     await updateWriting( arrayCopy );
        //     makeFocus( highlighted , 'next' , false );
        // }
        //
        // // [ / ] open up the new body dropown.
        // if ( evt.which == 191 ) {
        //     let curr = evt.target.getBoundingClientRect();
        //     let currentAnchor = window.getSelection().anchorOffset;
        //
        //     update_tooltip_b_coordinates({
        //        state: true , coor: [ curr.x , curr.y - 30 ] , anchor: currentAnchor
        //     });
        // }
    }

    const handleHighlighting = async ( evt ) => {
          let curr_elm = evt.currentTarget.getBoundingClientRect();
          var selObj   = window.getSelection();
          let selected = selObj.toString();

          if ( selected.length > 0 ) {
              var selRange = selObj.getRangeAt(0);
              closeTooltipsExcept( 'highlight' );
              await updateSelected( {
                 element: evt.target , selected , selRange: [ selRange.startOffset , selRange.endOffset ]
              } );
              await update_tooltip_h_coordinates({
                 state: true , coor: [ curr_elm.x , curr_elm.y - 36 ]
              });
          }
    }

    return (
        <div className="content_hover" onMouseUp={ ( e ) => handleHighlighting( e ) } onKeyDown={ ( evt ) => handleKeyShortcuts( evt ) }>
              <Side curr={ mainIndex } />
              <ContentEditable html={ section }
                           onChange={ ( e ) => handleChange( e , mainIndex )}
                          className={ "editable editable-body" }
                            onFocus={ ( e ) => highlightedFunc( e , mainIndex ) }
                        placeholder={ 'type / for commands or start writing' }
              />
         </div>
    )
};

export default TextBlock;

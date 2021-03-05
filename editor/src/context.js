import React , { createContext , useState } from 'react';
import { makeFocus } from './writable/utils/util.blockHelpers';

export const AppContext = createContext();

const AppContextProvider = ( props  ) => {

    const [ heading , updateHeading ] = useState(``);

    const [ writing , updateWriting ] = useState( [
        {
          text: `hey there` ,
          type: 1 ,
          tag: 'h3'
        }
    ] );

    const [ dragSelection , updateDragSelection ] = useState( {
        canDrag: false , isDragging: false , selected: [ ]
    } );

    const togglecanEdit = ( ) => {
        if ( !dragSelection.canDrag ) {
          // document.querySelector('body').classList.add('disable_select');
          Array.from(document.querySelectorAll('.content_hover_allowed')).forEach((el) => el.classList.remove('content_hover_allowed'));
        } else {
          // document.querySelector('body').classList.remove('disable_select');
          Array.from(document.querySelectorAll('.drag_highlighted')).forEach((el) => el.classList.remove('drag_highlighted'));
          Array.from(document.querySelectorAll('.content_hover')).forEach((el) => el.classList.add('content_hover_allowed'));
        }
        updateDragSelection( {
           ...dragSelection , canDrag: !dragSelection.canDrag
        });
    }

    const [ highlighted , updateHighlighted ] = useState( null );
    const [ currCursor , updateCursor ] = useState( null );

    // grabs the current text selected from a highlight.
    const [ selectedText , updateSelected ] = useState('');

    const [ tooltip_s_coordinates , update_tooltip_s_coordinates ] = useState( { state: false , coor: [ 0 , 0 ] } );
    const [ tooltip_h_coordinates , update_tooltip_h_coordinates ] = useState( { state: false , coor: [ 0 , 0 ] } );
    const [ tooltip_b_coordinates , update_tooltip_b_coordinates ] = useState( { state: false , coor: [ 0 , 0 ] , anchor: 0 } );

    const handleWrtableBlockUpdate = ( type , index , block ) => {
        let arrayCopy = [ ...writing ];

        switch ( type ) {
            case 'convert':
                break;
                
            case 'new':
                arrayCopy.splice( index + 1 , 0 , {
                    text: '' ,
                    marginlevel: 0 ,
                    type: block.type ,
                    tag: block.tag
                });
                updateWriting( arrayCopy );
                break;
            case 'delete':
                arrayCopy.splice( index , 1 );
                updateWriting( arrayCopy );
                break;
        }
    }

    const handleWritableUpdate = ( value , index ) => {
        let arrayCopy = [ ...writing ];
        arrayCopy[ index ].text = value;
        updateWriting( arrayCopy );
    }

    const handleWritableHighlighting = async ( evt ) => {
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

    const resetSectionTooltip = async ( ) => {
        let els = document.querySelectorAll('.content_edit');
        let els_array = Array.from( els );
        els_array.forEach( (item, i) => {
            item.setAttribute('data-carrot' , false );
        });
        await update_tooltip_s_coordinates( { state: false , coor: [ 0 , 0 ] } );
    }

    const closeTooltipsExcept = async type => {
        switch ( type ) {
          case 'section':
            await update_tooltip_h_coordinates( { state: false , coor: [ 0 , 0 ] } );
            await update_tooltip_b_coordinates( { state: false , coor: [ 0 , 0 ] } );
            break;
          case 'highlight':
            await update_tooltip_b_coordinates( { state: false , coor: [ 0 , 0 ] } );
            resetSectionTooltip();
            break;
          case 'block':
            await update_tooltip_h_coordinates( { state: false , coor: [ 0 , 0 ] } );
            resetSectionTooltip();
            break;
          default:
        }
    }

    const closeTooltips = async ( ) => {
        await resetSectionTooltip();
        await update_tooltip_h_coordinates( { state: false , coor: [ 0 , 0 ] } );
        await update_tooltip_b_coordinates( { state: false , coor: [ 0 , 0 ] , anchor: 0 } );
    }

    return (
        <AppContext.Provider value={ {
              heading , updateHeading ,

              writing , updateWriting , handleWritableUpdate , handleWritableHighlighting , handleWrtableBlockUpdate ,

              highlighted , updateHighlighted ,
              currCursor , updateCursor ,
              tooltip_s_coordinates , update_tooltip_s_coordinates ,
              tooltip_h_coordinates , update_tooltip_h_coordinates ,
              tooltip_b_coordinates , update_tooltip_b_coordinates ,
              closeTooltips , closeTooltipsExcept ,
              selectedText , updateSelected ,
              dragSelection , togglecanEdit
        } }>

            { props.children }

        </AppContext.Provider>
    );
}

export default AppContextProvider;

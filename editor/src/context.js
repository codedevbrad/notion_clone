import React , { createContext , useState } from 'react';
import { makeFocus } from './writable/utils/util.blockHelpers';
import { v4 as uuidv4 } from 'uuid';
import { getblockData , blockChoices } from './writable/blocks/blockJSON';

export const AppContext = createContext();

const AppContextProvider = ( props  ) => {

    const [ heading , updateHeading ] = useState(``);

    const [ writing , updateWriting ] = useState( [ ] );

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
    const [ tooltip_b_coordinates , update_tooltip_b_coordinates ] = useState( { state: false , coor: [ 0 , 0 ] } );
    const [ tooltip_b_blocks      , update_tooltip_b_blocks ] = useState( {
        block_state: blockChoices( false , null ) ,
        block_query: ''
    } );

    const handleWritableDragUpdate = async ( updatedObject , writable_updated ) => {
        let { elementToRemove , updateIndex , shouldPrepend } = updatedObject;
        let arrayCopy = [ ...writable_updated.current ];

        let object = arrayCopy[ elementToRemove ];

        arrayCopy.splice( elementToRemove , 1 );

        if ( shouldPrepend ) {
             arrayCopy.unshift( object );
        } else {
             arrayCopy.splice( updateIndex , 0 , object );
        }
        await updateWriting( arrayCopy );
    }

    // ( type : switch condition , index: single or array of values for array , block : block : object to be inserted )

    const handleWrtableBlockUpdate = async ( type , index , block ) => {
        let arrayCopy = [ ...writing ];
        let key_id = uuidv4();

        switch ( type ) {

            case 'fresh':
                let object_fresh = getblockData('text').block;
                    object_fresh.key = key_id;
                arrayCopy.push( object_fresh );
                await updateWriting( arrayCopy );
                makeFocus( writing.length , 'curr' , {
                    elementTarget: '.editable'
                } );
                break;

            case 'new':
                block.key = key_id;
                arrayCopy.splice( index + 1 , 0 , block );
                await updateWriting( arrayCopy );
                break;

            case 'delete':
                arrayCopy.splice( index , 1 );
                await updateWriting( arrayCopy );
                break;

            case 'delete_many':
                arrayCopy = arrayCopy.filter( ( value , itemIndex ) => {
                    return index.indexOf( itemIndex ) == -1;
                });
                await updateWriting( arrayCopy );
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

    const resetBlockTooltip = async ( ) => {
        let block_default_search = blockChoices( false , null );
        await update_tooltip_b_coordinates( { state: false , coor: [ 0 , 0 ] } );
        await update_tooltip_b_blocks( {
            block_state: block_default_search , block_query: ''
        } );
    }

    const closeTooltipsExcept = async type => {
        switch ( type ) {
          case 'section':
            await update_tooltip_h_coordinates( { state: false , coor: [ 0 , 0 ] } );
            await resetBlockTooltip();
            break;
          case 'highlight':
            await resetBlockTooltip();
            await resetSectionTooltip();
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
        await resetBlockTooltip();
    }

    return (
        <AppContext.Provider value={ {
              heading , updateHeading ,

              writing , updateWriting , handleWritableUpdate , handleWritableHighlighting ,

              handleWrtableBlockUpdate , handleWritableDragUpdate ,

              highlighted , updateHighlighted ,
              currCursor , updateCursor ,
              tooltip_s_coordinates , update_tooltip_s_coordinates ,
              tooltip_h_coordinates , update_tooltip_h_coordinates ,
              tooltip_b_coordinates , update_tooltip_b_coordinates , tooltip_b_blocks , update_tooltip_b_blocks ,
              closeTooltips , closeTooltipsExcept ,
              selectedText , updateSelected ,
              dragSelection , togglecanEdit
        } }>

            { props.children }

        </AppContext.Provider>
    );
}

export default AppContextProvider;

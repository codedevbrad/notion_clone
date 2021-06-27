import React , { createContext , useState } from 'react';
import { makeFocus , scrubOffTags } from './utils/util.blockHelpers';
import { v4 as uuidv4 } from 'uuid';
import { getblockData , blockChoices } from './blocks/blockJSON';

export const AppContext = createContext();

const AppContextProvider = ( props  ) => {

    const [ heading , updateHeading ] = useState(``);

    const [ writing , updateWriting ] = useState( [
        { 
            key: "ade1853d-f5c8-44f8-af23-ab9ee16fa8c1" ,
            marginlevel: 0 ,
            tag: "img" ,
            text: {
                url: "http://res.cloudinary.com/dezoqwmss/image/upload/v1624649125/notion_clone/image_blocks/4VZfI3aDaHyHr0-eJlT6lC4__cncmp3.jpg" ,
                size: 65 
            } ,
            type: "image"
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
    const [ selectedText , updateSelected ] = useState({
         element: '' , selected : false , selRange: [ 0 , 0 ]
    });

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

    const handleBlockTagUpdate = async( type , tag ) => {
        let arrayCopy = [ ...writing ];
        let currentItem = arrayCopy[ highlighted ];
        let { selected , selRange } = selectedText;

        switch( type ) {
            case 'tag_update':
                currentItem.tag = tag;
                await updateWriting( arrayCopy );
                break;
            case 'underline':
                let newText_U = currentItem.text.replace( selected , `<div class="underlined"> ${ selected } </div>` );
                currentItem.text = newText_U;
                await updateWriting( arrayCopy );
                break;
            case 'highlight':
                let newText_H = currentItem.text.replace( selected , `<div class="highlighted"> ${ selected } </div>` );
                currentItem.text = newText_H;
                await updateWriting( arrayCopy );
                break;
            default:
                return false;
        }
    }

    /**
    * creates or deletes blocks.
    * @peram { type  } the type of update.
    * @peram { index } the current position in the array.
    * @peram { block } the object to push to the array.
    */

    // shouldnt i be creating the block here?
    // when have I used the block perameter to create new blocks..
        // - 

    const handleWrtableBlockUpdate = async ( type , index , block ) => {
        let arrayCopy = [ ...writing ];
        let key_id = uuidv4();

        switch ( type ) {
            // creates only a text block. use for new page?
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

            case 'new_textAdded':
                // expect block to be multi-object.
                let { block_obj , appendedText } = block;
                block_obj.key = key_id;
                block_obj.text = appendedText;
                arrayCopy.splice( index + 1 , 0 , block_obj );
                await updateWriting( arrayCopy );
                break;

            case 'delete':
                arrayCopy.splice( index , 1 );
                await updateWriting( arrayCopy );
                break;

            case 'delete_many':
                arrayCopy = arrayCopy.filter( ( value , itemIndex ) => {
                    return index.indexOf( itemIndex ) === -1;
                });
                await updateWriting( arrayCopy );
                break;
            default:
                return false;
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

              handleWrtableBlockUpdate , handleWritableDragUpdate , handleBlockTagUpdate ,

              highlighted , updateHighlighted ,
              currCursor , updateCursor ,
              tooltip_s_coordinates , update_tooltip_s_coordinates ,
              tooltip_h_coordinates , update_tooltip_h_coordinates ,
              tooltip_b_coordinates , update_tooltip_b_coordinates , tooltip_b_blocks , update_tooltip_b_blocks ,
              closeTooltips , closeTooltipsExcept ,
              selectedText , updateSelected ,
              dragSelection , togglecanEdit , updateDragSelection
        } }>

            { props.children }

        </AppContext.Provider>
    );
}

export default AppContextProvider;

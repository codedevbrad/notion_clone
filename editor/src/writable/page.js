import React , { Fragment , useState , useRef , useEffect , useContext }  from 'react';
import ContentEditable  from 'react-contenteditable';
import { AppContext }   from '../context';

import TextBlock     from './blocks/block.components/text/text';
import BulletedBlock from './blocks/block.components/bulletpoints/bulletPoints';
import BookmarkBlock from './blocks/block.components/bookmark/bookmark';
import ImageBlock    from './blocks/block.components/image/image';
import DividerBlock  from './blocks/block.components/divider/divider';

import TooltipHighlight from './tooltips/tooltip.highlight';
import TooltipSection   from './tooltips/tooltip.section';
import BlockCreation    from './tooltips/tooltip.blockCreator';

import useDraggable from './useEffects/useDraggable';
import useSelection from './useEffects/useSelection';
import { retrieveImageFromClipboardAsBlob }  from './useEffects/usePastable';
import { requests } from './network_requests';

import './styles.scss';

const PageHeading = ( ) => {
    const { heading , updateHeading } = useContext( AppContext );
    const handleChange = ( evt ) => {
        updateHeading( value => evt.target.value );
    };

    return (
      <ContentEditable html={ heading }
                   onChange={ ( e ) => handleChange( e )}
                  className={ "editable editable-heading" }
                placeholder={ "Untitled" }
                    tagName={ 'h3'}
      />
    )
}

function useStateRef(initialValue) {

    const { writing } = useContext( AppContext );
    const ref = useRef( writing );

    useEffect(() => {
       ref.current = writing;
    }, [ writing ]);

    return [ ref ];
}

const PageWritable = ( ) => {

    const { writing , highlighted , selectedText , dragSelection , handleWrtableBlockUpdate , handleWritableDragUpdate } = useContext( AppContext );

    let [ writable_updated ] = useStateRef();

    const updateDraggableFunc = ( updatedPos ) => {
          handleWritableDragUpdate( updatedPos , writable_updated );
    }

    const handleclickOnFreshStart = async( ) => {
         if ( !dragSelection.canDrag ) {
              await handleWrtableBlockUpdate( 'fresh' );
         }
    }

    useDraggable( updateDraggableFunc );

    return (
        <Fragment>
            { writing.length === 0 &&
              <div className="writable_start" onClick={ ( ) => handleclickOnFreshStart( ) }>
                  <p> click on the section to start your writing journey </p>
              </div>
            }

            { writing.map( ( section , index ) =>
              <div className='writable_section' key={ section.key }>
                  { section.type === 'divider' &&
                          <div className={`content_block content_divider`}>
                               <DividerBlock section={ section } mainIndex={ index } />
                          </div>
                  }

                  { section.type === 'text' &&
                          <div className={`content_block content_text`}>
                               <TextBlock section={ section } mainIndex={ index } />
                          </div>
                  }
                  { section.type === 'bullet' &&
                          <div className={`content_block content_bullet`}>
                               <BulletedBlock section={ section } mainIndex={ index } />
                          </div>
                  }
                  {
                    section.type === 'bookmark' &&
                          <div className={`content_block content_bookmark`}>
                               <BookmarkBlock section={ section } mainIndex={ index } />
                          </div>
                  }
                  {
                    section.type === 'image' &&
                          <div className={`content_block content_image`}>
                                <ImageBlock section={ section } mainIndex={ index } />
                          </div>
                  }
              </div>
            )}
            { writing.length > 1 &&
              <div className={`writable_placeholder content_hover`} data-editable-id={ writing.length }> </div>
            }
        </Fragment>
    )
}

const Page = ( ) => {

    const { writing , dragSelection ,updateDragSelection , togglecanEdit , handleWrtableBlockUpdate } = useContext( AppContext );
    const { cloudinaryUpload } = requests;

    const draggableEdit = ( ) => {
        togglecanEdit();
    }

    const handlePaste = ( evt ) => {
        evt.preventDefault();
        var clipboardData = evt.clipboardData || window.clipboardData;
        var file = clipboardData.files[ 0 ];
        let pasteText = clipboardData.getData('Text');
        // cloudinaryUpload( file )
        //     .then( image => console.log( image ) )
        //     .catch(  err => console.log( err ) );
        console.log( pasteText , file );
        if ( file ) {
          // create new file block...
        } else if ( pasteText ) {
          // create new text block...
        }
    }

    const handleBlockCreation = async ( evt ) => {
        let isOutOfElement = evt.classList[0] == 'page_right';
        if ( isOutOfElement && !dragSelection.canDrag ) {
             await handleWrtableBlockUpdate( 'fresh' );
        }
    }

    const handleKeybind = ( evt ) => {
          if ( dragSelection.canDrag && evt.key === 'Backspace' ) {
               handleWrtableBlockUpdate('delete_many' , dragSelection.selected );
          }
    }

    const itemsSelected = ({ items, event }) => {
          let arraySelected = [ ];
          items.forEach( ( item , i ) => {
                let id = parseInt( item.getAttribute('data-editable-id') );
                arraySelected.push( id );
          });
          updateDragSelection({
              ...dragSelection , selected: arraySelected
          });
    }

    useSelection( dragSelection.canDrag , itemsSelected );

    useEffect( ( ) => {
        window.addEventListener("keydown", handleKeybind );
        window.addEventListener("paste", handlePaste );
        return ( ) => {
            window.removeEventListener("keydown", handleKeybind );
            window.removeEventListener("paste", handlePaste );
        }
    } , [ ] );

    return (
        <div className="Page">

              <TooltipHighlight />

              <BlockCreation />

              <div className="page_top">
                  <div className="page_top_titlecard">
                     <h3> Heading </h3>
                  </div>
                  <div className="page_top_heading">
                     <PageHeading />
                  </div>
              </div>

              <div className="page_bottom">
                  <div className="page_left">
                      <TooltipSection />
                  </div>

                  <div className="page_right" onClick={ ( evt ) => handleBlockCreation( evt.target ) }>
                      <p className={ `edit_control ${ dragSelection.canDrag ? 'edit_control_on' : ''  } `} onClick={ () => draggableEdit(  ) }>
                            <i className="fas fa-edit"></i>
                      </p>
                      <PageWritable />
                  </div>
              </div>
        </div>
    )
}

export default Page;

import React , { Fragment , useState , useRef , useEffect , useContext }  from 'react';
import ContentEditable  from 'react-contenteditable';
import { AppContext }   from '../context';

import TextBlock     from './blocks/block.components/text/text';
import BulletedBlock from './blocks/block.components/bulletpoints/bulletPoints';
import BookmarkBlock from './blocks/block.components/bookmark/bookmark';
import ImageBlock    from './blocks/block.components/image/image';

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

    const itemsSelected = ({ items, event }) => {
        console.log( items , 'now' , writing );
    }

    const updateDraggableFunc = ( last , updatedPos ) => {

        handleWritableDragUpdate({
            lastPos : last , updatedPos , array: writable_updated
        });
    }

    useDraggable( updateDraggableFunc , writable_updated );
    useSelection( dragSelection.canDrag , itemsSelected );

    return (
        <Fragment>
            { writing.map( ( section , index ) =>
              <div className='writable_section' key={ section.key }>

                  { section.type == 1 &&
                          <div className={`content_block content_text`}>
                               <TextBlock section={ section } mainIndex={ index } />
                          </div>
                  }
                  { section.type == 2 &&
                          <div className={`content_block content_bullet`}>
                               <BulletedBlock section={ section } mainIndex={ index } />
                          </div>
                  }
                  {
                    section.type == 3 &&
                          <div className={`content_block content_bookmark`}>
                               <BookmarkBlock section={ section } mainIndex={ index } />
                          </div>
                  }
                  {
                    section.type == 4 &&
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

    const { writing , dragSelection , togglecanEdit , handleWrtableBlockUpdate } = useContext( AppContext );
    const { cloudinaryUpload } = requests;

    const draggableEdit = ( ) => {
        togglecanEdit();
    }

    const handlePaste = ( evt ) => {
        evt.preventDefault();
        const dT = evt.clipboardData || window.clipboardData;
        const file = dT.files[ 0 ];
        cloudinaryUpload( file )
            .then( image => console.log( image ) )
            .catch( err => console.log( err ) );
    }

    const handleKeybinds = async ( evt ) => {
          let isOutOfElement = evt.classList[0] == 'page_right';
          if ( isOutOfElement ) {
               await handleWrtableBlockUpdate( 'fresh' );
          }
    }

    return (
        <div className="Page" onPaste={ ( e ) => handlePaste( e ) }>

              <TooltipHighlight/>

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

                  <div className="page_right" onClick={ ( evt ) => handleKeybinds( evt.target ) }>
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

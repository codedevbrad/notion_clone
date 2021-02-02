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

const PageWritable = ( ) => {

    const { writing , highlighted , selectedText , dragSelection } = useContext( AppContext );
    const { generateBookmark } = requests;

    const callback = ({ items, event }) => {
          console.log( items , 'now' );
    }

    useDraggable();
    useSelection( dragSelection.canDrag , callback );

    useEffect( ( ) => {
        // generateBookmark('https://www.youtube.com/watch?v=nhpKHSy78t0')
        //     .then( data => console.log( data ))
        //     .catch( err => console.log( err  ) );
    } , [ ] );

    return (
      writing.map( ( section ) => {
          return (
            <div className='writable_section' key={ section.index }>
                { section.type == 1 &&
                        <div className={`content_block content_text`}>
                             <TextBlock section={ section } mainIndex={ section.index }/>
                        </div>
                }
                { section.type == 2 &&
                        <div className={`content_block content_bullet`}>
                             <BulletedBlock section={ section } mainIndex={ section.index } />
                        </div>
                }
                {
                  section.type == 3 &&
                        <div className={`content_block content_bookmark`}>
                             <BookmarkBlock section={ section } mainIndex={ section.index } />
                        </div>
                }
                {
                  section.type == 4 &&
                        <div className={`content_block content_image`}>
                              <ImageBlock section={ section } mainIndex={ section.index } />
                        </div>
                }
            </div>
          )
        })
    )
}

const Page = ( ) => {

    const { dragSelection , togglecanEdit } = useContext( AppContext );
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

                  <div className="page_right">
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

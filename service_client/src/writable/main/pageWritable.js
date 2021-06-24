import React , { Fragment , useState , useRef , useEffect , useContext } from 'react';
import { AppContext } from '../context';

import TextBlock     from '../blocks/block.components/text/text';
import BulletedBlock from '../blocks/block.components/bulletpoints/bulletPoints';
import BookmarkBlock from '../blocks/block.components/bookmark/bookmark';
import ImageBlock    from '../blocks/block.components/image/image';
import DividerBlock  from '../blocks/block.components/divider/divider';

import useDraggable from '../useEffects/useDraggable';
import useStateRef  from '../useEffects/useStateRef';

const PageWritable = ( ) => {

    const { writing , highlighted , selectedText , dragSelection , handleWrtableBlockUpdate , handleWritableDragUpdate } = useContext( AppContext );

    let [ writable_updated ] = useStateRef( writing );

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

export default PageWritable;

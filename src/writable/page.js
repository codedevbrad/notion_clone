import React , { Fragment , useState , useRef , useEffect , useContext }  from 'react';
import ContentEditable  from 'react-contenteditable';
import { AppContext }   from '../context';

import TextBlock     from './blocks/block.text';
import BulletedBlock from './blocks/block.bulletPoints';

import TooltipHighlight from './tooltips/tooltip.highlight';
import TooltipSection   from './tooltips/tooltip.section';
import BlockCreation    from './tooltips/tooltip.blockCreator';

import Emoji from './chunks/chunk.emoji';

import './styles.scss';

const PageHeading = ( ) => {
    const { heading , updateHeading } = useContext( AppContext );
    const handleChange = ( evt ) => {
        updateHeading( value => evt.target.value );
    };

    return (
        <div>
              <ContentEditable html={ heading }
                           onChange={ ( e ) => handleChange( e )}
                          className={ "editable editable-heading" }
                        placeholder={ "Untitled" }
              />
        </div>
    )
}

const Page = ( ) => {

    const { writing , highlighted , selectedText , closeTooltips , tooltip_s_coordinates ,
            tooltip_h_coordinates ,
            tooltip_b_coordinates
} = useContext( AppContext );

    const pageRef = useRef( null );

    const handlePaste = ( e ) => {
        console.log('pasted' , e.target );
    }

    return (
        <div className="Page" ref={ pageRef }>

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

                  <div className="page_right" onPaste={ ( e ) => handlePaste( e ) }>

                        { writing.map( ( section, index ) => {
                            return (
                              <div className="writable_section" key={ index }>
                                  { section.type == 2 &&
                                          <div className={`content_block content_bullet data-content-identifier-${ index }`}>
                                               <BulletedBlock array={ section.text } mainIndex={ index } />
                                          </div>
                                  }
                                  { section.type == 1 &&
                                          <div className={`content_block content_text data-content-identifier-${ index }`}>
                                                <TextBlock section={ section.text } mainIndex={ index }/>
                                          </div>
                                  }
                              </div>
                            )
                          })}
                  </div>
              </div>
        </div>
    )
}

export default Page;

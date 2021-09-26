import React , { useContext }  from 'react';

import { HeadSeo } from '../../../randoms/seoTag';

import { AppContext } from './context';

import NotionSaveSync from './extras/notionSync/sync';
import NotionEdit     from './extras/notionEdit/index';
import PageHeading   from './main/pageHeading';
import PageWritable  from './main/pageWritable';

import TooltipHighlight from './tooltips/tooltip.highlight';
import TooltipSection   from './tooltips/tooltip.section';
import BlockCreation    from './tooltips/tooltip.blockCreator';

import useSelection from './useEffects/useSelection';
import usePageBindListeners from './main/functions/handleBindListener';

import './styles.scss'; 

// LOGGED IN AND YOU HAVE ACCESS TO PAGE ...

// pass writable as props?


const NotionPage = ( ) => {

    const { heading , dragSelection , updateDragSelection ,  handleWrtableBlockUpdate } = useContext( AppContext );

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

    const handleBlockCreation = async ( evt ) => {
          let isOutOfElement = evt.classList[0] === 'page_right';
          if ( isOutOfElement && !dragSelection.canDrag ) {
               await handleWrtableBlockUpdate( 'fresh' );
          }
    }

    usePageBindListeners();
    useSelection( dragSelection.canDrag , itemsSelected );

    return (
        <div className="Notion">

              <HeadSeo title={ heading } description={ 'notion page'} keywords={ 'manage your thoughts' }/>

              <NotionSaveSync />

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

                  <div className={ `page_right scrollbar` } onClick={ ( evt ) => handleBlockCreation( evt.target ) } >
                      <NotionEdit />
                      <PageWritable />
                  </div>
              </div>
        </div>
    )
}


export default NotionPage;

import React , { Fragment , useState , useRef , useEffect , useContext }  from 'react';
import ContentEditable  from 'react-contenteditable';
import { AppContext }   from '../context';

import PageHeading   from './main/pageHeading';
import PageWritable  from './main/pageWritable';

import TooltipHighlight from './tooltips/tooltip.highlight';
import TooltipSection   from './tooltips/tooltip.section';
import BlockCreation    from './tooltips/tooltip.blockCreator';

import useSelection from './useEffects/useSelection';
import useStateRef  from './useEffects/useStateRef';
import { requests } from './network_requests';

import './styles.scss';

const StateStatus = ( ) => {
    const { writing , highlighted , selectedText , dragSelection } = useContext( AppContext );
    return (
        <div> { JSON.stringify( {
            highlighted , selectedText , dragSelection
        }) }</div>
    )
}

const usePageBindListeners = ( ) => {

      const { dragSelection , updateDragSelection , handleWrtableBlockUpdate } = useContext( AppContext );
      var [ dragSelection_updated ] = useStateRef( dragSelection );

      const handleKeybind = ( evt ) => {
            let { canDrag , selected } = dragSelection_updated.current;
            if ( canDrag && evt.key === 'Backspace' ) {
                 handleWrtableBlockUpdate('delete_many' , dragSelection.selected );
            }
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

      useEffect( ( ) => {
          window.addEventListener("keydown", handleKeybind );
          window.addEventListener("paste", handlePaste );
          return ( ) => {
              window.removeEventListener("keydown", handleKeybind );
              window.removeEventListener("paste", handlePaste );
          }
      } , [ ] );
}

const Page = ( ) => {

    const { highlighted , selectedText , writing , dragSelection , updateDragSelection , togglecanEdit , handleWrtableBlockUpdate } = useContext( AppContext );
    const { cloudinaryUpload } = requests;

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
          let isOutOfElement = evt.classList[0] == 'page_right';
          if ( isOutOfElement && !dragSelection.canDrag ) {
               await handleWrtableBlockUpdate( 'fresh' );
          }
    }

    usePageBindListeners();
    useSelection( dragSelection.canDrag , itemsSelected );

    return (
        <div className="Page">

              <TooltipHighlight />

              <BlockCreation />

              <StateStatus />

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
                      <p className={ `edit_control ${ dragSelection.canDrag ? 'edit_control_on' : ''  } `} onClick={ () => togglecanEdit() }>
                          <i className="fas fa-edit"></i>
                      </p>
                      <PageWritable />
                  </div>
              </div>
        </div>
    )
}

export default Page;

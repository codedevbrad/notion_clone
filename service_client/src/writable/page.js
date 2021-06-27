import React , { Fragment , useState , useRef , useEffect , useContext }  from 'react';
import { Link , useParams } from "react-router-dom";

import { AppContext }     from './context';
import AppContextProvider from './context';

import PageHeading   from './main/pageHeading';
import PageWritable  from './main/pageWritable';

import TooltipHighlight from './tooltips/tooltip.highlight';
import TooltipSection   from './tooltips/tooltip.section';
import BlockCreation    from './tooltips/tooltip.blockCreator';

import useSelection from './useEffects/useSelection';
import useStateRef  from './useEffects/useStateRef';
import usePageBindListeners from './main/functions/handleBindListener';

import './styles.scss';

const StateStatus = ( ) => {
    const { writing , highlighted , selectedText , dragSelection } = useContext( AppContext );

    console.log( writing );

    return (
        <div> { JSON.stringify( {
            writing
        }) }</div>
    )
}

const Notion = ( ) => {

    const { dragSelection , updateDragSelection , togglecanEdit , handleWrtableBlockUpdate } = useContext( AppContext );

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

    let { idspace , idroom } = useParams();

    usePageBindListeners();
    useSelection( dragSelection.canDrag , itemsSelected );

    useEffect( (  ) => {
        console.log('re rendered');
    } , [ idroom ] );

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
                      <p className={ `edit_control ${ dragSelection.canDrag ? 'edit_control_on' : ''  } `} onClick={ () => togglecanEdit() }>
                          <i className="fas fa-edit"></i>
                      </p>
                      <PageWritable />
                  </div>
              </div>
        </div>
    )
}

const Navigation = ( ) => {
     let space = 'workspace1';

     return (
       <div className="navigation">
            <ul>
                <li>
                  <Link to={ `/${space}/room1`}> room1 </Link>
                </li>
                <li>
                  <Link to={ `/${space}/room2`}> room2 </Link>
                </li>
            </ul>
       </div>
     )
}

const NotionApp = ( ) => {
    return (
         <AppContextProvider>
            <Notion />
            <Navigation />
         </AppContextProvider>
    )
}

export default NotionApp;

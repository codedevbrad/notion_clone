import React , { createContext , useState } from 'react';

export const AppContext = createContext();

const AppContextProvider = ( props  ) => {

    const [ heading , updateHeading ] = useState(``);

    const [ writing , updateWriting ] = useState( [
        {  text: `<div> hey there </div>` , type: 1 , Tag: 'div' } ,
        {  text: '<div> something </div>' , type: 1 , Tag: 'div' } ,
        {  text: [ { text: '' , level: 0 } , { text: '' , level: 1 } ] , type: 2 }
    ] );

    const [ highlighted , updateHighlighted ] = useState( null );
    const [ currCursor , updateCursor ] = useState( null );
    // grabs the current text selected from a highlight.
    const [ selectedText , updateSelected ] = useState('');

    const [ tooltip_s_coordinates , update_tooltip_s_coordinates ] = useState( { state: false , coor: [ 0 , 0 ] } );
    const [ tooltip_h_coordinates , update_tooltip_h_coordinates ] = useState( { state: false , coor: [ 0 , 0 ] } );
    const [ tooltip_b_coordinates , update_tooltip_b_coordinates ] = useState( { state: false , coor: [ 0 , 0 ] , anchor: 0 } );

    const resetSectionTooltip = async ( ) => {
        let els = document.querySelectorAll('.content_edit');
        let els_array = Array.from( els );
        els_array.forEach( (item, i) => {
            item.setAttribute('data-carrot' , false );
        });
        await update_tooltip_s_coordinates( { state: false , coor: [ 0 , 0 ] } );
    }

    const closeTooltipsExcept = async type => {
        switch ( type ) {
          case 'section':
            await update_tooltip_h_coordinates( { state: false , coor: [ 0 , 0 ] } );
            await update_tooltip_b_coordinates( { state: false , coor: [ 0 , 0 ] } );
            break;
          case 'highlight':
            await update_tooltip_b_coordinates( { state: false , coor: [ 0 , 0 ] } );
            resetSectionTooltip();
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
        await update_tooltip_b_coordinates( { state: false , coor: [ 0 , 0 ] , anchor: 0 } );
    }

    return (
        <AppContext.Provider value={ {
              heading , updateHeading ,
              writing , updateWriting ,
              highlighted , updateHighlighted ,
              currCursor , updateCursor ,
              tooltip_s_coordinates , update_tooltip_s_coordinates ,
              tooltip_h_coordinates , update_tooltip_h_coordinates ,
              tooltip_b_coordinates , update_tooltip_b_coordinates ,
              closeTooltips , closeTooltipsExcept ,
              selectedText , updateSelected
        } }>

            { props.children }

        </AppContext.Provider>
    );
}

export default AppContextProvider;

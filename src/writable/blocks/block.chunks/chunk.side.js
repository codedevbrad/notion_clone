
import React , { Fragment , useState , useRef , useEffect , useContext }  from 'react';
import { AppContext }   from '../../../context';

const Carrot = ( ) => {
    return (
        <svg viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0.705882C0 0.316034 0.402944 0 0.9 0H2.7C3.19706 0 3.6 0.316034 3.6 0.705882V2.42455C3.6 2.8144 3.19706 3.13043 2.7 3.13043H0.9C0.402944 3.13043 0 2.8144 0 2.42455V0.705882Z" fill="#727272"/>
          <path d="M5.4 0.705882C5.4 0.316034 5.80294 0 6.3 0H8.1C8.59706 0 9 0.316034 9 0.705882V2.42455C9 2.8144 8.59706 3.13043 8.1 3.13043H6.3C5.80294 3.13043 5.4 2.8144 5.4 2.42455V0.705882Z" fill="#727272"/>
          <path d="M0 5.14066C0 4.75082 0.402944 4.43478 0.9 4.43478H2.7C3.19706 4.43478 3.6 4.75082 3.6 5.14066V6.85934C3.6 7.24918 3.19706 7.56522 2.7 7.56522H0.9C0.402944 7.56522 0 7.24918 0 6.85934V5.14066Z" fill="#727272"/>
          <path d="M5.4 5.14066C5.4 4.75082 5.80294 4.43478 6.3 4.43478H8.1C8.59706 4.43478 9 4.75082 9 5.14066V6.85934C9 7.24918 8.59706 7.56522 8.1 7.56522H6.3C5.80294 7.56522 5.4 7.24918 5.4 6.85934V5.14066Z" fill="#727272"/>
          <path d="M0 9.57545C0 9.1856 0.402944 8.86957 0.9 8.86957H2.7C3.19706 8.86957 3.6 9.1856 3.6 9.57545V11.2941C3.6 11.684 3.19706 12 2.7 12H0.9C0.402944 12 0 11.684 0 11.2941V9.57545Z" fill="#727272"/>
          <path d="M5.4 9.57545C5.4 9.1856 5.80294 8.86957 6.3 8.86957H8.1C8.59706 8.86957 9 9.1856 9 9.57545V11.2941C9 11.684 8.59706 12 8.1 12H6.3C5.80294 12 5.4 11.684 5.4 11.2941V9.57545Z" fill="#727272"/>
        </svg>
    )
}

const Side = ( { curr } ) => {

    const { tooltip_s_coordinates , update_tooltip_s_coordinates , closeTooltipsExcept } = useContext( AppContext );

    const toggleSectionHover = async ( e ) => {
        let current = e.currentTarget.getBoundingClientRect();
        // if this is already active, then hide the tooltip...
        let data = ( e.currentTarget.getAttribute('data-carrot') == 'true');
        let els = document.querySelectorAll('.content_edit');

        let els_array = Array.from( els );
        els_array.splice( curr , 1 );

        els_array.forEach( (item, i) => {
            item.setAttribute('data-carrot' , false );
        });

        let state_new = true;

        e.currentTarget.setAttribute('data-carrot' , !data );
        if ( data ) state_new = false;

        await closeTooltipsExcept('section');

        await update_tooltip_s_coordinates( {
           state: state_new , coor: [ current.x  , current.y ]
        });
    }

    return (
      <Fragment>
          <div className="content_edit" onClick={ ( e ) => toggleSectionHover( e ) } data-carrot="false">
                <div className="edit_container">
                      <Carrot />
                </div>
          </div>
      </Fragment>
    )
}

export default Side;

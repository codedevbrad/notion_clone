
import React , { useContext , useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SocialContext } from '../../../social/social_context';
import { AppContext } from '../writable/context';

import './notion.nav.scss';


const NotionSocial = ( ) => {

    const { user } = useContext( SocialContext );

    return (
       <section className={ 'heading-social' }>
           <div className={'social-avatar'}> 
                <h1> profile </h1>
                <i className="fas fa-caret-down"></i>
           </div>
       </section>
    )
}

const NotionNavigation = ( ) => {

    const { writables , updateWritableRooms } = useContext( AppContext );
    const [ roomInput , changeRoomInput ] = useState('');

    const createNewRoom = async ( input ) => {
            if ( input === '' ) { return false };
            await updateWritableRooms({ type: 'new_page' , obj: { writablename: roomInput }});
            changeRoomInput('');
    }

    useEffect( ( ) => {
             updateWritableRooms({ type: 'get_pages' })
    } , [ ] );

    return (
       <div className="navigation">

            <NotionSocial />

            <section className={ 'scrollbar nav-items' }>
                { writables.map( ( { id , writablename  } ) => 
                    
                  <div page-id={ id } key={ id } className="nav-item">
                        <div className={ 'page-link' }>
                            <Link to={ `/workspace/${ id }`}> { writablename } </Link>
                        </div>
                        <div className={ 'page-link-more' }>
                            <i className="fas fa-angle-double-right"></i>
                        </div>
                  </div>
                )}
            </section>

            <div className={ 'new-page' }> 

                <input value={ roomInput } 
                    onChange={ ( evt ) => changeRoomInput( evt.target.value ) } 
                 placeholder={ 'create a new room' } 
                 /> 

                <div onClick={ ( ) => createNewRoom( roomInput ) }> 
                    <i className="fas fa-plus"></i>
                </div>

            </div>
       </div>
    )
}

export default NotionNavigation;
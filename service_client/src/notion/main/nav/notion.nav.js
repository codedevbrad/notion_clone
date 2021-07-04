
import React , { useContext , useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SocialContext } from '../../../social/social_context';
import { AppContext } from '../../../writable/context';


const NotionNavigation = ( ) => {

    const { user } = useContext( SocialContext );
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

            <section>
                <div> { user.username } </div>
            </section>

            <div> 
                 <h3 onClick={ ( ) => createNewRoom(  roomInput) }> add a new page </h3>
                <input value={ roomInput } onChange={ ( evt ) => changeRoomInput( evt.target.value ) } />
            </div>

            <ul>
                { writables.map( ( { id , writablename  } ) => 
                    
                  <li page-id={ id } key={ id }>
                    <Link to={ `/workspace/${ id }`}> { writablename } </Link>
                  </li>

                )}
            </ul>
       </div>
    )
}

export default NotionNavigation;
import React , { useEffect , useContext , useState }  from 'react';
import { Link , useParams } from "react-router-dom";

import { HeadSeo } from '../randoms/seoTag';

import AppContextProvider , { AppContext } from './context';

import PageHeading   from './main/pageHeading';
import PageWritable  from './main/pageWritable';

import TooltipHighlight from './tooltips/tooltip.highlight';
import TooltipSection   from './tooltips/tooltip.section';
import BlockCreation    from './tooltips/tooltip.blockCreator';

import useSelection from './useEffects/useSelection';
import usePageBindListeners from './main/functions/handleBindListener';

import { SocialContext } from '../social/social_context';
import useNavigate from '../utils/util.navigatePage';

import './styles.scss'; 



// LOGGED IN AND YOU HAVE ACCESS TO PAGE ...

const Notion = ( ) => {

    const { getSingleWritable , dragSelection , updateDragSelection , togglecanEdit , handleWrtableBlockUpdate } = useContext( AppContext );

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

    
    let { idroom } = useParams();

    useEffect( (  ) => {
         
         console.log('get page data for' , idroom );
         getSingleWritable( idroom )

    } , [ idroom ] );


    return (
        <div className="Page">

              <HeadSeo title={ 'individual page' } description={ 'each indidvidual page'} keywords={ 'manage your thoughts' }/>

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

                  <div className={ `page_right scrollbar`} onClick={ ( evt ) => handleBlockCreation( evt.target ) } >
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


const NotionApp = ( ) => {

    const { getUserFromDb } = useContext( SocialContext );
    const { changePage } = useNavigate();

    useEffect( ( ) => {
        console.log( 'checking user is logged' );
        getUserFromDb()
            .catch( redirectURL => changePage( redirectURL ) );
    } , [ ] );

    return (
         <AppContextProvider>
             <Notion />
             <Navigation />
         </AppContextProvider>
    )
}

export default NotionApp;

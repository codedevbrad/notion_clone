import React , { Fragment , useState , useRef , useEffect , useContext }  from 'react';
import Side from '../../block.chunks/chunk.side';
import styles from './bookmark.module.scss';

import { AppContext } from '../../../../context';

import { requests } from '../../../network_requests';

const Bookmark = ( { section } ) => {
    return (
        <Fragment>
            <div className={ styles.content_bookmark_metadata }>
                <h2> { section.text.title } </h2>
                <p> { section.text.description } </p>
                <a href={ section.text.link }> { section.text.link } </a>
            </div>
            <div className={ styles.content_bookmark_image }> </div>
        </Fragment>
    )
}

const Placeholder = ( { index , update } ) => {

    const { handleWritableUpdate } = useContext( AppContext );
    const [ bookmarkText , updateText ] = useState('');

    const { generateBookmark } = requests;

    const generateBookmarkFunc = async ( ) => {
          let fakeObj = {
              title: bookmarkText ,
              description: 'article for medium.com. thinking of investing, then read the top 5 tips' ,
              link: 'https://medium.com'
          }
          await handleWritableUpdate( fakeObj , index );
          update( true );
          // generateBookmark('https://www.youtube.com/watch?v=nhpKHSy78t0')
          //     .then( data => {
          //           handleWritableUpdate( index , data );
          //           changeState( true );
          //     })
          //     .catch( err => console.log( err  ) );
    }

    return  (
        <Fragment>
          <div>
              <input placeholder={ `bookmark-${ index }`} type="text" value={ bookmarkText } onChange={ ( evt ) => updateText( evt.target.value ) } />
              <div onClick={ () => generateBookmarkFunc( ) }> upload bookmark </div>
           </div>
        </Fragment>
    )
}


const BookmarkBlock = ( { section , mainIndex } ) => {

    const [ state , changeState ] = useState( false );

    useEffect( ( ) => {
        console.log('bookmark' );
        if ( section.text != false ) {
            changeState( true );
        } else if ( section.text == false ) {
            changeState( false );
        }
    } , [ ] );

    return (
        <div className="content_hover content_hover_allowed" data-editable-id={ mainIndex }>
              <Side curr={ mainIndex } />
              <div className={ styles.content_bookmark }>
                    { !state ?
                       <Placeholder index={ mainIndex } update={ changeState }/>
                           :
                       <Bookmark section={ section }/> }
              </div>
         </div>
    )
};

export default BookmarkBlock;

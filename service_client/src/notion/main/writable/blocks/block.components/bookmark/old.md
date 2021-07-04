
<!-- // const Bookmark = ( { section } ) => {

//     const [ loaded , setLoad ] = useState(false);

//     useEffect( async ( ) => {
//         await delay( 2000 );
//         setLoad( true );
//     } , [ ] );

//     return (
//         <Fragment>
//             {
//                 !loaded ? 
//                 <div className={ styles.content_bookmark_loading }> 
//                      <i class="fas fa-circle-notch fa-spin"> </i>
//                 </div> 
//                 :
//                  <Fragment>
//                     <div className={ styles.content_bookmark_metadata }>
//                         <h2> { section.text.title } </h2>
//                         <p> { section.text.description } </p>
//                         <a href={ section.text.url } target="_blank" rel="noopener noreferrer"> { section.text.url } </a>
//                     </div>
//                     <div className={ styles.content_bookmark_image }> 
//                         <img src={ section.text.favicon } alt={ `bookmark ${ section.text.title }` } />
//                     </div>
//                 </Fragment>
//             }
//         </Fragment>
//     )
// }

// const useErrorEffect = async ( setError ) => {
//     setError( true );
//     await delay( 2000 );
//     setError( false );
// }

// const Placeholder = ( { index , update } ) => {

//     const { handleWritableUpdate } = useContext( AppContext );
//     const [ bookmarkText , updateText ] = useState('');
//     const [ isError , setError ] = useState(false);

//     const { generateBookmark } = WritableRequests;

//     const generateBookmarkFunc = async ( e , url ) => {

//           // prevent form from refreshing page
//           e.preventDefault();
          
//           generateBookmark( url )
//             .then( async ( data ) => {
//                     await handleWritableUpdate( data , index );
//                     console.log( data );
//                     update( true );
//             })
//             .catch( async err => {
//                 console.log( err );
//                 useErrorEffect( setError );
//             });
//     }

//     return  (
//         <Fragment>
//           <div className={ styles.content_bookmark_placeholder }>
//               <h3> generate a bookmark </h3>
//               <p> paste or manually write a link into the inputfield and hit enter when you're set. it's that easy. </p>
//               <form onSubmit={ ( e ) => generateBookmarkFunc( e , bookmarkText ) }>
//                 <div id={ styles.form_input } className={ isError ? 'input_error' : '' }> 
//                     <input type="text"   
//                           pastable_override='true'
//                           value={ bookmarkText } 
//                           placeholder='enter your bookmark url' onChange={ ( evt ) => updateText( evt.target.value ) } 
//                     />
//                     <input type="submit" value="generate bookmark" className={ isError ? 'submit_error' : '' } />
//                 </div>   
//               </form>
//            </div>
//         </Fragment>
//     )
// } -->
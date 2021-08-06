import { useContext , useEffect , useRef } from "react";
import { useParams  } from "react-router";
import { AppContext } from "../main/writable/context";

const useSyncWritableroom = ( ) => {

    const { writing , writableId , getSingleWritable , renderNotionComponentType } = useContext( AppContext );

    const valueRef = useRef();

    let { idroom } = useParams();

    useEffect( (  ) => {
        
        ( async ( ) => {

            // fetch and set content for page.
            await getSingleWritable( idroom )
                  .then(  _ => renderNotionComponentType('notion_render') )
                  .catch( _ => renderNotionComponentType('welcome') );

            console.log( 'save data from' , writing , writableId );

            // // set newest state
            // valueRef.current = {
            //     writing , writableId
            // };
        }  ) ( );
    } , [ idroom ] );
}

export default useSyncWritableroom;
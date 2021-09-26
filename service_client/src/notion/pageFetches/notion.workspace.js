import { useContext , useEffect , useRef } from "react";
import { useParams  } from "react-router";
import { AppContext } from "../main/writable/context";

import { setWorkspaceInCache } from "./notion.cached";

    // set newest state
    // valueRef.current = {
    //     writing , writableId
    // };



const useSyncWritableroom = ( ) => {

    const { writing , writableId , getSingleWritable , renderNotionComponentType } = useContext( AppContext );

    const valueRef = useRef();

    let { idroom } = useParams();

    useEffect( (  ) => {
        
        ( async ( ) => {
            // if the page is welcome.
            if ( idroom === 'welcome') {
                renderNotionComponentType('notion_welcome');
            } else {
                // fetch and set content for page.
                await getSingleWritable( idroom )
                    .then( _ => {
                        renderNotionComponentType('notion_render');
                        // set as latest page seen for next refresh.
                        setWorkspaceInCache( idroom );
                    })
                    // no workspace could be fetched. an error would be given.
                    .catch( _ => renderNotionComponentType('notion_nofetch') );
            }
          

            console.log( 'save data from' , writing , writableId );

         
        }  ) ( );
    } , [ idroom ] );
}

export default useSyncWritableroom;
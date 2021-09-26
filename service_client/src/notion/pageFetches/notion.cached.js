
import { useContext, useEffect , useState } from "react";
import { setLocalStorage , getLocalStorage } from "../../utils/util.localstorage";
import useNavigate from "../../utils/util.navigatePage";
import { AppContext } from '../main/writable/context';

export const setWorkspaceInCache = ( idroom ) => {
    setLocalStorage( 'workspaceCache' , idroom );
}

export const useWorkspaceCache = ( idroom ) => {

  //  let { writables } = useContext( AppContext );

  //  let { changePage } = useNavigate();

  //  useEffect( ( ) => {
  //    let prevWorkspace = getLocalStorage('workspaceCache');
  //    console.log( prevWorkspace );
  //    // if ( prevWorkspace ) changePage( prevWorkspace );
  //  } , [ ] );
  let prevWorkspace = getLocalStorage('workspaceCache');
  let [ workspaceCached , _ ] = useState( prevWorkspace );
  return workspaceCached;
}
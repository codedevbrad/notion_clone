import { useHistory } from 'react-router-dom';

const useNavigate = ( ) => {
    
    const history = useHistory();

    const changePage = ( link ) => history.push( link );

    return { changePage };
}

export default useNavigate;
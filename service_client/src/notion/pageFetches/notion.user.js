
import { useEffect , useContext } from "react";
import { SocialContext } from "../../social/social_context";
import useNavigate from "../../utils/util.navigatePage";

export const useUserFetch = ( ) => {
    const { getUserFromDb } = useContext( SocialContext );
    const { changePage } = useNavigate();

    useEffect( ( ) => {
        console.log( 'checking user is logged' );
        getUserFromDb()
            .catch( _ => changePage( '/login' ) );
    } , [ ] );
}
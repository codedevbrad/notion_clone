
import React , { useContext , useEffect } from 'react';
import useNavigate from '../utils/util.navigatePage';

import AppContextProvider from '../notion/main/writable/context';
import { SocialContext }  from '../social/social_context';

import NotionPage       from './main/writable/page';
import NotionNavigation from './main/nav/notion.nav';
import { Fragment } from 'react';

/** 
 *  page left
 *      - notionPage ( if user and has access to page )
 *      - notionMessage ( else )
 *  page nav
 */


/** 
 *  Import notion access as a wrapper around notion_page to protect access.
 */


const NotionApp = ( ) => {

    // Should I hide these components till a user is found?

    const { isUser , getUserFromDb } = useContext( SocialContext );
    const { changePage } = useNavigate();

    useEffect( ( ) => {
        console.log( 'checking user is logged' );
        getUserFromDb()
            .catch( redirectURL => changePage( redirectURL ) );
    } , [ ] );

    return (
         <AppContextProvider>
             { isUser &&
                    <Fragment>
                         <NotionPage />
                         <NotionNavigation />
                    </Fragment>
             }
         </AppContextProvider>
    )
}

export default NotionApp;
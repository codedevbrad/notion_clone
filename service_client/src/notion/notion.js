
import React , { useContext , Fragment } from 'react';

import AppContextProvider, { AppContext } from '../notion/main/writable/context';
import { SocialContext }  from '../social/social_context';

import NotionPage       from './main/writable/page';
import NotionNavigation from './main/nav/notion.nav';
import NotionWelcome    from './main/writableNoFetch/notionPage_welcome/index';
import { useUserFetch } from './pageFetches/notion.user';
import useSyncWritableroom from './pageFetches/notion.workspace';

const NotionPlain = (  ) => {
    return ( <div> </div> )
}


const NotionRender = ( ) => {

    const { writableComponent } = useContext( AppContext );

    // fetch data for writable.
    useSyncWritableroom();

    return (
        <div className="Page">
            { writableComponent === 'loading' && <NotionPlain /> }
            { writableComponent === 'notion'  && <NotionPage /> }
            { writableComponent === 'welcome' && <NotionWelcome /> }
        </div>
    )
}


const NotionApp = ( ) => {

    // Should I hide these components till a user is found?

    const { isUser } = useContext( SocialContext );

    // fetch user. else return to login.
    useUserFetch( );

    return (
         <AppContextProvider>
             { isUser &&
                    <Fragment>
                         <NotionRender />
                         <NotionNavigation />
                    </Fragment>
             }
         </AppContextProvider>
    )
}

export default NotionApp;
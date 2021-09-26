import React from "react";

import ComponentTemplate from '../../../../templates/componentTemplate/index';

import { useWorkspaceCache } from "../../../pageFetches/notion.cached";

import { Link } from "react-router-dom";

import './style.scss';


const NotionWelcome = ( ) => {

        let cachedWorkspace = useWorkspaceCache();

        return (
            <ComponentTemplate title={ 'Welcome to notion' }>
                    <div className={ 'welcome' }> 

                        <p> welcome to notion clone. The list of features added / to be added are documented on the real notion pages </p>

                        <section className={'welcome-links'}>
                                
                           <a href={ 'https://cherry-roadway-2b8.notion.site/notion-app-8ad026e46d004489b433d5ffc37ee5b7' }> 
                                scrum board 
                           </a>
                           <a href={'https://cherry-roadway-2b8.notion.site/ca66d985ffd247ef9f623bebea068d84?v=b1fd87e67a804389b63dccb07b7c841b'}>
                                to-do list
                           </a>
                        </section>

                        <Link to={ `/workspace/${ cachedWorkspace }`} className={'welcome-navigate'}> navigate to last worked on page </Link>
                    </div>
            </ComponentTemplate>
        )
}


export default NotionWelcome;
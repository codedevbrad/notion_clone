import React from "react";
import { Link } from "react-router-dom";
import ComponentTemplate from '../../../../templates/componentTemplate/index';
import { useWorkspaceCache } from "../../../pageFetches/notion.cached";

import './styles.scss';


const NotionNoFetch = ( ) => {

        let cachedWorkspace = useWorkspaceCache();

        return (
            <ComponentTemplate title={ 'Oops. That page does not exist.' }>
                    <div className={ 'workspace-error' }> 
                        <p> sorry. we could not find this page </p>

                        <Link to={ `/workspace/${ cachedWorkspace }`} className={'welcome-navigate'}> 
                             navigate to last worked on page 
                        </Link>
                    </div>
            </ComponentTemplate>
        )
}

export default NotionNoFetch;
import React from 'react';
import { Link } from 'react-router-dom';

const AppHome = (  ) => {
    return (
          <div>
                
                <Link to={'/workspace/welcome'}> go to workspace </Link>
          </div>
    )
}

export default AppHome;
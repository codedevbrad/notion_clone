import React    from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router , Switch , Route } from 'react-router-dom';
import { DefaultHeadSEO , HeadSeo } from './seoTag';
import Error404 from './404page';

import NotionApp from './writable/page';

import './_cssLibrary/class_reset.css';
import './_cssLibrary/class_app.scss';

const App = () => {
    return (
      <Router>
            <div className="App">
                    <HeadSeo title={ 'notion clone' } description={ 'template description'} keywords={ 'react , css' }/>
                    <Switch>
                          <Route path="/:idspace/:idroom" component={ NotionApp } />
                          <Route component={ Error404 } />
                    </Switch>
            </div>
      </Router>
    );
}

export { App };

ReactDOM.render( <App /> , document.getElementById('root'));

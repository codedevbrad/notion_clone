import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router , Switch , Route } from 'react-router-dom';
import { DefaultHeadSEO , HeadSeo } from './randoms/seoTag';

import PageError404 from './pages/page404/index';

import AppHome     from './pages/landing/index';
import NotionApp   from './notion/notion';
import SocialLogin from './social/Login';

import SocialContextProvider from './social/social_context';

import './_cssLibrary/class_reset.css';
import './_cssLibrary/class_app.scss';


const App = () => {
    return (
      <Router>
            <div className="App">
                  <DefaultHeadSEO />
                  <HeadSeo title={ 'notion clone' } description={ 'template description' } keywords={ 'manage your thoughts' }/>
                  <SocialContextProvider>
                        <Switch>
                              <Route exact path ="/" component={ AppHome } />
                              <Route path="/login" component={ SocialLogin } />
                              <Route path="/workspace/:idroom" component={ NotionApp } />
                              <Route component={ PageError404 } />
                        </Switch>
                  </SocialContextProvider>
            </div>
      </Router>
    );
}

export { App };

ReactDOM.render( <App /> , document.getElementById('root'));

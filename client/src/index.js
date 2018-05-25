import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App';
import HelloWorld from './views/HelloWorld';
import User from './views/User';
import { BrowserRouter, Route } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <BrowserRouter>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/index" component={App} />
            <Route path="/hello" component={HelloWorld} />
            <Route path="/user" component={User} />
        </div>
    </BrowserRouter>
    ), document.getElementById('root')
);
registerServiceWorker();

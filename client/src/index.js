import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './views/Home';
import Courses from './views/Courses';
import User from './views/User';
import { BrowserRouter, Route } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <BrowserRouter>
        <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/index" component={Home} />
            <Route path="/courses" component={Courses} />
            <Route path="/users" component={User} />
        </div>
    </BrowserRouter>
    ), document.getElementById('root')
);
registerServiceWorker();

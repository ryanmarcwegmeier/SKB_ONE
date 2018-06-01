import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './views/Home';
import Courses from './views/Courses';
import User from './views/User';
import SingleUser from './views/SingleUser';
import { BrowserRouter, Route } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <BrowserRouter>
        <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/index" component={Home} />
            <Route exact path="/courses" component={Courses} />
            <Route exact path="/users" component={User} />
            <Route path="/users/:id" component={SingleUser} />

        </div>
    </BrowserRouter>
    ), document.getElementById('root')
);
registerServiceWorker();

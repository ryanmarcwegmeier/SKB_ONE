// /**
//  * @module react-router
//  */
//
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import Home from './views/Home';
// import Courses from './views/Courses';
// import User from './views/User';
// import SingleUser from './views/SingleUser';
// import Contact from './views/Contact';
// import { BrowserRouter, Route } from 'react-router-dom';
// import registerServiceWorker from './registerServiceWorker';
//
// /**
//  * Routing and inserting content in <div ir='root'>content</div>
//  */
// ReactDOM.render((
//     <BrowserRouter>
//         <div>
//             <Route exact path="/" component={Home} />
//             <Route exact path="/index" component={Home} />
//             <Route exact path="/courses" component={Courses} />
//             <Route exact path="/users" component={User} />
//             <Route exact path="/users/:id" component={SingleUser} />
//             <Route exact path="/contact" component={Contact} />
//
//         </div>
//     </BrowserRouter>
//     ), document.getElementById('root')
// );

import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/Main";

ReactDOM.render(
    <Main/>,
    document.getElementById("root")
);

registerServiceWorker();

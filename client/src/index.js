/**
 * @module react-router
 */


import registerServiceWorker from './registerServiceWorker';
import "./index.css"
import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/Main";

ReactDOM.render(
    <Main/>,
    document.getElementById("root")
);
registerServiceWorker();

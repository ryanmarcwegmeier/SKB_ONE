import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
class NavItems extends Component {

    render() {
        return (
            <li className={"nav-item " + this.props.act}>
                <NavLink to={this.props.url}><span className="nav-link" >{this.props.text}</span></NavLink>
            </li>
        );
    }
}

export default NavItems;
import React, { Component } from 'react';
import {NavLink} from "react-router-dom";

class Nav extends Component {



    render() {
        let active = (window.location.pathname=="/")?'active':'';
        return (
            <ul className="navbar-nav mr-auto ml-auto h5" >
                <li className={"nav-item "}>
                    <NavLink exact to={"/index"}><span className={"nav-link " + active}>Home</span></NavLink>
                </li>
                <li className={"nav-item "}>
                    <NavLink exact to="/courses"><span className="nav-link" >Courses</span></NavLink>
                </li>
                {(this.props.role=='admin')&&
                <li className={"nav-item "}>
                    <NavLink exact to="/users"><span className="nav-link">Users</span></NavLink>
                </li>
                }

                <li className={"nav-item "}>
                    <NavLink exact to="/contact"><span className="nav-link" >Contact</span></NavLink>
                </li>




            </ul>
        );
    }
}

export default Nav;
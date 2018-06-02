import React, { Component } from 'react';
import {NavLink} from "react-router-dom";

class Nav extends Component {

    constructor(props){
        super(props);

    }

    // componentWillMount() {
    //     fetch('/users/login', {
    //         credentials: 'include',
    //         method: 'post',
    //         headers: {'Content-Type':'application/json'}
    //     }).then((res) => {
    //         if (res.ok){
    //             return res.json();
    //         } else {
    //             this.setState({'loginsuccess': false });
    //             throw new Error ('Something went wrong with your fetch');
    //         }
    //     }).then((json) => {
    //         sessionStorage.setItem("sessionID",json)
    //         window.location.reload()
    //     })
    // }

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
                {(true)&&
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
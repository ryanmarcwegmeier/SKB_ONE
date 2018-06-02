import React, { Component } from 'react';
import logo from '../img/logo3.jpg';
import Nav from './Nav';
import Register from './Register'

class Navbar extends Component {

    render() {
        return (
            <nav id={"nav-top"} className="shadow-lg navbar navbar-expand-md navbar-dark bg-danger container-fluid ">
                <a href={"https://github.com/SNetMERN/SKB_ONE"}>
                    <img src={logo} alt={"Logo"} style={{width:'8vh', borderRadius:'1000px'}}/>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <Nav/>
                    <Register/>
                </div>
            </nav>
        );
    }
}

export default Navbar;
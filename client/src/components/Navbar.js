import React, { Component } from 'react';
import logo from '../img/logo3.jpg';
import Nav from './Nav';
import Register from './Register'

class Navbar extends Component {

    constructor(props){
        super(props)
        this.state={
            user:{}
        }
    }

    componentWillMount() {
        fetch('/sessions', {
            credentials: 'include',
            method: 'get',
            headers: {'Content-Type':'application/json'}
        }).then((res) => {
            if (res.ok){
                return res.json();
            } else {
                throw new Error ('Something went wrong with your fetch');
            }
        }).then((json) => {
            console.log(json);alert()
        }).catch((err)=>{
          console.log(err)
        })
    }

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
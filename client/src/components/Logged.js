import React, { Component } from 'react';
import {NavLink, Redirect} from "react-router-dom";

class Logged extends Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(event){
        event.preventDefault();
        sessionStorage.clear();
        window.location.replace('/index')
        // fetch('/login', {
        //     method: 'post',
        //     headers: {'Content-Type':'application/json'},
        //     body: JSON.stringify({
        //         "user_id": sessionStorage.getItem("session").user_id,
        //         "session_id":sessionStorage.getItem("session").user_id
        //     })
        // }).then((res) => {
        //     if (res.ok){
        //         return res.json();
        //     } else {
        //         throw new Error ('Something went wrong with your fetch');
        //     }
        // }).then((json) => {
        //     if (json.status==200){
        //         window.location.replace('/index')
        //     }else{
        //         this.setState({'loginsuccess': false });
        //     }
        // })
    };



    render() {

        return (
            <div >
                <div className="dropdown">
                    <button className="btn btn-light rounded-circle text-center" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-user"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-right bg-light" aria-labelledby="dropdownMenuButton">
                        <li className="nav-item loggedBoxItem">
                            <NavLink exact to={"/users?id="+sessionStorage.getItem("session").id}><span className={"nav-link text-muted"}>Profil</span></NavLink>
                        </li>
                        <div className="dropdown-divider"></div>
                        <li className="nav-item loggedBoxItem">
                            <button type="button" className="btn btn-outline-secondary" style={{width:'100%'}} onClick={this.logout}>Logout</button>
                        </li>

                    </ul>
                </div>
            </div>

        );
    }
}

export default Logged;

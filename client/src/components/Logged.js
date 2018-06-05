import React, { Component } from 'react';
import {Redirect, Link} from "react-router-dom";

class Logged extends Component {

    profileSide(user_id){

        // window.location.href='/users/'

        return <Redirect to='/users'/>

    }

    logout(event){

        event.preventDefault();
        fetch('/users/logout', {
            credentials: 'include',
            method: 'post',
            headers: {'Content-Type':'application/json'},
        }).then((res) => {
            if (res.ok){
                return window.location.href="/index"
            } else {
                console.log(res.status)
            }
        })
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

                            <Link to={"/users/"+this.props.userID}>
                                <button type="button" className="btn btn-outline-secondary" style={{width:'100%'}}>
                                    Profil
                                </button>

                            </Link>


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

import React, { Component } from 'react';
import {Redirect, Link} from "react-router-dom";

class Logged extends Component {

    constructor(props){
        super(props)
        this.logout=this.logout.bind(this)
        this.state={
            redirect:false,
        }
    }

    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }


    logout(event){
        event.preventDefault()
        this.setState({
            redirect:true,
        })
        document.getElementById('navbarSupportedContent').classList.remove('show')
        this.setCookie('apikey',null,0)

    };



    render() {

        if (this.state.redirect){
            this.props.changeUser({role:'guest', apikey:''})
            return <Redirect to='/index'/>

        }

        return (
            <div>
                <div className="dropdown ">
                    <button className="btn btn-outline-light rounded-circle text-center" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-user"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-right bg-light shadow-lg p-3 mb-5 bg-white rounded" aria-labelledby="dropdownMenuButton">

                        <li className="nav-item loggedBoxItem">

                            <Link to={"/users/"+this.props.user.username}>
                                <button type="button" className="btn btn-outline-info" style={{width:'100%'}} onClick={()=>document.getElementById('navbarSupportedContent').classList.remove('show')}>
                                    <i className="fas fa-user-cog mr-1"></i>
                                    {this.props.user.username}
                                </button>

                            </Link>
                        </li>
                        <div className="dropdown-divider"></div>
                        <li className="nav-item loggedBoxItem">
                            <button type="button" className="btn btn-outline-info" style={{width:'100%'}} onClick={this.logout}>
                                <i className="fas fa-sign-out-alt mr-1"></i>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>


        );
    }
}

export default Logged;

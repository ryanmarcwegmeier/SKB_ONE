import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from "axios/index";

class ModalLogin extends Component {

    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            loginsuccess:true,
            redirect: false,
            user:{}
        }
        axios.defaults.headers.common['apikey'] = this.props.user.apikey;

    }


    setCookie(cname, cvalue, exdays) {
        // var d = new Date();
        // d.setTime(d.getTime() + (exdays*24*60*60*1000));
        // var expires = "expires="+ d.toUTCString();
        // document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        document.cookie=cname+"="+cvalue;
    }

    login(event){
        event.preventDefault();
        axios.post('/users/login', {
            username:this.username.value,
            password:this.password.value
        })

            .then((res) => {
                document.getElementById('closeModal').click()
                this.setState({redirect:true})

                const user = res.data;
                    this.setState({ user });
                    this.props.changeUser(user)
                    this.setCookie('apikey',user.apikey, 1)
                }
            ).catch((error)=> this.setState({'loginsuccess': false }))

    };



    render() {
        return (
            (this.state.redirect)?

                <Redirect to='/index'/>
                :
                <span>

                <span className="mr-2" data-toggle="modal" data-target="#myModal">
                    <button type={"button"} className={"btn btn-outline-light"}>
                     Sign in <i className="fas fa-sign-in-alt"></i>
                    </button>
                </span>

                <div className="modal fade" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title text-dark">Login</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <form onSubmit={this.login}>
                            {/*<form action={"/users/login"} method={"POST"}>*/}
                                <div className="modal-body">

                                    <div className="form-group">
                                        <label htmlFor="login_username"><span className={'text-muted'}><b>Username</b></span></label>
                                        <input ref={(ref) => {this.username = ref}} type="text" className="form-control" id="login_username" placeholder="Username" name={'username'} required={true}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="login_password"><span className={'text-muted'}><b>Password</b></span></label>
                                        <input ref={(ref) => {this.password = ref}} type="password" className="form-control" id="login_password" placeholder="Password" name={'password'} required={true}/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit"  className="btn btn-primary">Submit</button>
                                    <button type="button" className="btn btn-danger" data-dismiss="modal" id={'closeModal'}>Close</button>
                                </div>
                                {this.state.loginsuccess==false &&
                                <div className="alert alert-danger" role="alert">
                                    An error has occurred. Please try it again or Sign Up
                                </div>
                                }
                            </form>
                        </div>
                    </div>
                </div>

            </span>
        );
    }
}

export default ModalLogin;





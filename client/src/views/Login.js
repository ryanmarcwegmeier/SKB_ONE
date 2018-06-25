import React, { Component } from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios/index";
import {Redirect, Link} from 'react-router-dom'

/**
 * represents Login view
 */
class Login extends Component {

    constructor(props){
        super(props)
        this.login=this.login.bind(this)
        this.state={
            redirect:false,
            loginsuccess:true,
            isFetching:true,
        }
    }

    login(event){
        event.preventDefault();
        axios.post('/users/login', {
            username:this.username.value,
            password:this.password.value
        })

            .then((res) => {
                this.setState({isFetching:false})
                this.setState({redirect: true})
                    const user = res.data;
                    this.props.changeUser(user)
                    this.setCookie('apikey', user.apikey, 1)
                }
            ).catch((error)=> this.setState({'loginsuccess': false }))

    };

    /**
     * rendering login
     * @return {*}
     */
    render(){

        if(this.state.redirect && this.state.isFetching==false){
            return <Redirect to={'/index'}/>
        }

        return (
            <div className="App">
                <div className={'content'}>
                    <Header text={'Login'}/>
                    <main className={'container-fluid'}>
                        <div className={'row'}>
                            <div className={'col-md-8 ml-auto mr-auto bg-light shadow rounded p-3'}>
                                {!this.state.loginsuccess &&
                                    <div className={'m-3 alert alert-danger'}>
                                        <strong>Failure: </strong> Username or Password might be wrong
                                    </div>
                                }
                                <form onSubmit={this.login}>
                                    <div className="form-group">
                                        <label htmlFor="login_username_view"><span className={'text-muted'}><b>Username</b></span></label>
                                        <input ref={(ref) => {this.username = ref}} type="text" className="form-control" id="login_username_view" placeholder="Username" name={'username'} required={true}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="login_password_view"><span className={'text-muted'}><b>Password</b></span></label>
                                        <input ref={(ref) => {this.password = ref}} type="password" className="form-control" id="login_password_view" placeholder="Password" name={'password'} required={true}/>
                                    </div>

                                    <button className="form-control btn btn-outline-success mt-2 " type="submit">Login</button>
                                </form>
                                <span className="w3-right w3-padding w3-hide-small">Forgot <a href="#">password?</a></span>
                            </div>

                        </div>
                    </main>
                </div>
                <Footer/>

            </div>


        );
    }
}

export default Login;
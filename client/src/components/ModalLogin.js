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
        this.doSth=this.doSth.bind(this)
        this.hideOne=this.hideOne.bind(this)
    }

    hideOne(){
        document.getElementById('id01').style.display='none'
    }
    doSth(){
        document.getElementById('id01').style.display='block'
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
                    this.hideOne()
                    this.setState({redirect:true})
                    const user = res.data;
                    this.setState({ user });
                    this.props.changeUser(user)
                    this.setCookie('apikey',user.apikey, 1)
                    document.getElementById('navbarSupportedContent').classList.remove('show')                }
            ).catch((error)=> this.setState({'loginsuccess': false }))

    };



    render() {

        // damit sich das model schließt beim klicken außerhalb des logins
        window.onclick = function (event) {
            if (event.target == document.getElementById('id01')) {
                document.getElementById('id01').style.display = "none";
            }
            if (event.target == document.getElementById('signup')) {
                document.getElementById('signup').style.display = "none";
            }

        }

        return (
            (this.state.redirect && window.location.pathname!='/index')?

                <Redirect to='/index'/>
                :
                    <span className={'pr-2'}>
                        <button type={"button"} onClick={this.doSth} id="signin" className={"btn btn-outline-light"}>
                            Sign in <i className="fas fa-sign-in-alt"></i>
                        </button>
                         <div id="id01" className="w3-modal">
                             <div className="w3-modal-content rounded shadow w3-card-4 w3-animate-zoom" style={{maxWidth:"600px"}}>
                                 <div className="text-center w3-border-bottom"><br/>
                                     <span onClick={this.hideOne} className="btn btn-outline-danger w3-display-topright" title="Close Modal">&times;</span>
                                        <i className="fas fa-user-circle text-dark pb-4" style={{fontSize:'500%'}}></i>
                                     {this.state.loginsuccess==false &&
                                     <div className="alert alert-danger" role="alert">
                                         An error has occurred. Please try it again or Sign Up
                                     </div>
                                     }
                                 </div>
                                 <form className="w3-container" onSubmit={this.login}>
                                     <div className="w3-section">
                                        <div className="form-group">
                                            <label htmlFor="login_username"><span className={'text-muted'}><b>Username</b></span></label>
                                            <input ref={(ref) => {this.username = ref}} type="text" className="form-control" id="login_username" placeholder="Username" name={'username'} required={true}/>
                                        </div>
                                         <div className="form-group">
                                            <label htmlFor="login_password"><span className={'text-muted'}><b>Password</b></span></label>
                                            <input ref={(ref) => {this.password = ref}} type="password" className="form-control" id="login_password" placeholder="Password" name={'password'} required={true}/>
                                         </div>
                                         <button className="form-control btn btn-outline-success mt-2" type="submit">Login</button>

                                     </div>
                                 </form>
                                 <div className="w3-container w3-border-top w3-padding-16 w3-light-grey">
                                     <button onClick={this.hideOne} type="button"
                                             className="btn btn-outline-danger">Cancel</button>
                                     <span className="w3-right w3-padding w3-hide-small">Forgot <a href="#">password?</a></span>
                                 </div>

                             </div>
                         </div>
                    </span>
        );
    }
}

export default ModalLogin;





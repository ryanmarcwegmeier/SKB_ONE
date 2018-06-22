import React, { Component } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import axios from 'axios'
import {Redirect, Link} from 'react-router-dom'
class ModalSignUp extends Component {

    constructor(props){
        super(props);
        this.signup = this.signup.bind(this);
        this.state={
            isRegisterFailed:false,
            redirected:false,
        }
        axios.defaults.headers.common['apikey'] = this.props.user.apikey;
        this.props.changeUser(this.props.user)
    }

    open(){
        document.getElementById('signup').style.display='block'

    }
    hide(){
        document.getElementById('signup').style.display='none'
    }

    signup(event){

        if(this.password.value!=this.confirmpassword.value || this.password.value==""){
            this.setState({'isRegisterFailed': true });
            return;
        }else{
            event.preventDefault();
            axios.post('users',{
                username: this.username.value,
                email: this.email.value,
                password: this.password.value,
            })
                .then((res) => {
                    document.getElementById('close').click()
                    document.getElementById('navbarSupportedContent').classList.remove('show')

                    this.setState({
                        redirected:true,
                    })
                }).catch(function (error) {
                console.log(error);
            });
        }


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
            <span>

                {(this.state.redirected)&&
                    <Redirect to={'/index'}/>

                }

            <span>

                <button type={"button"} onClick={this.open} id="signin" className={"btn btn-outline-light"}>
                    Sign UP <i className="fas fa-user-plus "></i>
                </button>
                         <div id="signup" className="w3-modal">
                             <div className="w3-modal-content rounded shadow w3-card-4 w3-animate-zoom mb-3" style={{maxWidth:"600px"}}>
                                 <div className="text-center w3-border-bottom"><br/>
                                     <span onClick={this.hide} className="btn btn-outline-danger w3-display-topright" title="Close Modal">&times;</span>
                                        <i className="fas fa-user-plus text-dark pb-4" style={{fontSize:'400%'}}></i>
                                     {this.state.isRegisterFailed&&
                                     <div className="alert alert-danger">
                                         <strong>Failure!</strong>Passwords are not identical
                                     </div>
                                     }
                                 </div>
                                 <form className="w3-container" onSubmit={this.signup}>
                                     <div className="w3-section">
                                        <div className="form-group">
                                        <label htmlFor="username"><span className={'text-muted'}><b>Username</b></span></label>
                                        <input required={true} ref={(ref) => {this.username = ref}} type="text" className="form-control" id="username" placeholder="Username"/>
                                    </div>

                                         <div className="form-group">
                                        <label htmlFor="Email"><span className={'text-muted'}><b>Email</b></span></label>
                                        <input required={true}  ref={(ref) => {this.email = ref}} type="email" className="form-control" id="email" placeholder="Email"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="psw"><span className={'text-muted'}><b>Password</b></span></label>
                                        <input  ref={(ref) => {this.password = ref}} type="password" className="form-control" id="psw" placeholder="Password"/>
                                     <label htmlFor="pswcomfirm"><span className={'text-muted'}><b>Confirm Password</b></span></label>
                                        <input required={true} ref={(ref) => {this.confirmpassword = ref}} type="password" className="form-control" id="pswconfirm" placeholder="Password"/>
                                    </div>
                                         <button className="form-control btn btn-outline-success mt-2" type="submit">Sign up</button>

                                     </div>
                                 </form>
                                 <div className="w3-container w3-border-top w3-padding-16 w3-light-grey">
                                     <button onClick={this.hide} type="button"
                                             className="btn btn-outline-danger">Cancel</button>
                                 </div>

                             </div>
                         </div>
        </span>

            </span>
            )


    }

}

export default ModalSignUp;





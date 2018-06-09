import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
class ModalSignUp extends Component {

    constructor(props){
        super(props);
        this.signup = this.signup.bind(this);
        this.state={
            isRegisterFailed:false
        }
    }

    toggleModal(){
        document.getElementById('myModal').style.display = "none";
    }
    signup(event){

        if(this.password.value!=this.confirmpassword.value || this.password.value==""){
            this.setState({'isRegisterFailed': true });
            return;
        }else{
            event.preventDefault();
            fetch('/users', {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    "username": this.username.value,
                    "email":this.email.value,
                    "password":this.password.value
                })
            }).then((res) => {
                if (res.ok){
                    window.location.reload()
                } else {
                    alert('Registration Failed')
                }
            })
        }


    };

    render() {

        return (
            <span>
                <span className="" data-toggle="modal" data-target="#myModal2">
                    <button type={"button"} className={"btn btn-outline-light"}>
                     Sign UP <i className="fas fa-user-plus "></i>
                    </button>
                </span>

                <div className="modal fade" id="myModal2">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title text-dark">Sign UP</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <form onSubmit={this.signup}>
                                <div className="modal-body">

                                    <div className="form-group">
                                        <label htmlFor="username"><span className={'text-muted'}><b>Username</b></span></label>
                                        <input ref={(ref) => {this.username = ref}} type="text" className="form-control" id="username" placeholder="Username"/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="Email"><span className={'text-muted'}><b>Email</b></span></label>
                                        <input  ref={(ref) => {this.email = ref}} type="email" className="form-control" id="email" placeholder="Email"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="psw"><span className={'text-muted'}><b>Password</b></span></label>
                                        <input  ref={(ref) => {this.password = ref}} type="password" className="form-control" id="psw" placeholder="Password"/>
                                     <label htmlFor="pswcomfirm"><span className={'text-muted'}><b>Confirm Password</b></span></label>
                                        <input ref={(ref) => {this.confirmpassword = ref}} type="password" className="form-control" id="pswconfirm" placeholder="Password"/>
                                    </div>
                                </div>
                                {this.state.isRegisterFailed&&
                                <div className="alert alert-danger">
                                    <strong>Failure!</strong>Passwords are not identical
                                </div>
                                }
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </span>
        );
    }
}

export default ModalSignUp;





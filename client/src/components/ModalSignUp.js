import React, { Component } from 'react';

class ModalSignUp extends Component {

    constructor(props){
        super(props);
        this.signup = this.signup.bind(this);
    }

    signup(event){
        event.preventDefault();
        fetch('/signup', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "username": this.username.value,
                "firstname":this.firstname.value,
                "lastname":this.lastname.value,
                "email":this.email.value,
                "tel":this.tel.value,
                "password":this.password.value
            })
        }).then((res) => {
            if (res.ok){
                return res.json();
            } else {
                throw new Error ('Something went wrong with your fetch');
            }
        }).then((json) => {
            console.log(json);
        })
    };

    render() {

        return (
            <span>
                <span className="mr-2" data-toggle="modal" data-target="#myModal2">
                    <span className={"hov"}>
                     Sign UP <i className="fas fa-user-plus mr-4"></i>
                    </span>
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
                                        <label htmlFor="username">Username</label>
                                        <input ref={(ref) => {this.username = ref}} type="text" className="form-control" id="username" placeholder="Username"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="FirstName">FirstName</label>
                                        <input  ref={(ref) => {this.firstname = ref}} type="text" className="form-control" id="FirstName" placeholder="FirstName"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="LastName">LastName</label>
                                        <input  ref={(ref) => {this.lastname = ref}} type="text" className="form-control" id="LastName" placeholder="LastName"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Email">Email</label>
                                        <input  ref={(ref) => {this.email = ref}} type="email" className="form-control" id="Email" placeholder="Email"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="TelNummer">TelNummer</label>
                                        <input  ref={(ref) => {this.tel = ref}} type="tel" className="form-control" id="TelNummer" placeholder="TelNummer"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="psw">Password</label>
                                        <input  ref={(ref) => {this.password = ref}} type="password" className="form-control" id="username" placeholder="Password"/>
                                    </div>
                                </div>
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





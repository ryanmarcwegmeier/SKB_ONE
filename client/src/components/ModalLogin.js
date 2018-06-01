import React, { Component } from 'react';

class ModalLogin extends Component {

    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.state = {loginsuccess:true}
    }

    toggleModal(){
        document.getElementById('myModal').style.display = "none";
    }

    login(event){
        event.preventDefault();
        fetch('/users/getUser', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "username": this.username.value,
                "password":this.password.value
            })
        }).then((res) => {
            if (res.ok){
                return res.json();
            } else {
                throw new Error ('Something went wrong with your fetch');
            }
        }).then((json) => {
            if (json.status!=500 && json[1][0]!=undefined && json[1][0]!=null){
                let userObject={session_id:json[0].session_id, user:json[1][0]}
                sessionStorage.setItem('session', JSON.stringify(userObject));
                sessionStorage.setItem('activateEdit','false')
                window.location.reload();
            }else{
                this.setState({'loginsuccess': false });
            }
        })
    };



    render() {
        console.log(JSON.parse(sessionStorage.getItem("session")))
        return (
            <span>

                <span className="mr-2" data-toggle="modal" data-target="#myModal">
                    <span className={"hov"}>
                     Sign in <i className="fas fa-sign-in-alt mr-4"></i>
                    </span>
                </span>

                <div className="modal fade" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title text-dark">Login</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <form onSubmit={this.login}>
                                <div className="modal-body">

                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input ref={(ref) => {this.username = ref}} type="text" className="form-control" id="login_username" placeholder="Username" required={true}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="psw">Password</label>
                                        <input ref={(ref) => {this.password = ref}} type="password" className="form-control" id="login_password" placeholder="Password" required={true}/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit"   className="btn btn-primary">Submit</button>
                                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.toggleModal}>Close</button>
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





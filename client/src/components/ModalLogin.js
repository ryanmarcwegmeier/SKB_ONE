import React, { Component } from 'react';

class ModalLogin extends Component {

    render() {

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

                            <form onSubmit={'Hier kommt das '}>
                                <div className="modal-body">

                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" className="form-control" id="username" placeholder="Username"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="psw">Password</label>
                                        <input type="password" className="form-control" id="username" placeholder="Password"/>
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

export default ModalLogin;





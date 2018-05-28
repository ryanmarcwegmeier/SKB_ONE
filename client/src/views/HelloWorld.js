import React, { Component } from 'react';
import Footer from '../components/Footer'
import Header from "../components/Header";
import Navbar from "../components/Navbar"

class HelloWorld extends Component {

    render() {
        return(
        <div>
            <Navbar act={['', '', 'active']}/>
            <div className={"content"}>
            <Header />
            <main className={'bg-light container-fluid'}>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                    Open modal
                </button>

                <div className="modal fade" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Login</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <form action="http://localhost:3001/login" method="post">
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
            </main>
            <Footer/>
        </div>
        </div>)
    }
}

export default HelloWorld;
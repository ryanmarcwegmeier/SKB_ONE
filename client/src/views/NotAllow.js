import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';


class NotAllow extends Component {


    render() {
        return (
            <div className="App">

                        <div className="alert alert-danger">
                            <strong>Failure: </strong>You are not allowed to access this part!



                </div>

            </div>


        );
    }
}

export default NotAllow;
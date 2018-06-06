import React, { Component } from 'react';



class NoUser extends Component {


    render() {
        return (
            <div className="App">

                <div className="alert alert-danger">
                    <strong>Failure: </strong>User doesn't exists!



                </div>

            </div>


        );
    }
}

export default NoUser;
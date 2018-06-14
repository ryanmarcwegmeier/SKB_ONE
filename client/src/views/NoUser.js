import React, { Component } from 'react';

/**
 * represents NoUserFound view
 */
class NoUser extends Component {

    /**
     * rendering error
     * @return {*}
     */
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
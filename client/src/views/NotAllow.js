import React, { Component } from 'react';

/**
 * represents Access denied view
 */
class NotAllow extends Component {

    /**
     * render error message
     * @return {*}
     */
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
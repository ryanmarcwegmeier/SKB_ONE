import React, { Component } from 'react';

class Register extends Component {

    render() {

        return (
            <div className={'text-white'}>
                <span className={'mr-2'}>Sign In</span><i className="fas fa-sign-in-alt mr-4"></i>
                <span className={'mr-2'}>Sign UP</span><i className="fas fa-user-plus"></i>

            </div>
        );
    }
}

export default Register;
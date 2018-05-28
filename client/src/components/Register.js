import React, { Component } from 'react';
import ModalLogin from './ModalLogin';

class Register extends Component {

    render() {

        return (
            <div className={'text-white'}>
                <ModalLogin/>
                <span className={'mr-2'}>Sign UP</span><i className="fas fa-user-plus"></i>
            </div>
        );
    }
}

export default Register;
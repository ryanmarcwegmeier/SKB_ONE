import React, { Component } from 'react';
import ModalLogin from './ModalLogin';
import ModalSignUp from './ModalSignUp';

class Register extends Component {

    render() {

        return (
            <div className={'text-white'}>
                <ModalLogin/>
                <ModalSignUp/>
            </div>
        );
    }
}

export default Register;

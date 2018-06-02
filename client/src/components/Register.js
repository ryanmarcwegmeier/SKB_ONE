import React, { Component } from 'react';
import ModalLogin from './ModalLogin';
import ModalSignUp from './ModalSignUp';
import Logged from './Logged'

class Register extends Component {

    render() {

        return (
            <div className={'text-white'}>
                {(sessionStorage.getItem("sessionID") == null || sessionStorage.getItem("sessionID") == "")
                    ?
                    <span>
                <ModalLogin/>
                < ModalSignUp/>
                    </span>
                    :
                    <Logged/>
                }
                </div>

        );
    }
}

export default Register;

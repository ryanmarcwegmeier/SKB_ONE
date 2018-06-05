import React, { Component } from 'react';
import ModalLogin from './ModalLogin';
import ModalSignUp from './ModalSignUp';
import Logged from './Logged'

class Register extends Component {

    render() {
        return (
            <div className={'text-white'}>
                {(!this.props.isLogged)
                    ?
                    <span>
                <ModalLogin/>
                < ModalSignUp/>
                    </span>
                    :
                    <Logged username={this.props.username}/>
                }
                </div>

        );
    }
}

export default Register;

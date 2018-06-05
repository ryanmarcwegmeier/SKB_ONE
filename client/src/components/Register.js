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
                    <Logged userID={this.props.userID}/>
                }
                </div>

        );
    }
}

export default Register;

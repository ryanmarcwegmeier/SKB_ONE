import React, { Component } from 'react';
import ModalLogin from './ModalLogin';
import ModalSignUp from './ModalSignUp';
import Logged from './Logged'

class Register extends Component {
    constructor(props){
        super(props)

    }

    render() {
        return (
            <div className={'text-white'}>
                {(!this.props.isLogged)
                    ?
                    <span>
                <ModalLogin changeUser={this.props.changeUser} user={this.props.user}/>
                < ModalSignUp changeUser={this.props.changeUser} user={this.props.user}/>
                    </span>
                    :
                    <Logged changeUser={this.props.changeUser} user={this.props.user}/>
                }
                </div>

        );
    }
}

export default Register;

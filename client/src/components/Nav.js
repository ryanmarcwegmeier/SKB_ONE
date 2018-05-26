import React, { Component } from 'react';
import NavItems from './NavItems'
class Nav extends Component {

    static defaultProps = {act:['','','']};

    render() {
        return (

            <ul className="navbar-nav mr-auto ml-auto h5" >
                <NavItems name={"Home"} url={'/index'} act={this.props.act[0]}/>
                <NavItems name={"User"} url={'/user'} act={this.props.act[1]}/>
                <NavItems name={"Hello world"} url={'/hello'} act={this.props.act[2]}/>

            </ul>
        );
    }
}

export default Nav;
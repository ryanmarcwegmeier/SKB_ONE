import React, { Component } from 'react';

class NavItems extends Component {

    render() {
        return (
            <li className={"nav-item " + this.props.act}>
                <a className="nav-link" href={this.props.url}> {this.props.text}</a>
            </li>
        );
    }
}

export default NavItems;
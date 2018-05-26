import React, { Component } from 'react';
import Navbar from './Navbar'

class Header extends Component {

    render() {

        return (
            <header className={'bg-info rounded'}>
                <Navbar act={this.props.act}/>

                <div id={"headContent"} className={"mt-5 pt-4"}>
                    <h1 className={'text-center text-white pt-4 pb-5'} >Sprach - Kulturbörse Berlin</h1>
                </div>

            </header>
        );
    }
}

export default Header;
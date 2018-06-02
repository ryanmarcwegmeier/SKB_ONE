import React, { Component } from 'react';
import Navbar from './Navbar'

class Header extends Component {

    render() {

        return (
            <header className={'bg-danger rounded-bottom'} style={{margin:0}}>
                <div id={"headContent"} className={""}>
                    <h1 className={'text-center text-white pt-4 pb-5 m-0'} >Sprach - Kulturbörse Berlin</h1>
                </div>

            </header>
        );
    }
}

export default Header;
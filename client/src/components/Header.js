import React, { Component } from 'react';

class Header extends Component {

    render() {

        return (
            <header className={'bg-danger rounded-bottom'} style={{margin:0}}>
                <div id={"headContent"} className={""}>
                    <h1 className={'text-center text-white pt-4 pb-5 m-0'} style={{textShadow: "0px 0px 20px black"}} >{this.props.text}</h1>
                </div>

            </header>
        );
    }
}

export default Header;
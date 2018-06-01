import React, { Component } from 'react';
import Footer from '../components/Footer'
import Header from "../components/Header";
import Navbar from "../components/Navbar"

class Contact extends Component {
    render () {
        return (
            <div className="App">
                <Navbar act={['active', '', '']}/>
                <div className={"content"}>
                    <Header act={['active','','']}/>
                    <main className={'bg-light container-fluid'}>
                        <div className={'row'}>
                            <div className={'col-sm-11 ml-auto mr-auto'}>

                                Comming soon...
                            </div>

                        </div>

                    </main>

                    <Footer/>
                </div>

            </div>
        )
    }


}

export default Contact;
import React, { Component } from 'react';
import Footer from '../components/Footer'
import Header from "../components/Header";


class HelloWorld extends Component {

    render() {
        return (
            <div>
                <Header act={['','', 'active']}/>
                <main style={{minHeight:'50vh'}}>
                    Hello World
                </main>
                <Footer/>
            </div>
        );
    }
}

export default HelloWorld;
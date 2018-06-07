import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';


class Dashboard extends Component {

    componentWillMount(){
        sessionStorage.clear()
    }


    render() {
        return (
            <div className="App">
                <div className={"content"}>
                    <Header text={"Sprach- und Kulturbörse Berlin"}/>
                    <main className={'bg-light container-fluid'}>
                        <div className={'row'}>
                            <div className={'col-md-3'}>
                                 <span className={"card float-left"}>
                                     <div className="card-header"style={{background:' #ffffcc'}}><b>Your Courses</b></div>
                                        <div className="card-body">
                                            <nav id='nav_bar'>
                                                <ul className='nav_links'>
                                                    <li><a href="url">Sign In</a></li>
                                                    <li><a href="url">Blog</a></li>
                                                    <li><a href="url">About</a></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </span>
                            </div>
                            <div className={'col-md-6'}>
                                <span className={"card ml-auto mr-auto"}>
                                    <div className="card-header" style={{background:'#ffffcc'}}><b>News</b></div>
                                        <div className="card-body">
                                            <article className={'border round shadow-sm mb-3 p-2'} >
                                                <p><i>01.01.1990, by blupp</i></p>
                                                <p>
fdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasd
                                                </p>
                                            </article>
                                           <article className={'border round shadow-sm mb-3 p-2'} >
                                                <p><i>01.01.1990, by blupp</i></p>
                                                <p>
fdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasd
                                                </p>
                                            </article>
                                            <article className={'border round shadow-sm mb-3 p-2'} >
                                                <p><i>01.01.1990, by blupp</i></p>
                                                <p>
fdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasd
                                                </p>
                                            </article>
                                        </div>
                                    </span>
                            </div>
                            <div className={'col-md-3'}>
                                 <span className={"card float-right"}>
                                     <div className="card-header" style={{background:'#ffffcc'}}> <b>Recent messages</b></div>
                                        <div className="card-body">
                                            <ul>
                                                <li>Lorem</li>
                                                <li>Ipsum</li>
                                            </ul>
                                        </div>
                                    </span>
                            </div>
                        </div>

                    </main>
                    <Footer/>
                </div>

            </div>


        );
    }
}

export default Dashboard;
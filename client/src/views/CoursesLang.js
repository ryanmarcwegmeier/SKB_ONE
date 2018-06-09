import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';
import {NavLink} from "react-router-dom";
import NotAllow from "./NotAllow";

/** Class representing User View. */
class CourseLang extends Component {
    state = {langs: []}

    /**
     *constructor
     * @param props
     */
    constructor(props){
        super(props);
    }

    /**
     * fetch all users from DB
     */
    componentWillMount() {
        sessionStorage.clear()
        fetch('/lang')
            .then(res => res.json())
            .then(langs => this.setState({ langs }));
    }


    render() {
        return (

            <div className="App">
                <div className={"content"}>
                <Header text={"Choose language"} />

                <main className={'container-fluid'}>
                    {(true)?

                    <div className={'row'}>
                        <div className={'col-sm-5 ml-auto mr-auto m-3'}>

                            <div>
                                <div className="table-responsive bg-light shadow rounded">
                                    <ul className="list-group" style={{textAlign:'center'}}>
                                        {this.state.langs.map(lang =>
                                            <li className={'list-group-item language'} style={{padding:0}}>
                                                <NavLink exact to={"courses/"+lang.toLowerCase()+'/view' }>
                                                    <span className="nav-link p-3" >
                                                        {lang}
                                                    </span>
                                                </NavLink>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>



                        </div>

                    </div>
                    :<NotAllow/>}

                </main>

                <Footer/>
                </div>

            </div>

        );
    }
}

export default CourseLang;
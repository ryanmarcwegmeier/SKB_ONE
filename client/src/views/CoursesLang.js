import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';
import {NavLink} from "react-router-dom";
import NotAllow from "./NotAllow";
import Zoom from 'react-reveal/Zoom';


/** Class representing User View. */
class CourseLang extends Component {

    /**
     *constructor
     * @param props
     */
    constructor(props){
        super(props);
        this.state={
            langs:[],
            isFetching:true,
        }
    }

    /**
     * fetch all users from DB
     */
    componentWillMount() {
        sessionStorage.clear()
        fetch('/lang')
            .then(res => res.json())
            .then(langs => {this.setState({ langs });{this.setState({isFetching:false})}});
    }


    render() {
        return (

            <div className="App">
                <div className={"content"}>
                <Header text={"Choose language"} />

                <main className={'container-fluid'}>
                    {(true)?

                    <div className={'row'}>
                        <div className={'col-sm-5 ml-auto mr-auto p-0 m-3 bg-light shadow rounded'}>

                            <div>
                                {(this.state.isFetching) ?
                                    <div className={'text-center p-4'}>
                                        <i className="fa fa-spinner fa-spin" style={{fontSize: "5vw"}}></i>
                                    </div> :
                                    <div className="table-responsive">
                                        <ul className="list-group" style={{textAlign: 'center'}}>
                                            {this.state.langs.map(lang =>
                                                <Zoom>
                                                <li className={'list-group-item language'} style={{padding: 0}}>
                                                    <NavLink exact to={"courses/" + lang.toLowerCase() + '/view'}>
                                                    <span className="nav-link p-3">
                                                        {lang}
                                                    </span>
                                                    </NavLink>
                                                </li>
                                                </Zoom>
                                            )}
                                        </ul>
                                    </div>
                                }
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
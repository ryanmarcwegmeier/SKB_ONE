import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';
import {NavLink, Link} from "react-router-dom";
import NotAllow from "./NotAllow";
import Zoom from 'react-reveal/Zoom';
import axios from "axios/index";


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
        axios.defaults.headers.common['apikey'] = this.props.user.apikey;

    }

    /**
     * fetch all langs from DB
     */
    componentWillMount() {

        axios.get('/lang')
            .then((res)=>{
                this.setState({langs:res.data})
                this.setState({isFetching:false})
            })
    }

    /**
     * Renders a list of languages from
     * @return {*}
     */
    render() {
        return (

            <div className="App">
                <div className={"content"}>
                <Header text={"Choose language"} />

                <main className={'container-fluid'}>
                    {(this.props.user.role!='guest')?

                    <div className={'row'}>
                        <div className={'col-sm-5 ml-auto mr-auto p-0 m-3 bg-light shadow rounded'}>
                            {(this.props.user.role=='admin' || this.props.user.role=='teacher') &&
                            <span className="d-inline-block" tabIndex="0" data-toggle="tooltip"
                                  title="Add Course">
                                    <Link to="/courses/create/form">
                                        <button type="button" className="btn btn-outline-dark m-2" ><i className="fas fa-plus"></i>Add Course</button></Link>
                                    </span>
                            }
                            {this.state.isFetching ?
                                <div className={'text-center p-4'}>
                                    <i className="fa fa-spinner fa-spin" style={{fontSize: "5vw"}}></i>
                                </div>
                                :


                                <div>
                                    {(!this.state.langs.length) ?
                                        <div className="alert alert-info  m-0 shadow">
                                            <strong>Info!</strong> No courses available
                                        </div> :
                                        <div className="table-responsive">
                                            <ul className="list-group" style={{textAlign: 'center'}}>
                                                {this.state.langs.map(lang =>
                                                    <Zoom>
                                                        <li className={'list-group-item language'} style={{padding: 0}}>
                                                            <NavLink exact
                                                                     to={"courses/" + lang.toLowerCase() + '/view'}>
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


                            }
                        </div>

                    </div>
                    :
                        <div className="alert alert-danger">
                            <strong>Denied access: </strong>You are not allowed to access this part!.<br/>
                            Please sign up oder sign in
                        </div>
                    }

                </main>

                </div>
                <Footer/>

            </div>

        );
    }
}

export default CourseLang;
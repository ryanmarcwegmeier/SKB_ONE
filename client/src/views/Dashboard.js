import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';
import Zoom from 'react-reveal/Zoom';
import {Link} from 'react-router-dom'
import axios from "axios/index";

/**
 * represents Dashboard view
 */
class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state={
            courses:[],
            error:false,
        }
        axios.defaults.headers.common['apikey'] = this.props.user.apikey;
        this.getmycourses=this.getmycourses.bind(this)
    }


    getmycourses(){
        axios.get('/usercoursemapping/courses/')
            .then((res)=>{
                const courses=res.data
                this.setState({courses:courses})
            }).catch((error)=>{
            this.setState({error:true})
        })
    }

    /**
     * clear all sessions
     */
    componentWillMount(){
        sessionStorage.clear()
        this.getmycourses()
    }

    /**
     * renders Dashboard of User
     * @return {*}
     */
    render() {
        return (
            <div className="App">
                <div className={"content"}>
                    <Header text={"Sprach- und Kulturbörse Berlin"}/>
                    <main className={'bg-light container-fluid'}>
                        <div className={'row'}>
                            <div className={'col-md-4 bg-light'}>
                                <Zoom>
                                <div className={"card border-rounded shadow mb-3"}>
                                     <div className="card-header dashItem text-center">

                                         <Link to={"/users/"+this.props.user.username}>
                                             <div><b className={'text-dark'}>My Profile</b></div>
                                             <b className={'text-dark'}>
                                                 <i className="fas fa-user-circle" style={{fontSize:'3em'}}></i>
                                             </b>
                                         </Link>


                                     </div>
                                        <div className="card-body">
                                                <div className={'row'}>
                                                    <div className={'col'}>
                                                        <div>
                                                            Username
                                                        </div>
                                                        <div>
                                                            Email
                                                        </div>
                                                        <div>
                                                            Role
                                                        </div>
                                                    </div>
                                                    <div className={'col'}>
                                                        <div>{this.props.user.username}</div>
                                                        <div>{this.props.user.email}</div>
                                                        <div>{this.props.user.role}</div>
                                                    </div>

                                                </div>
                                        </div>
                                    </div>
                                </Zoom>
                                {(this.props.user.role!='admin')&&
                                <Zoom>
                                    <div className={"card border-rounded shadow mb-3"}>
                                        <div className="card-header dashItem">
                                            <b>
                                                <i className="fas fa-graduation-cap mr-2"></i>
                                                Your Courses
                                            </b>
                                        </div>
                                        <div className="card-body">
                                            <nav id='nav_bar'>
                                                <ul className='list-group'>
                                                    {
                                                        this.state.courses.map(course =>
                                                            <li className={'list-group-item shadow'} key={course._id}>
                                                                <Link to={'courses/'+course._id}>
                                                                    {course.level + " - " + course.language}
                                                                </Link>
                                                            </li>
                                                        )
                                                    }
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </Zoom>
                                }

                            </div>
                            <div className={'col-md-8 mb-3'}>
                                <span className={"card float-md-right ml-3 recentMessage mb-3 shadow"}>
                                     <div className="card-header dashItem" > <b>Recent messages</b></div>
                                        <div className="card-body">
                                            <ul>
                                                <li>Lorem</li>
                                                <li>Ipsum</li>
                                            </ul>
                                        </div>
                                    </span>
                                <span className={"card shadow"}>
                                    <div className="card-header dashItem"><b>News</b></div>
                                        <div className="card-body">
                                            <Zoom>

                                            <article className={'border rounded shadow mb-3 p-2'} >
                                                <p><i>01.01.1990, by blupp</i></p>
                                                <p>
fdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasd
                                                </p>
                                            </article>
                                            </Zoom>
                                           <Zoom>

                                            <article className={'border rounded round shadow mb-3 p-2'} >
                                                <p><i>01.01.1990, by blupp</i></p>
                                                <p>
fdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasd
                                                </p>
                                            </article>
                                            </Zoom>
                                            <Zoom>

                                            <article className={'border rounded shadow mb-3 p-2'} >
                                                <p><i>01.01.1990, by blupp</i></p>
                                                <p>
fdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasdfdsfdsafdsafasd
                                                </p>
                                            </article>
                                            </Zoom>
                                            <Zoom>


                                            </Zoom>
                                        </div>
                                    </span>
                            </div>

                        </div>

                    </main>
                </div>
                <Footer/>

            </div>


        );
    }
}

export default Dashboard;
import React, { Component } from 'react';
import Intro from '../components/coursedetails/Intro'
import Overview from '../components/coursedetails/Overview'
import CourseContent from '../components/coursedetails/CourseContent'
import FAQ from '../components/coursedetails/FAQ'
import Instructor from '../components/coursedetails/Instructors'
import { configureAnchors } from 'react-scrollable-anchor'

import ScrollableAnchor from 'react-scrollable-anchor'

import '../coursedetails.css'

import axios from "axios/index";
import Footer from "./Footer";

class CoursesDetail extends Component {

    constructor(props){
        super(props)
        this.courseID=this.props.match.params.id
        this.state={
            kurs:{},
            isUser:false,
            failed:false,
            isFetching:true,
        }
        axios.defaults.headers.common['apikey'] = this.props.user.apikey;
        configureAnchors({offset:-110, scrollDuration: 200})
        this.checkUser=this.checkUser.bind(this)
        this.onchange=this.onchange.bind(this)
    }

    onchange() {
        if(document.getElementById('navbarSupportedContent').classList.contains('show')) {
            document.getElementById('courseNav').style.top = document.getElementById('navbar').clientHeight+"px"
        }
        else if (!this.state.isFetching && document.getElementById('courseNav').offsetTop > 200) {
                document.getElementById('courseNav').style.top = '51px'
            }
    }

    checkUser(){
        axios.get('/usercoursemapping/isuser/'+this.state.kurs._id)
            .then(res=>{
                const user=res.data
                this.setState({isUser:user})
                this.setState({isFetching:false})
            })
            .catch((error)=>{
            this.setState({error:true})
            })
    }

    componentDidMount(){
           window.addEventListener("scroll", this.onchange);
           this.onchange()


    }
    
    componentWillMount() {
        axios.get('/courses/'+this.courseID)
            .then(res => {
                this.setState({kurs:res.data})
                this.checkUser()
            })
            .catch((error)=>this.setState({failed:true}))
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.onchange);
    }



    render () {
        return (
            (this.state.isFetching)?
                    <div className={'text-center p-4'}>
                        <i className="fa fa-spinner fa-spin" style={{fontSize: "5vw"}}></i>
                    </div>:
                <div className="App">
                    {(!this.state.isUser)?
                        <div className="alert alert-danger">
                            <strong>Access denied!</strong> You are not a member of this course
                        </div>
                        :

                        <div className={"content"}>



                            {(this.state.failed)?
                                <main className="container-fluid">
                                    <div className="alert alert-danger">
                                        <strong>Failure!</strong> Course doenn't exists
                                    </div>
                                </main>
                                :
                                <div>
                                    <Intro kurs={this.state.kurs} user={this.props.user} />
                                    <nav id={'courseNav'} className="navbar navbar-expand-sm navbar-light bg-light sticky-top shadow-sm" style={{zIndex:100000}}>

                                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                                data-target="#course-navigation" aria-controls="navbarSupportedContent"
                                                aria-expanded="false" aria-label="Toggle navigation">
                                            <span className="navbar-toggler-icon"></span>
                                        </button>

                                        <div className="collapse navbar-collapse" id="course-navigation">
                                            <ul className="navbar-nav mr-auto">
                                                <li className="nav-item">
                                                    <a className="nav-link"  href={'#course-overview'}>Overview</a>
                                                </li>
                                                <li className="nav-item" >
                                                    <a className="nav-link" href={'#course-content'}>Course Content</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link"  href={'#course-faqs'}>FAQs</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href={'#course-instructors'}>Instructors</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </nav>
                                    <main className="container-fluid">
                                        <div className="row pt-5 p-3">
                                            <ScrollableAnchor id={'course-overview'}>
                                                <div>
                                                    <h2 style={{width:'100vw', borderBottom:'solid 1px black'}}>Recent Activity</h2>
                                                </div>
                                            </ScrollableAnchor>
                                            <Overview/>
                                        </div>
                                        <div className="row pt-5 p-3">
                                            <ScrollableAnchor id={'course-content'}>
                                                <div>
                                                    <h2 style={{width:'100vw', borderBottom:'solid 1px black'}}>Events</h2>
                                                </div>
                                            </ScrollableAnchor>
                                            <CourseContent/>
                                        </div>
                                        <div className="row pt-5 p-3">
                                            <ScrollableAnchor id={'course-faqs'}>
                                                <div>
                                                    <h2 style={{width:'100vw', borderBottom:'solid 1px black'}}>FAQs</h2>
                                                </div>
                                            </ScrollableAnchor>
                                            <FAQ/>
                                        </div>
                                        <div className="row pt-5 p-3">
                                            <ScrollableAnchor id={'course-instructors'}>
                                                <div>
                                                    <h2 style={{width:'100vw', borderBottom:'solid 1px black'}}>Meet the instructors</h2>
                                                </div>
                                            </ScrollableAnchor>
                                            <Instructor/>
                                        </div>
                                    </main>
                                </div>

                            }
                        </div>
                    }
                    <Footer/>


                </div>)
    }


}

export default CoursesDetail;

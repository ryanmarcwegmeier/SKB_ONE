import React, { Component } from 'react';
import Footer from '../components/Footer'
import Intro from '../components/coursedetails/Intro'
import CourseNav from '../components/coursedetails/CourseNav'
import Overview from '../components/coursedetails/Overview'
import CourseContent from '../components/coursedetails/CourseContent'
import Forum from '../components/coursedetails/Forum'
import FAQ from '../components/coursedetails/FAQ'
import Instructor from '../components/coursedetails/Instructors'
import '../coursedetails.css'
import ScrollableAnchor from 'react-scrollable-anchor'
import axios from "axios/index";





class CoursesDetail extends Component {

    constructor(props){
        super(props)
        this.courseID=this.props.match.params.id
        this.state={
            kurs:{},
            failed:false
        }
        axios.defaults.headers.common['apikey'] = this.props.user.apikey;

    }


    componentWillMount() {
        axios.get('/courses/'+this.courseID)
            .then(res => {
                this.setState({kurs:res.data})
            })
            .catch((error)=>this.setState({failed:true}))


    }



    render () {
        return (
            <div className="App">
                <div className={"content"}>

                    {(this.state.failed)?
                        <main className="container-fluid">
                        <div className="alert alert-danger">
                            <strong>Failure!</strong> Course doen't exists
                        </div>
                        </main>
                        :
                        <div>
                            <Intro kurs={this.state.kurs} />
                            <CourseNav/>
                            <main className="container-fluid">
                                <div className="row">

                                    <ScrollableAnchor id={'course-overview'}>
                                        <Overview/>
                                    </ScrollableAnchor>
                                    <ScrollableAnchor id={'course-content'}>
                                        <CourseContent/>
                                    </ScrollableAnchor>

                                    <ScrollableAnchor id={'course-forum'}>
                                        <Forum/>
                                    </ScrollableAnchor>
                                    <ScrollableAnchor id={'course-faqs'}>
                                        <FAQ/>
                                    </ScrollableAnchor>
                                    <ScrollableAnchor id={'course-instructors'}>
                                        <Instructor/>
                                    </ScrollableAnchor>


                                </div>
                            </main>
                        </div>

                    }

                    <Footer/>
                </div>

            </div>
        )
    }


}

export default CoursesDetail;

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





class CoursesDetail extends Component {

    constructor(props){
        super(props)
        this.courseID=this.props.match.params.id
        this.state={
            kurs:{}

        }
    }


    componentWillMount() {
        fetch('/courses/'+this.courseID)
            .then(res => res.json())
            .then(json => this.setState({kurs:json}))
            .catch((error)=>this.setState({failed:true}))


    }



    render () {
        return (
            <div className="App">
                <div className={"content"}>

                    <Intro kurs={this.state.kurs} />
                    <CourseNav/>
                    <main className="container">
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

                    <Footer/>
                </div>

            </div>
        )
    }


}

export default CoursesDetail;

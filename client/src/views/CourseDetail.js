import React, { Component } from 'react';
import Footer from '../components/Footer'
import Header from "../components/Header";
import Navbar from "../components/Navbar"

import Intro from '../components/coursedetails/Intro'
import CourseNav from '../components/coursedetails/CourseNav'
import Overview from '../components/coursedetails/Overview'
import CourseContent from '../components/coursedetails/CourseContent'
import Forum from '../components/coursedetails/Forum'
import FAQ from '../components/coursedetails/FAQ'
import Instructor from '../components/coursedetails/Instructors'
import '../coursedetails.css'


class CoursesDetail extends Component {
    render () {
        return (
            <div className="App">
                <Navbar act={['active', '', '']}/>
                <div className={"content"}>

                    <Intro/>
                    <CourseNav/>
                    <main class="container">
                        <div class="row">
                            <Overview/>
                            <CourseContent/>
                            <Forum/>
                            <FAQ/>
                            <Instructor/>


                        </div>
                    </main>

                    <Footer/>
                </div>

            </div>
        )
    }


}

export default CoursesDetail;

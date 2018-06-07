import React, { Component } from 'react';
import Footer from '../components/Footer'
import Header from "../components/Header";
import Navbar from "../components/Navbar"

class Courses extends Component {

    state = {courses: []}

    constructor(props){
        super(props);
        this.showDetails = this.showDetails.bind(this);
    }

    /**/
    showDetails(course){
        console.log(course.title);
    };

    // load session data into components state
    componentWillMount() {
        fetch('/courses', {method: 'get'})
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                console.log(json);
                this.setState((state) => ({courses:json}))
            })
    }

    render () {
        console.log("render courses");
        return (
            <div className="App">
                <div className={"content"}>
                    <Header act={['active','','']}/>
                    <main className={'bg-light container-fluid'}>
                        <div className={'row'}>
                            <div className={'col-sm-11 ml-auto mr-auto'}>
                                <div>
                                    <h1> Courses </h1>
                                    <div className="table-responsive">
                                        <table className="table table-bordered">
                                            <thead className={""}>
                                                <tr>
                                                    <th scope="col">Title</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Room</th>                                                    
                                                </tr>
                                            </thead>

                                            <tbody>
                                            {
                                                this.state.courses.map(course =>
                                                    <tr onClick={() => this.showDetails(course)} key={course._id}>
                                                        <td>{course.title}</td>
                                                        <td>{course.description}</td>
                                                        <td>{course.room}</td>                                                        
                                                    </tr>
                                                )
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>       
                            </div>
                        </div>
                    </main>
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default Courses;

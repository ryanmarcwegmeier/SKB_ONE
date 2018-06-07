import React, { Component } from 'react';
import Footer from '../components/Footer'
import Header from "../components/Header";
import {Link} from "react-router-dom";
class Courses extends Component {

    state = {courses: []}

    constructor(props){
        super(props);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    /**/
    showDetails(course){
        console.log(course.title);
    };

    // load session data into components state
    componentWillMount() {
        fetch('/courses/'+this.props.match.params.lang+"/view", {method: 'get'})
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                this.setState((state) => ({courses:json}))
            })
    }

    deleteCourse(course_id){
        return event => {
            event.preventDefault();
            fetch(('/course/'+course_id), {
                method: 'delete',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "_id": course_id,
                })
            }).then((res) => {
                if (res.ok) {
                    window.location.reload(false);
                } else {
                    throw new Error('Something went wrong with your fetch');
                }
            })
        }
    };

    render () {
        return (
            <div className="App">
                <div className={"content"}>
                    <Header text={"Courses - "+this.props.match.params.lang}/>
                    <main className={'bg-light container-fluid'}>
                        <div className={'row'}>
                            <div className={'col-sm-11 ml-auto mr-auto'}>
                                <div>
                                    <div className="table-responsive">
                                        <table className="table table-bordered">
                                            <thead className={""}>
                                                <tr>
                                                    <th scope="col">Level</th>
                                                    <th scope='col'>Description</th>
                                                    <th scope="col">Weekday</th>
                                                    <th scope="col">Timeframe</th>
                                                    <th scope="col">Time</th>
                                                    <th scope="col">Teacher</th>
                                                    <th scope="col">Room</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                            {
                                                this.state.courses.map(course =>
                                                    <tr>
                                                        <td>{course.level}</td>
                                                        <td>{course.description}</td>
                                                        <td>{course.day}</td>
                                                        <td>
                                                            {course.dateStart.substr(0,10)+" until "+ course.dateEnd.substr(0,10)}
                                                        </td>
                                                        <td>{course.time}</td>
                                                        <td>
                                                            {
                                                                course.teachers.map(e=>
                                                                    (e==course.teachers[course.teachers.length-1])?e.name:e.name+", "
                                                                )
                                                            }
                                                        </td>
                                                        <td>
                                                            {course.room}
                                                        </td>
                                                        {this.props.loggedUser.role != 'guest' &&
                                                        <td><Link to={"/courses/" + course._id}>
                                                            <button type={'button'}
                                                                    className="btn btn-light border rounded-circle text-center">
                                                                <i className="fas fa-id-card"></i>

                                                            </button>
                                                        </Link></td>
                                                        }
                                                        {this.props.loggedUser.role!='guest' &&
                                                        <td>

                                                        <form onSubmit={this.deleteCourse(course._id)}>
                                                            <button type={'submit'}
                                                            className="btn btn-light border rounded-circle text-center">
                                                            <i className="fas fa-user-times"></i></button>
                                                        </form>
                                                        </td>
                                                        }

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

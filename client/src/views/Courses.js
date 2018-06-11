import React, { Component } from 'react';
import Footer from '../components/Footer'
import Header from "../components/Header";
import {Link} from "react-router-dom";
import Zoom from 'react-reveal/Zoom'

class Courses extends Component {


    constructor(props){
        super(props);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.state = {
            courses: [],
            isFetching:true,
        }

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
                this.setState((state) => ({courses:json, isFetching:false}))
            })
    }

    deleteCourse(course_id){
        return event => {
            event.preventDefault();
            fetch(('/courses/'+course_id), {
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
                    <main className={'container-fluid'}>
                        <div className={'row'}>
                            <div className={'col-sm-11 ml-auto mr-auto '}>
                                {(this.state.isFetching)?
                                    <div className={'bg-light shadow text-center'}>
                                        <i className="fa fa-spinner fa-spin" style={{fontSize: "5vw"}}></i>
                                    </div>
                                    :
                                    <div className={'bg-light shadow'}>
                                        {(this.props.loggedUser.role=='admin' || this.props.loggedUser.role=='teacher') &&
                                        <span className="d-inline-block" tabIndex="0" data-toggle="tooltip"
                                              title="Add Course">
                                    <Link to="/courses/german/add">
                                        <button type="button" className="btn btn-outline-dark m-2" ><i className="fas fa-plus"></i>Add Course</button></Link>
                                    </span>
                                        }
                                        <Zoom>
                                        <div className="table-responsive">
                                            <table className="table ">
                                                <thead className={""}>
                                                <tr>
                                                    <th scope="col">Level</th>
                                                    <th scope='col'>Description</th>
                                                    <th scope="col">Weekday</th>
                                                    <th scope="col">Timeframe</th>
                                                    <th scope="col">Time</th>
                                                    <th scope="col">Teacher</th>
                                                    <th scope="col">Room</th>
                                                    <th scope="col"/>
                                                    <th scope="col"/>
                                                </tr>
                                                </thead>

                                                <tbody>
                                                {
                                                    this.state.courses.map(course =>
                                                        <Zoom>
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
                                                            {this.props.loggedUser.role!='guest' && this.props.loggedUser.role != 'student' &&
                                                            <td>

                                                                <form onSubmit={this.deleteCourse(course._id)}>
                                                                    <button type={'submit'}
                                                                            className="btn btn-light border rounded-circle text-center">
                                                                        <i className="fas fa-user-times"></i></button>
                                                                </form>
                                                            </td>
                                                            }

                                                        </tr>
                                                        </Zoom>
                                                    )
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                        </Zoom>
                                    </div>

                                }


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

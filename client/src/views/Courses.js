import React, { Component } from 'react';
import Footer from '../components/Footer'
import Header from "../components/Header";
import {Link} from "react-router-dom";
import Zoom from 'react-reveal/Zoom'
import axios from 'axios';

/**
 * represents Courses view
 */
class Courses extends Component {

    /**
     * constructor
     * @param props
     */
    constructor(props){
        super(props);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.getAllCourses=this.getAllCourses.bind(this)
        this.state = {
            courses: [],
            isFetching:true,
            error:false,
            deleteErr:false
        }
        axios.defaults.headers.common['apikey'] = this.props.user.apikey;
    }


    /**
     *get all courses depending on language
     */
    getAllCourses(){
        axios.get('/courses/'+this.props.match.params.lang+'/view')
            .then((res)=>{
                const courses=res.data
                this.setState({courses})
                this.setState({isFetching:false})
            }).catch((error)=>{
            this.setState({error:true})
        })
    }

    /**
     * Mounting
     */
    componentDidMount() {
        this.getAllCourses()

    }

    /**
     * Deletes a single course  depending on his course ID
     * @param course_id - specific ID of course
     * @return {Function}
     */
    deleteCourse(course_id){
        return event => {
            event.preventDefault();

            if(window.confirm('Are you sure to delete this item?')){
                axios.delete('/courses/'+course_id)
                    .catch(()=>this.setState({deleteErr:true}))
                this.getAllCourses()
            }
        }

    }

    /**
     * renders a list of courses depending on language
     * @return {*}
     */
    render () {
        return (
            <div className="App">
                <div className={"content"}>
                    <Header text={"Courses - "+this.props.match.params.lang}/>
                    <main className={'container-fluid'}>
                        <div className={'row'}>
                            <div className={'col-sm-11 ml-auto mr-auto '}>
                                {(this.state.isFetching) ?
                                    <div className={'bg-light shadow text-center'}>
                                        <i className="fa fa-spinner fa-spin" style={{fontSize: "5vw"}}></i>
                                    </div>
                                    :
                                    (<div>
                                        {(!this.state.courses.length) ?
                                            <div className="alert alert-info m-0">
                                                <strong>Info!</strong> No courses available
                                            </div>

                                            :
                                            <div className={'bg-light shadow'}>

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
                                                                                {course.dateStart.substr(0, 10) + " until " + course.dateEnd.substr(0, 10)}
                                                                            </td>
                                                                            <td>{course.time}</td>
                                                                            <td>
                                                                                {course.room}
                                                                            </td>
                                                                            {this.props.user.role != 'guest' &&
                                                                            <td><Link to={"/courses/" + course._id}>
                                                                                <button type={'button'}
                                                                                        className="btn btn-light border rounded-circle text-center">
                                                                                    <i className="fas fa-id-card"></i>

                                                                                </button>
                                                                            </Link></td>
                                                                            }
                                                                            {this.props.user.role != 'guest' && this.props.user.role != 'student' &&
                                                                            <td>

                                                                                <form
                                                                                    onSubmit={this.deleteCourse(course._id)}>
                                                                                    <button type={'submit'}
                                                                                            className="btn btn-light border rounded-circle text-center">
                                                                                        <i className="fas fa-user-times"></i>
                                                                                    </button>
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
                                    </div>)
                                }


                            </div>
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}

export default Courses;

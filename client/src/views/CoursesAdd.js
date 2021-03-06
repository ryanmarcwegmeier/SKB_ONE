import React, { Component } from 'react';
import Footer from '../components/Footer'
import Header from "../components/Header";
import CourseContent from '../components/coursedetails/CourseContent'
import Overview from '../components/coursedetails/Overview'
import Forum from '../components/coursedetails/Forum'
import FAQ from '../components/coursedetails/FAQ'
import Instructor from '../components/coursedetails/Instructors'
import {Redirect} from 'react-router-dom'
import '../coursedetails.css'
import axios from 'axios'

/**
 * represents Course Add view
 */
class CourseAdd extends Component {
    /**
     * constructor
     * @param props
     */
    constructor(props){
        super(props);
        this.state={
            isPrivate:false,
            header:'bg-dark text-light',
            level:'[level]',
            time:'',
            room:'',
            day:'',
            info:false,
            err:'',
            lang:'',
            redirect:false,
            kurs:{},


        };
        this.handleLang=this.handleLang.bind(this);
        this.handleHeader=this.handleHeader.bind(this);
        this.changeHeader=this.changeHeader.bind(this);
        this.insertCourse=this.insertCourse.bind(this);
        this.handleTime=this.handleTime.bind(this);
        this.handleWeekday=this.handleWeekday.bind(this);
        this.handleRoom=this.handleRoom.bind(this);
        this.handleInfo=this.handleInfo.bind(this);
        this.handlePrivate=this.handlePrivate.bind(this);
        axios.defaults.headers.common['apikey'] = this.props.user.apikey;

    }


    /**
     * set private state for courses (Checkbox)
     * @param event
     */
    handlePrivate(event){
        if (this.state.isPrivate==false){
            this.setState({isPrivate:true})
        }else{
            this.setState({isPrivate:false})
        }
    }

    /**
     * set language for preview
     * @param event
     */
    handleLang(event){
        this.setState({lang:this.lang.value})
    }

    /**
     * set state if user needs info for emailing users
     * @param event
     */
    handleInfo(event){
        if(this.state.info){
            this.setState({info:false})
        }else{
            this.setState({info:true})
        }
    }

    /**
     * set room for preview
     * @param event
     */
    handleRoom(event){
        if(this.room.value!='') {

            if (this.state.room == '') {
                this.setState({
                    room: this.room.value
                })
            } else {
                this.setState({
                    room: this.state.room + ';' + this.room.value
                })
            }
        }
        this.room.value=''
    }

    /**
     * set weekday for preview
     * @param event
     */
    handleWeekday(event){
        if(this.day.value!=''){
            if(this.state.day==''){
                this.setState({
                    day:this.day.value
                })
            }else{
                this.setState({
                    day:this.state.day+';'+this.day.value
                })
            }
        }
        this.day.value=''


    }

    /**
     * set time for preview
     * @param event
     */
    handleTime(event){
        if(this.time.value!='') {

            if (this.state.time == '') {
                this.setState({
                    time: this.time.value
                })
            } else {
                this.setState({
                    time: this.state.time + ';' + this.time.value
                })
            }
        }
        this.time.value=''


    }

    /**
     * set headerColor for preview
     * @param event
     */
    handleHeader(event){
        this.setState({
            header:event.target.value
        })
    }

    /**
     * set level for preview
     * @param event
     */
    changeHeader(){
        this.setState({previewHeader:this.level.value})
    }

    /**
     * add Course
     * @param event
     */
    insertCourse(event){

        event.preventDefault();

        if (true || this.registrationStart<=this.registrationEnd<=this.dateStart<=this.dateEnd){


            axios.post('/courses',{
                headerStyle:this.state.header,
                isPrivate: this.state.isPrivate,
                level: this.level.value,
                language: this.lang.value,
                day: this.state.day,
                dateStart: new Date(this.dateStart.value),
                dateEnd: new Date(this.dateEnd.value),
                time: this.state.time,
                room: this.state.room,
                capacity: this.capacity.value,
                description: this.description.value,
                students:this.students.value,
                registrationStart:this.registrationStart.value,
                registrationEnd:this.registrationEnd.value,
            })
                .then((res)=>{
                    this.setState({redirect:true})
                }).catch((error)=>{
                this.setState({err:error})
            })
        }else{
            this.setState({err:'Register-Dates have to be before Date-Start and Date-end'})
        }
    };





    /**
     * renders Course Add view
     * left Options and data
     * right preview
     */
    render () {
        return (
            (this.state.redirect)?
                <Redirect to={'/courses'}/>
                :
                <div className="App">
                    <div className={"content"}>
                        <Header text={'Add Course'}/>
                        <main className={'container-fluid pb-3'}>
                            {this.state.err!='' &&
                            <div className="alert alert-danger">
                                <strong>Error!</strong> Error occure
                            </div>
                            }
                            <div className={'row'}>

                                {/*Options*/}
                                <div className={'col-md-4 border rounded shadow bg-light pl-4'}>
                                    <div className={'row'}>
                                        <form onSubmit={this.insertCourse}>
                                            <div className={'row'}>
                                                <div className={'col-md-6 bg-light'}>

                                                    <div className="form-group">
                                                        <label>Header Style</label><br/>
                                                        <div className={'mr-2'}>
                                                            <input type={'radio'} name={'header'} checked={this.state.header == 'bg-dark text-light'} value={'bg-dark text-light'} onChange={this.handleHeader}/>
                                                            <label>Dark</label>
                                                        </div>
                                                        <div className={'mr-2'}>
                                                            <input type={'radio'} name={'header'} checked={this.state.header == 'bg-light text-dark'} value={'bg-light text-dark'} onChange={this.handleHeader}/>
                                                            <label>Light</label>
                                                        </div>
                                                        <div className={'mr-2'}>
                                                            <input type={'radio'} name={'header'}  checked={this.state.header == 'bg-success text-light'} value={'bg-success text-light'} onChange={this.handleHeader}/>
                                                            <label>Green</label>
                                                        </div>
                                                        <div className={'mr-2'}>
                                                            <input type={'radio'} name={'header'}  checked={this.state.header == 'bg-danger text-light'} value={'bg-danger text-light'} onChange={this.handleHeader}/>
                                                            <label>Red</label>
                                                        </div>
                                                        <div className={'mr-2'}>
                                                            <input type={'radio'} name={'header'} checked={this.state.header == 'bg-primary text-light'} value={'bg-primary text-light'} onChange={this.handleHeader}/>
                                                            <label>Blue</label>
                                                        </div>
                                                        <div className={'mr-2'}>
                                                            <input type={'radio'} name={'header'} checked={this.state.header == 'bg-warning text-dark'} value={'bg-warning text-dark'} onChange={this.handleHeader}/>
                                                            <label>Yellow</label>
                                                        </div>

                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="level">Level</label>
                                                        <input required={'true'} ref={(ref) => {this.level = ref}} type="text" className="form-control" id="level"
                                                               placeholder="Level" onChange={this.changeHeader}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="language">Level</label>
                                                        <input required={'true'} ref={(ref) => {this.lang = ref}} type="text" className="form-control" id="language"
                                                               placeholder="Language" onChange={this.handleLang}/>
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="day">Weekday</label>
                                                        <input type={'button'} className={'ml-2 btn btn-outline-dark'} onClick={this.handleWeekday} value={'+'}/>
                                                        <input type={'button'} className={'ml-2 btn btn-outline-dark'} onClick={function () {
                                                            this.setState({day:''})
                                                        }.bind(this)} value={'x'}/>

                                                        <select ref={(ref) => {this.day = ref}} className="form-control" id="day">
                                                            <option value="Monday">Monday</option>
                                                            <option value="Tuesday">Tuesday</option>
                                                            <option value="Wednesday">Wednesday</option>
                                                            <option value="Thurstday">Thurstday</option>
                                                            <option value="Friday">Friday</option>
                                                        </select>

                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="dateStart">Date-Start</label>
                                                        <input  ref={(ref) => {this.dateStart = ref}} type="text" className="form-control datetimepicker-input"
                                                               id="dateStart" data-toggle="datetimepicker"
                                                               data-target="#dateStart"/>

                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="dateEnd">Date-End</label>
                                                        <input  ref={(ref) => {this.dateEnd = ref}} type="text" className="form-control datetimepicker-input"
                                                                id="dateEnd" data-toggle="datetimepicker"
                                                                data-target="#dateEnd"/>
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="registrationStart">Registration-Start</label>
                                                        <input  ref={(ref) => {this.registrationStart = ref}} type="text" className="form-control datetimepicker-input"
                                                                id="registrationStart" data-toggle="datetimepicker"
                                                                data-target="#registrationStart"/>
                                                    </div>


                                                    <div className="form-group">
                                                        <label htmlFor="registrationEnd">Registration-End</label>
                                                        <input  ref={(ref) => {this.registrationEnd = ref}} type="text" className="form-control datetimepicker-input"
                                                                id="registrationEnd" data-toggle="datetimepicker"
                                                                data-target="#registrationEnd"/>
                                                    </div>

                                                </div>
                                                <div className={'col-md-6 bg-light'}>


                                                    <div className="form-group">
                                                        <label htmlFor="time">Time</label>
                                                        <input type={'button'} className={'ml-2 btn btn-outline-dark'} onClick={this.handleTime}value={'+'}/>
                                                        <input type={'button'} className={'ml-2 btn btn-outline-dark'} onClick={function () {
                                                            this.setState({time:''})
                                                        }.bind(this)} value={'x'}/>
                                                        <input  ref={(ref) => {this.time = ref}} type="text" className="form-control" id="time"
                                                               placeholder="10:00 - 12:00"/>
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="room">Room</label>
                                                        <input type={'button'} className={'ml-2 btn btn-outline-dark'} onClick={this.handleRoom} value={'+'}/>
                                                        <input type={'button'} className={'ml-2 btn btn-outline-dark'} onClick={function () {
                                                            this.setState({room:''})
                                                        }.bind(this)} value={'x'}/>
                                                        <input ref={(ref) => {this.room = ref}}  type="text" className="form-control" id="room"
                                                               placeholder="room"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label required={'true'} htmlFor="capacity">Capacity</label>
                                                        <input ref={(ref) => {this.capacity = ref}} type="number" min={0} className="form-control" id="capacity"
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="desc">Description</label>
                                                        <textarea ref={(ref) => {this.description = ref}} rows={'5'} className={'form-control'}/>
                                                    </div>

                                                    <div className="form-check mb-4">
                                                        <input onChange={this.handlePrivate} type="checkbox" checked={this.state.isPrivate == true} className="form-check-input" id="checkbox"
                                                        />
                                                        <label className="form-check-label" htmlFor="checkbox">Private</label>
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="students">Students-Mail</label>
                                                        <i className={"ml-2 fas fa-info btn btn-outline-info rounded-circle"} onClick={this.handleInfo}>
                                                        </i>
                                                        {this.state.info &&
                                                        <div className="alert alert-info">
                                                            <strong>Info!</strong> Divide emails with simicolons <strong>;</strong>
                                                        </div>
                                                        }

                                                        <textarea ref={(ref) => {this.students = ref}} className="form-control" id="students"
                                                                  placeholder="studentA@Test.test;studentB@Test.test"/>
                                                    </div>

                                                </div>
                                                <div className={'col-sm-12 pr-0 bg-light'}>
                                                    <button type="submit" className="btn btn-primary">Send</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>



                                {/*Preview of side*/}
                                <div className={'col-md-8'} style={{height:'100vh', overflow:'auto'}}>
                                    <div className={'border p-0 border rounded bg-light ml-3 shadow'}>
                                        <header className={this.state.header} style={{height:'20%', background:this.state.headerColor}}>
                                            <div className="container">
                                                <h3 className={'p-4'}>{this.state.previewHeader} - {this.state.lang}</h3>
                                            </div>
                                        </header>
                                        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                                            <div className="collapse navbar-collapse" id="course-navigation">
                                                <ul className="navbar-nav mr-auto">
                                                    <li className="nav-item">
                                                        <span className="nav-link" href="#course-overview">Overview</span>
                                                    </li>
                                                    <li className="nav-item">
                                                        <span className="nav-link" href="#course-content">Course Content</span>
                                                    </li>
                                                    <li className="nav-item">
                                                        <span className="nav-link" href="#course-forum">Announcements</span>
                                                    </li>
                                                    <li className="nav-item">
                                                        <span className="nav-link" href="#course-faqs">FAQs</span>
                                                    </li>
                                                    <li className="nav-item">
                                                        <span className="nav-link" href="#course-instructors">Instructors</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </nav>

                                        <div className={'main pl-3'}>
                                            <div>Weekday:{this.state.day}</div>
                                            <div>Time:{this.state.time}</div>
                                            <div>Room:{this.state.room}</div>


                                            <Overview/>
                                            <CourseContent/>
                                            <Forum/>
                                            <FAQ/>
                                            <Instructor/>

                                        </div>
                                    </div>

                                </div>
                            </div>

                        </main>
                    </div>

                </div>
        )
    }


}

export default CourseAdd;
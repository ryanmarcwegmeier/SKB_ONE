import React, { Component } from 'react';
import Footer from '../components/Footer'
import Header from "../components/Header";

class CourseAdd extends Component {
    constructor(props){
        super(props);
        this.state={
            isPrivate:false
        }
        this.insertCourse=this.insertCourse.bind(this);
    }

    insertCourse(event){
        event.preventDefault();

        // let students=[]
        // let teachers=[]
        // let listTeacher=this.teachers.value.split(';')
        // listTeacher.forEach(e=>teachers.push({name:e}))
        //
        // let listStudent=this.teachers.value.split(';')
        // listStudent.forEach(e=>students.push({email:e}))


        fetch('/courses', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "isPrivate": this.isPrivate.value,
                "level": this.level.value,
                "language": this.language.value,
                "day": this.day.value,
                "dateStart": new Date(this.dateStart.value),
                "dateEnd": new Date(this.dateEnd.value),
                "time": this.time.value,
                "room": this.room.value,
                "capacity": this.capacity.value,
                "description": this.description.value,
                "teachers":this.teachers.value,
                "students":this.students.value,



            })
        }).then((res) => {
            if (res.ok){
                window.location.reload()
            } else {
                alert('Failed')
            }
        })
    };





    render () {
        return (
            <div className="App">
                <div className={"content"}>
                    <Header text={'Add Course'}/>
                    <main className={'bg-light container-fluid'}>
                        <div className={'row'}>
                            <div className={'col-md-10 ml-auto mr-auto border rounded'}>
                                <form onSubmit={this.insertCourse}>
                                    <div className={'row'}>
                                        <div className={'col-md-6'}>
                                            <div className="form-group">
                                                <label htmlFor="level">Level</label>
                                                <input ref={(ref) => {this.level = ref}} type="text" className="form-control" id="level"
                                                       placeholder="Level"/>

                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="language">Language</label>
                                                <input ref={(ref) => {this.language = ref}} type="text" className="form-control" id="language"
                                                       placeholder="Language"/>

                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="teachers">Teachers</label>
                                                <input ref={(ref) => {this.teachers = ref}} type="text" className="form-control" id="teachers"
                                                       placeholder="TeacherA;TeacherB"/>
                                            </div>


                                            <div className="form-group">
                                                <label htmlFor="day">Weekday</label>
                                                <input ref={(ref) => {this.day = ref}} type="text" className="form-control" id="day"
                                                       placeholder="Weekday"/>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="dateStart">Date-Start</label>
                                                <input ref={(ref) => {this.dateStart = ref}}type="date" className="form-control" id="dateStart"
                                                       placeholder="YYYY-MM-DD"/>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="dateEnd">Date-End</label>
                                                <input ref={(ref) => {this.dateEnd = ref}} type="date" className="form-control" id="dateEnd"
                                                       placeholder="YYYY-MM-DD"/>
                                            </div>
                                        </div>
                                        <div className={'col-md-6'}>


                                            <div className="form-group">
                                                <label htmlFor="time">Time</label>
                                                <input ref={(ref) => {this.time = ref}} type="text" className="form-control" id="time"
                                                       placeholder="10:00 - 12:00"/>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="room">Room</label>
                                                <input ref={(ref) => {this.room = ref}} type="text" className="form-control" id="room"
                                                       placeholder="room"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="capacity">Capacity</label>
                                                <input ref={(ref) => {this.capacity = ref}} type="number" min={0} className="form-control" id="capacity"
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="desc">Description</label>
                                                <textarea ref={(ref) => {this.description = ref}} rows={'5'} className={'form-control'}/>
                                            </div>

                                            <div className="form-check mb-4">
                                                <input ref={(ref) => {this.isPrivate = ref}} onClick={this.startPrivate} type="checkbox" className="form-check-input" id="checkbox"
                                                />
                                                    <label className="form-check-label" htmlFor="checkbox">Private</label>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="students">Students-Mail</label>
                                                <textarea ref={(ref) => {this.students = ref}} className="form-control" id="students"
                                                          placeholder="studentA@Test.test;studentB@Test.test"/>
                                            </div>

                                        </div>








                                    <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>

                        </div>

                    </main>

                    <Footer/>
                </div>

            </div>
        )
    }


}

export default CourseAdd;
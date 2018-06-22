import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';
import NotAllow from "./NotAllow";
import axios from "axios/index";
import {Redirect} from 'react-router-dom'

/**
 * represents CourseEdit view
 */
class CourseEdit extends Component {

    constructor(props){
        super(props)
        this.state={
            isFetching:true,
            course:{},
            failed:false,
            isPrivate:'',
            header:'',
            redirect:false
        }
        this.handlePrivate=this.handlePrivate.bind(this)
        this.sendEdit=this.sendEdit.bind(this)
        this.handleHeader=this.handleHeader.bind(this)
        axios.defaults.headers.common['apikey'] = this.props.user.apikey;

    }

    sendEdit(event){
        event.preventDefault()
        let level=(this.level.value=='')?this.state.course.level:this.level.value
        let language=(this.language.value=='')?this.state.course.language:this.language.value
        let day=(this.day.value=='')?this.state.course.day:this.day.value
        let dateStart=(this.dateStart.value=='')?this.state.course.dateStart:this.dateStart.value
        let dateEnd=(this.dateEnd.value=='')?this.state.course.dateEnd:this.dateEnd.value
        let time=(this.time.value=='')?this.state.course.time:this.time.value
        let room=(this.room.value=='')?this.state.course.room:this.room.value
        let capacity=(this.capacity.value=='')?this.state.course.capacity:this.capacity.value
        let description=(this.description.value=='')?this.state.course.description:this.description.value
        let registrationStart=(this.registrationStart.value=='')?this.state.course.registrationStart:this.registrationStart.value
        let registrationEnd=(this.registrationEnd.value=='')?this.state.course.registrationEnd:this.registrationEnd.value

        axios.put('/courses/' + this.props.match.params.course, {
            isPrivate: this.state.isPrivate,
            level: level,
            language: language,
            day: day,
            dateStart: (dateStart),
            dateEnd: (dateEnd),
            time: time,
            room: room,
            capacity: capacity,
            description: description,
            registrationStart:(registrationStart),
            registrationEnd:(registrationEnd),
            headerStyle:this.state.header
        })
            .then(()=>this.setState({redirect:true}))
            .catch((err)=>alert(err))
    }

    handlePrivate(event){
        if (this.state.isPrivate==false){
            this.setState({isPrivate:true})
        }else{
            this.setState({isPrivate:false})
        }
    }

    changeTyp(id){
        document.getElementById(id).type='date'
    }
    changeVal(id, placeholder, value){
        document.getElementById(id).type='text'
        if(document.getElementById(id).value==''){
            document.getElementById(id).placeholder=placeholder
        }
    }

    getCourse(){
        axios.get('/courses/'+this.props.match.params.course)
            .then((res)=>{
                this.setState({course:res.data})
                this.setState({isPrivate:this.state.course.isPrivate})
                this.setState({header:this.state.course.headerStyle})

                }
            )
            .catch((error)=>this.setState({failed:true}))
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

    componentDidMount(){
        this.getCourse()
    }


    /**
     * rendering CourseEdit
     * @return {*}
     */
    render() {
        return (
            <div className="App">
                {(this.state.redirect) ?
                    <Redirect to={'/courses/' + this.props.match.params.course}/>
                    :
                    <div className={"content"}>
                        <Header text={<span><i className="fas fa-edit"></i>Course-config</span>}/>
                        <main className={'bg-light container-fluid'}>
                            <div className={'row'}>

                                <div className={'col-sm-11 ml-auto mr-auto'}>

                                    {(this.state.failed != true && (this.props.user.role == 'admin' || this.props.user.role == 'teacher')) ?
                                        <div>
                                            <div className="bg-white rounded shadow mb-3">
                                                <h3> Course: {this.state.course.level + '-' + this.state.course.language}</h3>

                                                <form className={'container-fluid'} onSubmit={this.sendEdit}>
                                                    <div className={'row'}>
                                                        <div className={'col-md-6'}>
                                                            <div className="form-group">
                                                                <label htmlFor={'level'}>Level</label>
                                                                <input ref={(ref) => {
                                                                    this.level = ref
                                                                }} id={'level'} className={'form-control'} type={'text'}
                                                                       placeholder={this.state.course.level}/>
                                                            </div>
                                                        </div>
                                                        <div className={'col-md-6'}>
                                                            <div className="form-group">
                                                                <label htmlFor={'language'}>Language</label>
                                                                <input ref={(ref) => {
                                                                    this.language = ref
                                                                }} id={'language'} className={'form-control'}
                                                                       type={'text'}
                                                                       placeholder={this.state.course.language}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={'row'}>
                                                        <div className={'col-md-6'}>
                                                            <div className="form-group">
                                                                <label
                                                                    htmlFor={'registrationStart'}>Registration-Start</label>
                                                                <input ref={(ref) => {
                                                                    this.registrationStart = ref
                                                                }} id={'registrationStart'} className={'form-control'}
                                                                       type={'text'}
                                                                       onBlur={this.changeVal.bind(this, 'registrationStart', this.state.course.registrationStart)}
                                                                       onFocus={this.changeTyp.bind(this, 'registrationStart')}
                                                                       placeholder={this.state.course.registrationStart}/>
                                                            </div>
                                                        </div>
                                                        <div className={'col-md-6'}>
                                                            <div className="form-group">
                                                                <label
                                                                    htmlFor={'registrationEnd'}>Registration-End</label>
                                                                <input ref={(ref) => {
                                                                    this.registrationEnd = ref
                                                                }} id={'registrationEnd'} className={'form-control'}
                                                                       type={'text'}
                                                                       onBlur={this.changeVal.bind(this, 'registrationEnd', this.state.course.registrationEnd)}
                                                                       onFocus={this.changeTyp.bind(this, 'registrationEnd')}
                                                                       placeholder={this.state.course.registrationEnd}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={'row'}>
                                                        <div className={'col-md-6'}>
                                                            <div className="form-group">
                                                                <label htmlFor={'dateStart'}>Date-Start</label>
                                                                <input ref={(ref) => {
                                                                    this.dateStart = ref
                                                                }} id={'dateStart'} className={'form-control'}
                                                                       type={'text'}
                                                                       onBlur={this.changeVal.bind(this, 'dateStart', this.state.course.dateStart)}
                                                                       onFocus={this.changeTyp.bind(this, 'registrationEnd')}
                                                                       placeholder={this.state.course.dateStart}/>
                                                            </div>
                                                        </div>
                                                        <div className={'col-md-6'}>
                                                            <div className="form-group">
                                                                <label htmlFor={'dateEnd'}>Date-End</label>
                                                                <input ref={(ref) => {
                                                                    this.dateEnd = ref
                                                                }} id={'dateEnd'} className={'form-control'}
                                                                       type={'text'}
                                                                       onBlur={this.changeVal.bind(this, 'dateEnd', this.state.course.dateEnd)}
                                                                       onFocus={this.changeTyp.bind(this, 'dateEnd')}
                                                                       placeholder={this.state.course.dateEnd}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={'row'}>
                                                        <div className={'col-md-6'}>
                                                            <div className="form-group">
                                                                <label htmlFor={'room'}>Room *</label>
                                                                <input ref={(ref) => {
                                                                    this.room = ref
                                                                }} id={'room'} className={'form-control'} type={'text'}
                                                                       placeholder={this.state.course.room}/>
                                                            </div>
                                                        </div>
                                                        <div className={'col-md-6'}>
                                                            <div className="form-group">
                                                                <label htmlFor={'time'}>Time *</label>
                                                                <input ref={(ref) => {
                                                                    this.time = ref
                                                                }} id={'time'} className={'form-control'} type={'text'}
                                                                       placeholder={this.state.course.time}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={'row'}>
                                                        <div className={'col-md-6'}>
                                                            <div className="form-group">
                                                                <label htmlFor={'time'}>Day *</label>
                                                                <input ref={(ref) => {
                                                                    this.day = ref
                                                                }} id={'day'} className={'form-control'} type={'text'}
                                                                       placeholder={this.state.course.day}/>
                                                            </div>
                                                        </div>
                                                        <div className={'col-md-6'}>
                                                            <div className="form-group">
                                                                <label htmlFor={'cap'}>Capacity</label>
                                                                <input ref={(ref) => {
                                                                    this.capacity = ref
                                                                }} id={'capacity'} className={'form-control'}
                                                                       type={'number'}
                                                                       placeholder={this.state.course.capacity}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={'row'}>
                                                        <div className={'col-md-6'}>
                                                            <div className="form-check mb-4">
                                                                <input onChange={this.handlePrivate} type="checkbox"
                                                                       checked={this.state.isPrivate == true}
                                                                       className="form-check-input" id="checkbox"
                                                                />
                                                                <label className="form-check-label"
                                                                       htmlFor="checkbox">Private</label>
                                                            </div>
                                                            <div className={'form-group'}>
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

                                                        </div>
                                                        <div className={'col-md-6'}>
                                                            <div className="form-group">
                                                                <label htmlFor="desc">Description</label>
                                                                <textarea ref={(ref) => {
                                                                    this.description = ref
                                                                }} rows={'5'} className={'form-control'}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={'row'}>
                                                        <button type="submit"
                                                                className="btn btn-outline-success p-3 mb-3"
                                                                style={{margin: '0 auto', width: '50%'}}>Save
                                                        </button>
                                                        <div className={'p-3'}>
                                                            * Divide multiple records with simicolon (;)
                                                        </div>
                                                    </div>
                                                </form>

                                            </div>
                                        </div>
                                        :
                                        <div>
                                            {(!this.state.failed) ?
                                                <NotAllow/>
                                                :
                                                <div className="alert alert-danger">
                                                    <strong>Failure: </strong>Course doesn't exists!
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>

                            </div>

                        </main>
                        <Footer/>

                    </div>
                }

            </div>


        );
    }
}

export default CourseEdit;
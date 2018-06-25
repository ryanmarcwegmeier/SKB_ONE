import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'

class Intro extends Component {
    constructor(props){
        super(props)
        this.leaveCourse=this.leaveCourse.bind(this)
        this.state={
            redirect:false,
        }
    }

    leaveCourse(){
        axios.delete('/usercoursemapping/'+this.props.user._id+"/"+this.props.kurs._id)
            .then((res)=>{
                this.setState({redirect:true})
            }).catch((err)=>{
                alert(err)
        })
    }

    // exitEdit(){
    //     sessionStorage.clear()
    //     window.location.reload()
    // }
    //
    // activateEdit(){
    //     sessionStorage.setItem("activateEdit",'true')
    //     window.location.reload()
    // }

    render() {
        if(this.state.redirect){
            return <Redirect to={"/index"}/>
        }
        return (
            <div id="course-intro" className={"jumbotron jumbotron-fluid "+this.props.kurs.headerStyle}>
                <div className="container-fluid">
                    <h1>{(!this.props.kurs)?null:(this.props.kurs.level+'-'+this.props.kurs.language)}</h1>
                    <a href="#course-content" className="btn btn-secondary">
                        See current feed</a>

                    <Link to={'/courses/create/form/'+this.props.kurs._id}>
                    <button type="button" type={'button'} className={'btn btn-secondary float-md-right'} data-toggle="modal" data-target="#exampleModal">
                        <i className="fas fa-edit"></i>
                    </button>
                    </Link>
                    <br/>
                    {this.props.user.role!='admin' &&
                    <button type="button" type={'button'} className={' mt-3 btn btn-secondary float-md-right'} data-toggle="modal" data-target="#exampleModal" onClick={this.leaveCourse}>
                        <i className="fas fa-sign-out-alt"></i>
                    </button>
                    }


                </div>
            </div>
        );

    } //

}

export default Intro;

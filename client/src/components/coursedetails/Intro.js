import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Intro extends Component {
    constructor(props){
        super()
        this.updateCourse=this.updateCourse.bind(this)
    }

    updateCourse(event){
        event.preventDefault();

        let level=""
        let language=""
        let teachers=[]

        alert(this.level)

        if(this.level.value.length==0){level=this.props.kurs.level} else {level=this.level.value}
        if(this.language.value.length==0){language=this.props.kurs.language} else {language = this.language.value}
        if(this.teachers.value=="") {teachers=this.props.kurs.level} else {
            let list=this.teachers.value.split(';')
            list.forEach(e=>teachers.push({name:e}))
        }


        fetch('/courses/'+this.props.kurs._id, {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "level":level,
                "language":language,
                "teachers":teachers,
            })
        }).then((res) => {
            if (res.ok){
                alert("success");
                sessionStorage.clear()
                window.location.reload()
            } else {
                throw new Error ('Something went wrong with your fetch');
            }
        }

        )

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
                </div>
            </div>
        );

    } //

}

export default Intro;

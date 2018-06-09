import React, {Component} from 'react';

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
            <div id="course-intro" class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1>{(!this.props.kurs)?null:(this.props.kurs.level+'-'+this.props.kurs.language)}</h1>
                    <a href="#course-content" class="btn btn-danger">
                        See current feed</a>

                    <button type="button" type={'button'} className={'btn btn-outline-danger float-md-right'} data-toggle="modal" data-target="#exampleModal"><i className="fas fa-user-edit"></i></button>


                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true"></span>
                                    </button>
                                </div>
                                <form onSubmit={this.updateCourse}>
                                <div className="modal-body">
                                    <label htmlFor="courseLevel"><span className={'text-muted'}><b>Level</b></span></label>
                                    <input ref={(ref) => {this.level = ref}} id={"courseLevel"} type={'text'} className={'form-control'} placeholder={this.props.kurs.level}/>
                                    <label htmlFor="language"><span className={'text-muted'}><b>Language</b></span></label>
                                    <input ref={(ref) => {this.language = ref}} id={"language"} type={'text'} className={'form-control'} placeholder={this.props.kurs.language}/>
                                    <label htmlFor="teacher"><span className={'text-muted'}><b>Teacher</b></span></label>
                                    <input ref={(ref) => {this.teachers = ref}} id={"teacher"} type={'text'} className={'form-control'} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close
                                    </button>
                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );

    } //

}

export default Intro;

import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';
import NotAllow from './NotAllow';
import NoUser from './NoUser';

class SingleUser extends Component {


    constructor(props){
        super(props);
        this.user_name=this.props.match.params.username
        this.state={
            user:{}

        }
        this.sendEdit=this.sendEdit.bind(this);
    }

    exitEdit(){
        sessionStorage.clear()
        window.location.reload()
    }

    activateEdit(){
        sessionStorage.setItem("activateEdit",'true')
        window.location.reload()
    }


    sendEdit(event){
        let psw="";
        let fname="";
        let lname="";
        let email="";
        let phone="";

        let role="";
        if(this.props.loggedUser.role=='admin') {
            role=this.role.value
        }else{
            role=this.state.user.role
        }


        if(this.password_old.value!=this.state.user.password && (this.password_old.value!='')){ return (alert("Fehler bei den Passwörtern")) }
        if(this.firstname.value==''){fname=this.state.user.firstname}else {fname=this.firstname.value}
        if(this.lastname.value==''){lname=this.state.user.lastname}else {lname=this.lastname.value}
        if(this.email.value==''){email=this.state.user.email}else {email=this.email.value}
        if(this.tel.value==''){phone=this.state.user.tel}else {phone=this.tel.value}
        if(this.password_new.value==''){psw=this.state.user.password}
        else {psw=this.password_new.value}


        event.preventDefault();
        fetch('/users/'+this.user_name, {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "firstname":fname,
                "lastname":lname,
                "email":email,
                "tel":phone,
                "password":psw,
                "role":role
            })
        }).then((res) => {
            if (res.ok){
                alert("success");
                sessionStorage.clear()
                window.location.reload()
            } else {
                throw new Error ('Something went wrong with your fetch');
            }
        })}



    componentWillMount() {
        fetch('/users/'+this.user_name)
            .then(res => res.json())
            .then(json => this.setState({user:json}))
            .catch((error)=>this.setState({failed:true}))

    }







    render() {
        return (

            <div className="App">
                <div className={"content"}>
                    <Header text={<span><i className="fas fa-user-cog"></i> User-config</span>}/>
                    <main className={'bg-light container-fluid'}>
                        <div className={'row'}>

                            <div className={'col-sm-11 ml-auto mr-auto'}>

                                {(this.state.failed!=true &&(this.props.loggedUser.role=='admin'||this.props.loggedUser.username==this.user_name))?
                                    <div>
                                        {(sessionStorage.getItem('activateEdit')==null)?
                                            <button onClick={this.activateEdit} type={'button'} className={'btn btn-outline-danger float-md-right'}><i className="fas fa-user-edit"></i></button>
                                            :
                                            <button onClick={this.exitEdit} type={'button'} className={'btn btn-outline-danger float-md-right'}>
                                                <i className="fas fa-times"></i>
                                            </button>

                                        }
                                        <h3> User: {this.user_name}</h3>
                                        {((this.props.loggedUser!=null || this.props.loggedUser!=undefined) && (this.props.loggedUser.id==this.state.user.id||this.props.loggedUser.role=='admin'))?

                                            <div className="table-responsive">
                                                <form className={'container-fluid'} onSubmit={this.sendEdit}>
                                                    <table className="table table-bordered">

                                                        <tbody>

                                                        <tr>
                                                            <th scope="row">Username</th>
                                                            <td>{this.state.user.username}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Firstname</th>
                                                            {
                                                                (sessionStorage.getItem('activateEdit') == 'true')?
                                                                    <td>
                                                                        <input ref={(ref) => {this.firstname = ref}} type={'text'} className="form-control " placeholder={this.state.user.firstname}></input>
                                                                    </td>
                                                                    :
                                                                    <td>{this.state.user.firstname}</td>
                                                            }
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Lastname</th>
                                                            {
                                                                (sessionStorage.getItem('activateEdit') == 'true')?
                                                                    <td>
                                                                        <input ref={(ref) => {this.lastname = ref}} type={'text'} className="form-control " placeholder={this.state.user.lastname}></input>
                                                                    </td>
                                                                    :
                                                                    <td>{this.state.user.lastname}</td>
                                                            }
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">E-Mail</th>
                                                            {
                                                                (sessionStorage.getItem('activateEdit') == 'true')?
                                                                    <td>
                                                                        <input ref={(ref) => {this.email = ref}} type={'text'} className="form-control " placeholder={this.state.user.email}></input>
                                                                    </td>
                                                                    :
                                                                    <td>{this.state.user.email}</td>
                                                            }
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Phone</th>
                                                            {
                                                                (sessionStorage.getItem('activateEdit') == 'true')?
                                                                    <td>
                                                                        <input ref={(ref) => {this.tel = ref}} type={'text'} className="form-control " placeholder={this.state.user.tel}></input>
                                                                    </td>
                                                                    :
                                                                    <td>{this.state.user.tel}</td>
                                                            }
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Role</th>
                                                            {
                                                                (sessionStorage.getItem('activateEdit') != 'true') ?
                                                                    <td>{this.state.user.role}</td>

                                                                    :
                                                                    (this.props.loggedUser.role!= 'admin')?
                                                                        <td>{this.state.user.role}</td>
                                                                        :
                                                                        <td>
                                                                            <select ref={(ref) => {this.role = ref}} className="form-control" id="exampleFormControlSelect1">
                                                                                <option>admin</option>
                                                                                <option>teacher</option>
                                                                                <option>student</option>
                                                                            </select>
                                                                        </td>}
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Altes Password</th>
                                                            <td>
                                                                <input ref={(ref) => {
                                                                    this.password_old = ref
                                                                }} type={'password'} className={'form-control'}/>
                                                            </td>
                                                        </tr>

                                                        {sessionStorage.getItem('activateEdit') == 'true' &&
                                                        <tr>
                                                            <th scope="row">Neues Password</th>
                                                            <td>
                                                                <input ref={(ref) => {
                                                                    this.password_new = ref
                                                                }} type={'password'} className={'form-control'}/>
                                                            </td>
                                                        </tr>
                                                        }
                                                        {sessionStorage.getItem('activateEdit') == 'true' &&
                                                        <tr>
                                                            <tr><td><input type={'submit'} className={'btn mr-2'}/><input type={'reset'} className={'btn mr-2'}/></td></tr>

                                                        </tr>
                                                        }

                                                        </tbody>

                                                    </table>
                                                </form>

                                            </div>





                                            :
                                            <span>error</span>

                                        }
                                    </div>
                                    :
                                    <div>
                                        {(!this.state.failed) ?
                                            <NotAllow/>
                                            :
                                            <NoUser/>
                                        }
                                    </div>
                                }
                            </div>

                        </div>

                    </main>

                    <Footer/>
                </div>

            </div>

        );
    }
}

export default SingleUser;
import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

class SingleUser extends Component {
    users=[];


    constructor(props){
        super(props);
        this.user_id=(props.match.params.id)
        this.state={
            isLoading:true,
            users:[]
        }
        this.sendEdit=this.sendEdit.bind(this);
    }

    activateEdit(){
        sessionStorage.setItem("activateEdit",'true')

        window.location.reload()
    }


    sendEdit(event){

        let uname="";
        let psw="";
        let fname="";
        let lname="";
        let email="";
        let phone="";

        let role="";
        if(JSON.parse(sessionStorage.getItem('session')).user.role=='admin') {
            role=this.role.value
        }else{
            role=this.state.users[0].role
        }


        if(this.password_old.value!=this.state.users[0].password && (this.password_old.value!='')){ return (alert("Fehler bei den Passwörtern")) }
        if(this.username.value==''){uname=this.state.users[0].username}else {uname=this.username.value}
        if(this.firstname.value==''){fname=this.state.users[0].firstname}else {fname=this.firstname.value}
        if(this.lastname.value==''){lname=this.state.users[0].lastname}else {lname=this.lastname.value}
        if(this.email.value==''){email=this.state.users[0].email}else {email=this.email.value}
        if(this.tel.value==''){phone=this.state.users[0].tel}else {phone=this.tel.value}
        if(this.password_new.value==''){psw=this.state.users[0].password}
        else {psw=this.password_new.value}

        event.preventDefault();

        fetch('/users/'+this.user_id, {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "username_old":this.state.users[0].username,
                "username":uname,
                "firstname":fname,
                "lastname":lname,
                "email":email,
                "tel":phone,
                "password":psw,
                "role":role


            })
        }).then((res) => {
            if (res.ok){
                return res.json();
            } else {
            throw new Error ('Something went wrong with your fetch');
        }
        }).then((json) => {
            console.log(json)
            sessionStorage.setItem("activateEdit", 'false');
            window.location.reload()
        })}


    componentDidMount() {
            fetch('/users/'+this.user_id)
                .then(res => res.json())
                .then(users => this.setState({ users }));

    }






    render() {
        console.log(this.state.users)

        return (

            <div className="App">


                <Navbar/>
                <div className={"content"}>
                    <Header />
                    <main className={'bg-light container-fluid'}>
                        <div className={'row'}>

                            <div className={'col-sm-11 ml-auto mr-auto'}>

                                <h2>Edit <i className="fas fa-user"></i></h2>
                                <button onClick={this.activateEdit} type={'button'} className={'btn float-md-right'}><i className="fas fa-user-edit"></i></button>
                                <h3> User: {this.user_id}</h3>
                                {(JSON.parse(sessionStorage.getItem('session')).user._id == this.user_id || JSON.parse(sessionStorage.getItem('session')).user.role == 'admin') &&

                                <form className={'container-fluid'} onSubmit={this.sendEdit}>

                                    <div className="table-responsive">
                                        <table className="table table-bordered">
                                            <tbody>
                                            {this.state.users.map(user =>

                                                <div>
                                                    <tr>
                                                        <th scope="row">Username</th>
                                                        {sessionStorage.getItem('activateEdit') == 'true' &&
                                                        <td><input ref={(ref) => {
                                                            this.username = ref
                                                        }} type={'text'} class="form-control "
                                                                   placeholder={user.username}></input></td>}
                                                        {sessionStorage.getItem('activateEdit') == 'false' &&
                                                        <td>{user.username}</td>}

                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Firstname</th>
                                                        {sessionStorage.getItem('activateEdit') == 'true' &&
                                                        <td><input ref={(ref) => {
                                                            this.firstname = ref
                                                        }} type={'text'} class="form-control "
                                                                   placeholder={user.firstname}></input></td>}
                                                        {sessionStorage.getItem('activateEdit') == 'false' &&
                                                        <td>{user.firstname}</td>}
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Lastname</th>
                                                        {sessionStorage.getItem('activateEdit') == 'true' &&
                                                        <td><input ref={(ref) => {
                                                            this.lastname = ref
                                                        }} type={'text'} class="form-control "
                                                                   placeholder={user.lastname}></input></td>}

                                                        {sessionStorage.getItem('activateEdit') == 'false' &&
                                                        <td>{user.lastname}</td>}
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Email</th>
                                                        {sessionStorage.getItem('activateEdit') == 'true' &&
                                                        <td><input ref={(ref) => {
                                                            this.email = ref
                                                        }} type={'email'} class="form-control "
                                                                   placeholder={user.email}/></td>}

                                                        {sessionStorage.getItem('activateEdit') == 'false' &&
                                                        <td>{user.email}</td>}
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Phone</th>
                                                        {sessionStorage.getItem('activateEdit') == 'true' &&
                                                        <td><input ref={(ref) => {
                                                            this.tel = ref
                                                        }} type={'tel'} class="form-control " placeholder={user.tel}/>
                                                        </td>}
                                                        {sessionStorage.getItem('activateEdit') == 'false' &&
                                                        <td>{user.tel}</td>}
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Role</th>
                                                        {sessionStorage.getItem('activateEdit') == 'false' &&
                                                        <td>{user.role}</td>
                                                        }

                                                        {sessionStorage.getItem('activateEdit') == 'true' && JSON.parse(sessionStorage.getItem('session')).user.role != 'admin' &&
                                                        <td>{user.role}</td>
                                                        }

                                                        {sessionStorage.getItem('activateEdit') == 'true' && JSON.parse(sessionStorage.getItem('session')).user.role == 'admin' &&
                                                        <td>
                                                            <select ref={(ref) => {
                                                                this.role = ref
                                                            }} className="form-control" id="exampleFormControlSelect1">
                                                                <option>admin</option>
                                                                <option>teacher</option>
                                                                <option>student</option>
                                                            </select></td>}
                                                    </tr>

                                                    {sessionStorage.getItem('activateEdit') == 'true' &&
                                                    <tr>
                                                        <th scope="row">Altes Password</th>
                                                        <td>
                                                            <input ref={(ref) => {
                                                                this.password_old = ref
                                                            }} type={'password'} className={'form-control'}/>
                                                        </td>
                                                    </tr>
                                                    }
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

                                                        <input type={'submit'} className={'btn mr-2'}/>
                                                        <input type={'reset'} className={'btn '}/>

                                                    </tr>
                                                    }


                                                </div>
                                            )}

                                            </tbody>

                                        </table>
                                    </div>
                                </form>
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
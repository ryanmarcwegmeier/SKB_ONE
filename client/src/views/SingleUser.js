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
        sessionStorage.removeItem("activateEdit")
        if(this.password_old.value!=this.password_new.value){ return alert("Passwörter stimmen nicht überein") }
        if(this.username.value=='')this.username.value=this.state.users[0].username
        if(this.firstname.value=='')this.firstname.value=this.state.users[0].firstname
        if(this.lastname.value=='')this.lastname.value=this.state.users[0].lastname
        if(this.email.value=='')this.email.value=this.state.users[0].email
        if(this.tel.value=='')this.tel.value=this.state.users[0].tel
        if(this.password_new.value=='')this.password_new.value=this.state.users[0].password


        event.preventDefault();
        fetch('/users/updateUser', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "username":this.username.value,
                "firstname":this.firstname.value,
                "lastname":this.lastname.value,
                "email":this.email.value,
                "tel":this.tel.value,
                "password":this.password_new.value,
                "role":this.role.value,


            })
        }).then((res) => {
            if (res.ok){
                return res.json();
            } else {
                throw new Error ('Something went wrong with your fetch');
            }
        }).then((json) => window.location.reload())}


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
                                <h2>Edit</h2>
                                <button onClick={this.activateEdit} type={'button'} className={'btn float-md-right'}><i className="fas fa-user-edit"></i></button>
                                <h3> User: {this.user_id}</h3>

                                <form className={'container-fluid'} onSubmit={this.sendEdit}>

                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <tbody>
                                        {this.state.users.map(user =>

                                            <div>
                                            <tr>
                                                <th scope="row">Username</th>
                                                {sessionStorage.getItem('activateEdit')=='true' &&
                                                <td><input ref={(ref) => {this.username = ref}} type={'text'} class="form-control " placeholder={user.username} ></input></td>}
                                                {sessionStorage.getItem('activateEdit')=='false' &&<td>{user.username}</td>}

                                            </tr>
                                                <tr>
                                                    <th scope="row">Firstname</th>
                                                    {sessionStorage.getItem('activateEdit')=='true' &&
                                                    <td><input ref={(ref) => {this.firstname = ref}} type={'text'} class="form-control " placeholder={user.firstname}></input></td>}
                                                    {sessionStorage.getItem('activateEdit')=='false' &&<td>{user.firstname}</td>}
                                                </tr>
                                                <tr>
                                                    <th scope="row">Lastname</th>
                                                    {sessionStorage.getItem('activateEdit') == 'true' &&
                                                    <td><input ref={(ref) => {this.lastname = ref}} type={'text'} class="form-control " placeholder={user.lastname}></input></td>}

                                                    {sessionStorage.getItem('activateEdit') == 'false' &&
                                                    <td>{user.lastname}</td>}
                                                </tr>
                                                <tr>
                                                    <th scope="row">Email</th>
                                                    {sessionStorage.getItem('activateEdit') == 'true' &&
                                                    <td><input ref={(ref) => {this.email = ref}} type={'email'} class="form-control " placeholder={user.email}/></td>}

                                                    {sessionStorage.getItem('activateEdit') == 'false' &&
                                                    <td>{user.email}</td>}
                                                </tr>
                                                <tr>
                                                    <th scope="row">Phone</th>
                                                    {sessionStorage.getItem('activateEdit') == 'true' &&
                                                    <td><input ref={(ref) => {this.tel = ref}} type={'tel'} class="form-control " placeholder={user.tel}/></td>}
                                                    {sessionStorage.getItem('activateEdit') == 'false' &&
                                                    <td>{user.tel}</td>}
                                                </tr>
                                                <tr>
                                                    <th scope="row">Role</th>
                                                    {sessionStorage.getItem('activateEdit') == 'true' && JSON.parse(sessionStorage.getItem('session')).user.role=='admin' &&
                                                    <td>
                                                        <select ref={(ref) => {this.role = ref}} className="form-control" id="exampleFormControlSelect1" >
                                                            <option>admin</option>
                                                        <option>teacher</option>
                                                        <option>student</option>
                                                    </select></td>}
                                                </tr>

                                                {sessionStorage.getItem('activateEdit') == 'true' &&
                                                <tr>
                                                    <th scope="row">Altes Password</th>
                                                    <td>
                                                        <input ref={(ref) => {this.password_old = ref}}type={'password'} className={'form-control'}/>
                                                    </td>
                                                </tr>
                                                }
                                                {sessionStorage.getItem('activateEdit') == 'true' &&
                                                <tr>
                                                    <th scope="row">Neues Password</th>
                                                    <td>
                                                        <input ref={(ref) => {this.password_new = ref}}type={'password'} className={'form-control'}/>
                                                    </td>
                                                </tr>
                                                }
                                                {sessionStorage.getItem('activateEdit') == 'true' &&
                                                <tr>

                                                    <input type={'submit'} className={'btn mr-2'} />
                                                    <input type={'reset'} className={'btn '}/>

                                                </tr>
                                                }



                                                    </div>
                                        )}

                                        </tbody>

                                    </table>
                                </div>
                                </form>

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
import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import user from '../components/Navbar'
import {NavLink} from "react-router-dom";

class User extends Component {
    state = {users: []}


    constructor(props){
        super(props);
        this.deleteUser = this.deleteUser.bind(this);

    }


    componentWillMount() {
        fetch('/users')
            .then(res => res.json())
            .then(users => this.setState({ users }));
    }

    deleteUser(user_id){
        return event => {
            event.preventDefault();
            fetch('/users/deleteUser', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "_id": user_id,
                })
            }).then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Something went wrong with your fetch');
                }
            }).then((json) => {
                console.log(json)
                if(json.status==200)
                window.location.reload(false);
                else ""
            })
        }
    };

    render() {
        return (

            <div className="App">
                <Navbar act={['','active','']}/>
                <div className={"content"}>
                <Header />

                <main className={'bg-light container-fluid'}>
                    <div className={'row'}>
                        <div className={'col-sm-11 ml-auto mr-auto'}>

                                <div>
                            <h1> Users </h1>
                                <div className="table-responsive">
                                <table className="table table-bordered">
                                <thead className={""}>
                                <tr>
                                <th scope="col">#id</th>
                                <th scope="col">username</th>
                                <th scope="col">firstname</th>
                                <th scope="col">lastname</th>
                                <th scope="col">email</th>
                                <th scope="col">phone</th>
                                <th scope="col">role</th>
                                </tr>
                                </thead>

                                <tbody>
                                {this.state.users.map(user =>


                                    <tr>
                                        <th scope="row">{user._id}</th>
                                        <td>{user.username}</td>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.tel}</td>
                                        <td>{user.role}</td>
                                        <td><NavLink exact to={"/users/"+user._id}> <button type={'button'} className="btn btn-light border rounded-circle text-center">
                                            <i className="fas fa-id-card"></i>

                                        </button></NavLink></td>
                                        <td><form onSubmit={this.deleteUser(user._id)}>
                                            <button type={'submit'} className="btn btn-light border rounded-circle text-center"><i className="fas fa-user-times"></i></button>
                                        </form></td>
                                    </tr>

                                )}

                                </tbody>

                                </table>
                                </div>
                                </div>
                                {/*:*/}
                                {/*<div>*/}
                                    {/*Not Allow*/}
                                {/*</div>*/}
                            {/*}*/}


                        </div>

                    </div>

                </main>

                <Footer/>
                </div>

            </div>

        );
    }
}

export default User;
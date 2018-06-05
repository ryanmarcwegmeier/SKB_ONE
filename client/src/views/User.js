import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';
import {Link} from "react-router-dom";
import NotAllow from "./NotAllow";

/** Class representing User View. */
class User extends Component {
    state = {users: []}

    /**
     *constructor
     * @param props
     */
    constructor(props){
        super(props);
        this.deleteUser = this.deleteUser.bind(this);

    }

    /**
     * fetch all users from DB
     */
    componentWillMount() {
        fetch('/users')
            .then(res => res.json())
            .then(users => this.setState({ users }));
    }

    /**
     * Deletes User by user_id. If successed refresh Window else throw excception
     * @param {string} user_id - UserId
     */
    deleteUser(user_name){
        return event => {
            event.preventDefault();
            fetch(('/users/'+user_name), {
                method: 'delete',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "username": user_name,
                })
            }).then((res) => {
                if (res.ok) {
                    window.location.reload(false);
                } else {
                    throw new Error('Something went wrong with your fetch');
                }
            })
        }
    };

    render() {
        return (

            <div className="App">
                <div className={"content"}>
                <Header />

                <main className={'bg-light container-fluid'}>
                    {(this.props.isAdmin)?

                    <div className={'row'}>
                        <div className={'col-sm-11 ml-auto mr-auto'}>

                            <div>
                                <h1> Users </h1>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped">
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
                                                <td><Link to={"/users/" + user.username}>
                                                    <button type={'button'}
                                                            className="btn btn-light border rounded-circle text-center">
                                                        <i className="fas fa-id-card"></i>

                                                    </button>
                                                </Link></td>
                                                <td>
                                                    <form onSubmit={this.deleteUser(user.username)}>
                                                        <button type={'submit'}
                                                                className="btn btn-light border rounded-circle text-center">
                                                            <i className="fas fa-user-times"></i></button>
                                                    </form>
                                                </td>
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
                    :<NotAllow/>}

                </main>

                <Footer/>
                </div>

            </div>

        );
    }
}

export default User;
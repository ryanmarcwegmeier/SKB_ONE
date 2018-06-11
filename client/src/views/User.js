import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';
import {Link} from "react-router-dom";
import NotAllow from "./NotAllow";
import Zoom from 'react-reveal/Zoom';


/** Class representing User View. */
class User extends Component {

    /**
     *constructor
     * @param props
     */
    constructor(props){
        super(props);
        this.deleteUser = this.deleteUser.bind(this);
        this.state = {
            isFetching:true,
            users: []
        }

    }

    /**
     * fetch all users from DB
     */
    componentDidMount() {
        sessionStorage.clear()
        fetch('/users')
            .then(res => res.json())
            .then(users => {this.setState({ users });this.setState({isFetching:false})});
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
                <Header text={"Users"} />

                <main className={'container-fluid'}>
                    {(this.props.isAdmin)?

                    <div className={'row'}>
                        <div className={'col-sm-11 ml-auto mr-auto bg-light shadow rounded m-3'}>

                            <div>
                                {(this.state.isFetching)?
                                    <div className={'text-center p-4'}>
                                <i className="fa fa-spinner fa-spin" style={{fontSize: "5vw"}}></i>
                                    </div>:
                                    <Zoom>
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th scope="col">#id</th>
                                                <th scope="col">username</th>
                                                <th scope="col">email</th>
                                                <th scope="col">role</th>
                                                <th scope="col"/>
                                                <th scope="col"/>

                                            </tr>
                                            </thead>

                                            <tbody>
                                            {this.state.users.map(user =>
                                                <Zoom>
                                                <tr>
                                                    <th scope="row">{user._id}</th>
                                                    <td>{user.username}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.role}</td>
                                                    <td><Link to={"/users/" + user.username}>
                                                        <button type={'button'}
                                                                className="border-0 btn btn-outline-dark border rounded-circle text-center">
                                                            <i className="fas fa-id-card"></i>

                                                        </button>
                                                    </Link></td>
                                                    <td>
                                                        <form onSubmit={()=>{ if (window.confirm('Are you sure you wish to delete this item?')) this.deleteUser(user.username) } }>
                                                            <button type={'submit'}
                                                                    className="border-0 btn btn-outline-dark border rounded-circle text-center">
                                                                <i className="fas fa-user-times"></i></button>
                                                        </form>
                                                    </td>
                                                </tr>
                                                </Zoom>
                                            )}

                                            </tbody>

                                        </table>
                                    </div>
                                    </Zoom>
                                }

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
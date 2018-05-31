import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import user from '../components/Navbar'

class User extends Component {
    state = {users: []}

    componentDidMount() {
        fetch('/users')
            .then(res => res.json())
            .then(users => this.setState({ users }));
    }

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
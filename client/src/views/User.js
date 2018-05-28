import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


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
                            <h1>Users</h1>
                            {this.state.users.map(user =>
                                <div key={user._id}>{user.name}</div>
                            )}

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
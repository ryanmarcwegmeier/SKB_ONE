import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';


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
                <Header act={['','active','']}/>
                <main className={'bg-light container-fluid'} style={{zIndex:100, position:'relative'}}>
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

        );
    }
}

export default User;
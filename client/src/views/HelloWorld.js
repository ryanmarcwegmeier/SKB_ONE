import React, { Component } from 'react';
import Footer from '../components/Footer'
import Header from "../components/Header";
import Navbar from "../components/Navbar"

class HelloWorld extends Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Submit some data
    handleSubmit(event){
        alert(this.firstName.value)
        event.preventDefault();
        fetch('/login', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ "first_name": this.firstName.value })
        }).then((res) => {
            if (res.ok){
                return res.json();
            } else {
                throw new Error ('Something went wrong with your fetch');
            }
        }).then((json) => {
            console.log(json);
        })
    };

    render () {
        return (
                <div id="signup">
                    <form onSubmit={this.handleSubmit}>
                        <input ref={(ref) => {this.username = ref}} placeholder="First Name" type="text" name="first_name"/><br />
                        <input ref={(ref) => {this.password = ref}} placeholder="Last Name" type="text" name="last_name"/><br />
                        <button type="Submit">Start</button>
                    </form>
                </div>
        )
    }


}

export default HelloWorld;
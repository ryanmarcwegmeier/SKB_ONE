import React, { Component } from 'react';
import Footer from '../components/Footer'
import Header from "../components/Header";

class Contact extends Component {
    constructor(props){
        super(props);
        this.sendContact = this.sendContact.bind(this);

    }

    sendContact(event){
        event.preventDefault();
        fetch('/contact', {
            credentials: 'include',
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "re": this.re.value,
                "message":this.message.value,
                "email":this.email.value
            })
        }).then((res) => {
            if (res.ok){
                return window.location.reload()
            } else {
                this.render=()=><h1>failed</h1>
            }
        })
    };



    render () {
        return (
            <div className="App">
                <div className={"content"}>
                    <Header text={'Contact'}/>
                    <main className={'container-fluid'}>
                        <div className={'row'}>
                            <div className={'col-md-7 '}>
                                <form onSubmit={this.sendContact} className={'p-3  bg-light rounded shadow m-3'}>
                                    <div className="form-group row">
                                        <label htmlFor="re" className="col-sm-2 col-form-label">Re:</label>
                                        <div className="col-sm-10">
                                            <input ref={(ref) => {this.re = ref}} type="text"  className="form-control"
                                                   id="re" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="message"
                                               className="col-sm-2 col-form-label">Message:</label>
                                        <div className="col-sm-10">
                                            <textarea ref={(ref) => {this.message = ref}} className="form-control" id="message"
                                                      rows="5"></textarea>

                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="mail" className="col-sm-2 col-form-label">E-mail:</label>
                                        <div className="col-sm-10">
                                            <input ref={(ref) => {this.email = ref}} type="email"  className="form-control"
                                                   id="mail" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="send" className="col-sm-2 col-form-label"></label>
                                        <div className="col-sm-10">
                                            <input type="submit"  className="btn btn-outline-info"
                                                   id="send" value={"Send"}/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className={'col-md-5'}>
                                <div className={'iframe rounded shadow m-3'}>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.2598257902737!2d13.322590365558451!3d52.51063677981245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a85102cc3b2f11%3A0xe95718d3b12a0a56!2sEugene-P.-Wigner-Geb%C3%A4ude%2C+Hardenbergstra%C3%9Fe+36%2C+10623+Berlin!5e0!3m2!1sde!2sde!4v1528309284555"
                                        width="100%" height="300" frameBorder="0"
                                        allowFullScreen></iframe>
                                </div>

                            </div>

                        </div>

                    </main>

                    <Footer/>
                </div>

            </div>
        )
    }


}

export default Contact;
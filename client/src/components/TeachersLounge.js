import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';
import axios from 'axios';

/**
 * represents Dashboard view
 */
class teachersLounge extends Component {
    
    constructor(props) {
        super(props);
        console.log("view: teachersLounge");

        this.getMessages = this.getMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        this.state = {
            messages : []
        }
    }
    
    /*
    */
    getMessages() {        
        console.log("component/teachersLounge/getMessages()");
        // hardcoded slack ID of channel #teachersLounge
        axios.get('/messages/course/CBCKHCPS8')
            .then((res) => this.setState({ messages : res.data }))
            .catch((err) => console.log(err));
        console.log(this.state.messages);
    }

    /**/
    sendMessage(event) {
        event.preventDefault();
        console.log("component/teachersLounge/sendMessage()");
        axios.post('/messages/', {
            timestamp : Date.now(),
            courseID : "",
            courseSlackID : "CBCKHCPS8",
            userName : this.props.user.username,
            userID : this.props.user.userID,
            userSlackID : this.props.user.userSlackID,
            message : this.message.value,
            attachment : ""
        })
            .then((res) => { 
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    /**/
    componentDidMount() {
        this.getMessages();
    }

    /**
     * renders Dashboard of User
     * @return {*}
     */
    render() {
        return (
            <div className="App">
                <div className={"content"}>
                    
                    <Header text={"TeachersLounge"}/>
                    
                    
                    <div className="list-group">

                        {/* post new message */}
                        <form onSubmit = {this.sendMessage} className={'p-3  bg-light rounded shadow m-3'}>                
                            <div className="form-group row">
                                <label htmlFor="message" className="col-sm-2 col-form-label">Message: </label>
                                <div className="col-sm-10">
                                    <textarea required={true} ref={(ref) => {this.message = ref}} className="form-control" id="message" rows="5"></textarea>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="send" className="col-sm-2 col-form-label"></label>
                                <div className="col-sm-10">
                                    <input type="submit" className="btn btn-outline-info" id="send" value={"Send"}/>
                                </div>
                            </div>
                        </form>

                        {/* list all messages */}
                        {this.state.messages.map(
                            (msg, i) =>
                            <a className="list-group-item list-group-item-action flex-column align-items-start" key={i}>
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{msg.userSlackID || "unknown user"}</h5>
                                    <small className="text-muted">{msg.timestamp}</small>
                                </div>
                                <p className="mb-1">{msg.message}</p>
                                {/*<small class="text-muted">Donec id elit non mi porta.</small>*/}
                            </a>                    
                        )}
                    </div>

                    <Footer/>

                </div>
            </div>
        );
    }
}

export default teachersLounge;
import React, { Component } from "react";
import {
    Route,
    NavLink,
    Redirect,
    BrowserRouter
} from "react-router-dom";
import Home from "../views/Home";
import Contact from "../views/Contact";
import Register from "./Register";
import Courses from "../views/Courses";
import User from "../views/User";
import SingleUser from "../views/SingleUser";
import Impressum from "../views/Impressum";
import Dashboard from "../views/Dashboard";
import CourseLang from "../views/CoursesLang";
import CoursesAdd from "../views/CoursesAdd";
import CoursesDetail from "./CourseDetail";
import axios from 'axios';
import Footer from './Footer';
class Main extends Component {


    constructor(props){
        super(props)
        this.state={
            isFetching:true,
            user:{role:'guest', apikey:''},
        }
        this.changeUser=this.changeUser.bind(this)
        axios.defaults.headers.common['apikey'] = this.state.user.apikey;
        if(this.getCookie('apikey')!='' && this.getCookie('apikey')!=undefined&& this.getCookie('apikey')!=null){
            axios.defaults.headers.common['apikey'] =  this.getCookie('apikey')
        }

    }

    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }


    changeUser(user){
        this.setState({user:user})
    }

    componentWillMount() {
        if(this.state.user.role=='guest'){
        if((this.getCookie('apikey')==null || this.getCookie('apikey')=='' || this.getCookie('apikey')== undefined)){
            this.setState({isFetching:false})
        }else{
            axios.get('/users/api/apikey')
                .then((res)=>{
                    const user = res.data;
                    this.setState({ user });
                    this.setState({isFetching:false})
                })
        }
    }}

    render() {

        return (
            <BrowserRouter>
                {(!this.state.isFetching)
                &&

                <div>
                    <nav id={'navbar'} className="shadow-lg navbar navbar-expand-lg navbar-dark container-fluid sticky-top" style={{background:'#1B566F'}}>
                        <a href={"/index"} >
                            <i className={'navbar-brand'}>SKB</i>
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto ml-auto h5" >
                                <li className={"nav-item "}>
                                    <NavLink exact to="/index">
                                        <span className={"nav-link "}>
                                            Home
                                        </span>
                                    </NavLink>
                                </li>
                                <li className={"nav-item "}>
                                    <NavLink to="/courses">
                                        <span className="nav-link" >
                                            Courses
                                        </span>
                                    </NavLink>
                                </li>

                                {this.state.user.role =='admin' &&
                                <li className={"nav-item "}>
                                    <NavLink to="/users">
                                        <span className="nav-link" >
                                            Users
                                        </span>
                                    </NavLink>
                                </li>
                                }

                                <li className={"nav-item "}>
                                    <NavLink exact to="/contact">
                                        <span className="nav-link" >
                                            Contact
                                        </span>
                                    </NavLink>
                                </li>

                                <li className={"nav-item "}>
                                    <NavLink exact to="/impressum">
                                        <span className="nav-link" >
                                            Impressum
                                        </span>
                                    </NavLink>
                                </li>
                            </ul>
                            <div className={"registerTop"}>
                                <Register changeUser={this.changeUser} isLogged={(this.state.user.role!='guest')?true:false} user={this.state.user}/>
                            </div>
                        </div>


                    </nav>
                    <div className="main">
                        <Route exact path="/" render={(props)=><Redirect to='/index' />}/>
                        {(this.state.user.role=='guest')?
                            <Route path="/index" component={Home}/>
                            :
                            <Route path="/index" render={(props)=><Dashboard user={this.state.user} {...props}/>}/>
                        }
                        <Route exact path="/courses"  render={(props)=><CourseLang user={this.state.user} {...props}/>}/>
                        <Route exact path="/courses/:id"  render={(props)=><CoursesDetail user={this.state.user} {...props}/>}/>
                        <Route exact path="/contact" render={(props)=><Contact user={this.state.user} {...props}/>}/>
                        <Route exact path="/courses/add/form" render={(props)=><CoursesAdd user={this.state.user} {...props}/>}/>
                        <Route exact path="/courses/:lang/view" render={(props)=><Courses user={this.state.user} {...props}/>}/>
                        <Route exact path="/impressum" component={Impressum}/>
                        <Route exact path="/users" render={()=><User user={this.state.user}/>} />
                        <Route exact path="/users/:username" render={(props)=><SingleUser user={this.state.user} {...props}/>}/>

                    </div>
                    <Footer/>

                </div>
                }
            </BrowserRouter>
        );
    }
}

export default Main;
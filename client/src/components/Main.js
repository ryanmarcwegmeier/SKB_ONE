import React, { Component } from "react";
import {
    Route,
    NavLink,
    Redirect,
    BrowserRouter
} from "react-router-dom";
import logo from '../img/logo3.jpg';
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
class Main extends Component {


    constructor(props){
        super(props)
        this.state={
            user:{}
        }
    }

    componentWillMount() {
        fetch('/sessions', {
            credentials: 'include',
            method: 'get',
            headers: {'Content-Type':'application/json'}
        }).then((res) => {
            if (res.ok){
                return res.json();
            } else {
                return false;
            }
        }).then((json) => {
            this.setState((state) => ({user:json}))



        })
    }

    render() {

        return (
            <BrowserRouter>
                <div>
                    <nav id={"nav-top"} className="shadow-lg navbar navbar-expand-lg navbar-dark container-fluid " style={{background:'#1B566F'}}>
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

                                {this.state.user!=false && this.state.user.role =='admin' &&
                                <li className={"nav-item "}>
                                    <NavLink exact to="/users">
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
                                <Register isLogged={(this.state.user!=false)?true:false} username={(this.state.user!=false)?this.state.user.username:null}/>
                            </div>
                        </div>


                    </nav>
                    <div className="">
                        <Route exact path="/" render={(props)=><Redirect to='/index' />}/>
                        {(!this.state.user)?
                            <Route path="/index" component={Home}/>
                            :
                            <Route path="/index" component={Dashboard}/>
                        }
                        <Route exact path="/courses" component={CourseLang}/>
                        <Route exact path="/courses/:id" component={CoursesDetail}/>
                        <Route exact path="/contact" component={Contact}/>
                        <Route exact path="/courses/:lang/add" component={CoursesAdd}/>
                        <Route exact path="/courses/:lang/view" render={(props)=><Courses loggedUser={(!this.state.user)?{role:'guest'}:this.state.user} {...props}/>}/>
                        <Route exact path="/impressum" component={Impressum}/>
                        <Route exact path="/users" render={()=><User isAdmin={(this.state.user.role=='admin')?true:false}/>} />
                        <Route exact path="/users/:username" render={(props)=><SingleUser loggedUser={(!this.state.user)?null:this.state.user} {...props}/>}/>

                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default Main;
import React, {Component} from 'react';
import { configureAnchors } from 'react-scrollable-anchor'
import { goToTop ,goToAnchor  } from 'react-scrollable-anchor'
import { removeHash } from 'react-scrollable-anchor'

// clear URL hash
// scroll to #section1 without saving that hash update in history
// goToAnchor('section1')
// goToAnchor('section1', false)

// scroll to #section1, saving that hash update in history
// goToAnchor('section1', true)

// scroll to top of the page

class CourseNav extends Component {

    constructor(){
        super()
        this.handleA1=this.handleA1.bind(this)
        configureAnchors({offset: 1000000000000000000000, scrollDuration: 200})
        this.state={
            offset:271
        }
    }

    onchange() {
        if (document.getElementById('courseNav').offsetTop > 271) {
            document.getElementById('courseNav').style.top = '51px'
        }
    }
    

    handleA1(id){
        alert(id)
        goToAnchor(id,false)
    }

    componentDidMount(){
        window.addEventListener("scroll", this.onchange);
        this.onchange()
    }


    render() {
        return (
                <nav id={'courseNav'} className="navbar navbar-expand-sm navbar-light bg-light sticky-top shadow-sm" >

                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#course-navigation" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="course-navigation">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" onClick={this.handleA1.bind(this,'course-overview')} >Overview</a>
                            </li>
                            <li className="nav-item" >
                                <a className="nav-link" onClick={this.handleA1.bind(this,'course-content')}>Course Content</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={this.handleA1.bind(this,'course-forum')}> Announcements</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={this.handleA1.bind(this,'course-faqs')} >FAQs</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={this.handleA1.bind(this,'course-instructors')}>Instructors</a>
                            </li>
                        </ul>
                    </div>
                </nav>
        )
    }

}

export default CourseNav;

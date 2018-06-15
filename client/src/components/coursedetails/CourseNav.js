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
    }
    handleA1(){
        goToAnchor('course-instructors')
}


    render() {
        return (
                <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
                    <div className="collapse navbar-collapse" id="course-navigation">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" >Overview</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" >Course Content</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" >Announcements</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" >FAQs</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={this.handleA1}>Instructors</a>
                            </li>
                        </ul>
                    </div>
                </nav>
        )
    }

}

export default CourseNav;

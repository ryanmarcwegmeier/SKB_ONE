import React, {Component} from 'react';
import { configureAnchors } from 'react-scrollable-anchor'
import { goToTop } from 'react-scrollable-anchor'
import { goToAnchor } from 'react-scrollable-anchor'
import { removeHash } from 'react-scrollable-anchor'

// clear URL hash
removeHash()

// scroll to #section1 without saving that hash update in history
// goToAnchor('section1')
// goToAnchor('section1', false)

// scroll to #section1, saving that hash update in history
// goToAnchor('section1', true)

// scroll to top of the page
goToTop()
configureAnchors({offset: '-100%', scrollDuration: 200})


class CourseNav extends Component {

    render() {
        return (
                <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
                    <div class="collapse navbar-collapse" id="course-navigation">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="#course-overview">Overview</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#course-content">Course Content</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#course-forum">Announcements</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#course-faqs">FAQs</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#course-instructors">Instructors</a>
                            </li>
                        </ul>
                    </div>
                </nav>
        )
    }

}

export default CourseNav;

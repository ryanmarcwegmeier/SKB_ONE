import React, {Component} from 'react';

class CourseNav extends Component {

    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top ">
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
        </nav>);
    }

}

export default CourseNav;

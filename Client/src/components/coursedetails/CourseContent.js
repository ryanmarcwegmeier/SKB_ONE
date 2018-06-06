import React, {Component} from 'react';

class CourseContent extends Component {
    render() {
        return (<div id="course-content" class="col-md-12 course-detail">

            <h1>Course Content and Documents</h1>

            <ul class="timeline">
                <div class="text-center">
                    <a href="#" class="btn btn-info">
                        Recent Upload
                        <span>
                            <i class="far fa-calendar"></i>
                        </span>
                    </a>

                </div>


                <li>
                    <div class="direction-l">
                        <div class="flag-wrapper">
                            <span class="hexa">
                                <i class="far fa-dot-circle"></i>
                            </span>
                            <span class="flag">Lorem ipsum.</span>
                            <span class="time-wrapper">
                                <span class="time">Feb 2015</span>
                            </span>
                        </div>
                        <div class="desc">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.
                        </div>
                    </div>

                    <div class="direction-l sub-section-l">
                        <div class="flag-wrapper">
                            <span class="hexa">
                                <i class="fas fa-file-alt"></i>
                            </span>
                            <span class="flag">Lorem ipsum.</span>
                            <span class="time-wrapper">
                                <span class="time">Feb 2015</span>
                            </span>
                        </div>
                        <div class="desc">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.
                        </div>
                    </div>

                </li>

                <li>
                    <div class="direction-r">
                        <div class="flag-wrapper">
                            <span class="hexa">
                                <i class="far fa-dot-circle"></i>
                            </span>
                            <span class="flag">Bacon ipsum anim.</span>
                            <span class="time-wrapper">
                                <span class="time">Dec 2014</span>
                            </span>
                        </div>

                        <div class="desc">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>

                    </div>

                    <div class="direction-r sub-section-r">
                        <div class="flag-wrapper">
                            <span class="hexa">
                                <i class="fas fa-book-open"></i>
                            </span>
                            <span class="flag">Bacon ipsum anim.</span>
                            <span class="time-wrapper">
                                <span class="time">Dec 2014</span>
                            </span>
                        </div>

                        <div class="desc">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>

                    </div>

                </li>
            </ul>
        </div>

        );
    }
}

export default CourseContent;

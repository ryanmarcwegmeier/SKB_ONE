import React, {Component} from 'react';

class Overview extends Component {
    render () {
        return (
            <div id="course-overview" class="col-md-12 course-detail">
                <h1>Recent Activity</h1>
                <div class="row">
                    <div class="col-md-6 overview-detail">
                        <ul class="list-group overview-list">
                            <li class="list-group-item">Recent Upload</li>
                            <li class="list-group-item">Dapibus ac facilisis in</li>
                            <li class="list-group-item">Morbi leo risus</li>
                            <li class="list-group-item">Porta ac consectetur ac</li>
                            <li class="list-group-item">Vestibulum at eros</li>
                            <li class="list-group-item">Browse all uploads</li>
                        </ul>
                    </div>
                    <div class="col-md-6 overview-detail">
                        <ul class="list-group overview-list">
                            <li class="list-group-item">Recent Announcement</li>
                            <li class="list-group-item">Dapibus ac facilisis in</li>
                            <li class="list-group-item">Morbi leo risus</li>
                            <li class="list-group-item">Porta ac consectetur ac</li>
                            <li class="list-group-item">Vestibulum at eros</li>
                            <li class="list-group-item">Browse all announcements</li>
                        </ul>
                    </div>
                </div>
            </div>

        );
    }
}

export default Overview;

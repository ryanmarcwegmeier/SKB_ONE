import React, {Component} from 'react';

class Overview extends Component {
    render () {
        return (
            <div className="col-md-12 course-detail">
                <h1>Recent Activity</h1>
                <div className="row">
                    <div className="col-md-6 overview-detail">
                        <ul className="list-group overview-list">
                            <li className="list-group-item">Recent Upload</li>
                            <li className="list-group-item">Dapibus ac facilisis in</li>
                            <li className="list-group-item">Morbi leo risus</li>
                            <li className="list-group-item">Porta ac consectetur ac</li>
                            <li className="list-group-item">Vestibulum at eros</li>
                            <li className="list-group-item">Browse all uploads</li>
                        </ul>
                    </div>
                    <div className="col-md-6 overview-detail">
                        <ul className="list-group overview-list">
                            <li className="list-group-item">Recent Announcement</li>
                            <li className="list-group-item">Dapibus ac facilisis in</li>
                            <li className="list-group-item">Morbi leo risus</li>
                            <li className="list-group-item">Porta ac consectetur ac</li>
                            <li className="list-group-item">Vestibulum at eros</li>
                            <li className="list-group-item">Browse all announcements</li>
                        </ul>
                    </div>
                </div>
            </div>

        );
    }
}

export default Overview;

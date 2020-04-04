import React, { Component } from "react";
import "./viewerCard.css";

class ViewerCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="viewer-card">
                <div className="card-top">
                    <div className="card-top-child border-right card-flag">
                    </div>
                    <div className="card-top-child border-right card-name">
                        Hicures
                    </div>
                    <div className="card-followdays card-top-child">
                        17 days NEW!
                    </div>
                </div>
                <div className="card-content">

                </div>
            </div>
        )
    }
}

export default ViewerCard;

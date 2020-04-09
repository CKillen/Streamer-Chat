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
            console.log(this.props.viewerInfo);

        return (
            
            <div className="viewer-card">
                <div className="card-top">
                    <div className="card-top-child border-right card-flag">
                        <div className={"card-top-flag flag-icon flag-icon-" + this.props.viewerInfo.country}></div>
                    </div>
                    <div className="card-top-child border-right card-name">
                        <h4>{this.props.viewerInfo.name}</h4>
                    </div>
                    <div className="card-followdays card-top-child">
                        <p>{this.props.viewerInfo.followedDays}</p>
                    </div>
                </div>
                <div className="card-content-wrapper">
                    <div className="card-content-top card-content">
                        <p className="card-content-text">
                            {this.props.viewerInfo.info[0]}
                        </p>
                    </div> 
                    <div className="card-content-middle card-content">
                        <p className="card-content-text">
                            {this.props.viewerInfo.info[1]}
                        </p>
                    </div>
                    <div className="card-content-bottom card-content">
                        <p className="card-content-text"> 
                            {this.props.viewerInfo.info[2]}
                        </p>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewerCard;

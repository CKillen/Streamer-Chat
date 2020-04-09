import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Chat from './components/Chat'
import "./main.css";
import ViewerCard from "./components/ViewerCard"
import axios from "axios"

class App extends Component {
    constructor(props) {
        super(props);
        this.viewerHandler = this.viewerHandler.bind(this);
        this.state = {
            activeViewers: [],
        };
    }

    viewerHandler(newViewer) {
        //Axios call with 
        //current Users token
        //viewer name to be grabbed from the db
        let viewerObj = {
            name: newViewer,
            country: "us",
            info : [
                "Loves his dog named Penelope a lot a lot",
                "Got Valorant key, likes it League and CSGO",
                "Really wants another dog so Penelope has someone to play with"
            ],
            followedDays: 23
        }
        let newStateArray = this.state.activeViewers;
        newStateArray.push(viewerObj);
        this.setState({ activeViewers: newStateArray });
    }

    render() {
        let viewers = [];
        for(let i = 0; i < this.state.activeViewers.length; i++){
            viewers.push(<ViewerCard viewerInfo={this.state.activeViewers[i]}/>)
        }

        return (
            <div className="App">
                <div className="main-page">
                    <Chat viewerHandler={this.viewerHandler}/>
                    <div className="viewer-card-panel">
                        {viewers}
                    </div>
                </div>
            </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

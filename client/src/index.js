import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Chat from './components/Chat'
import "./main.css";
import ViewerCard from "./components/ViewerCard"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let viewers = [];
        for(let i = 0; i < 10; i++) {
            viewers.push(<div><ViewerCard /></div>);
        }

        return (
            <div className="App">
                <div className="main-page">
                    <Chat />
                    <div className="viewer-card-panel">
                        {viewers}
                    </div>
                </div>
            </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

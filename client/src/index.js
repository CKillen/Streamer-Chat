import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Chat from './components/Chat'
import "./main.css";
<<<<<<< HEAD
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
=======

class App extends Component {
  render() {
    return (
      <div className="App">
        <Chat />
      </div>
>>>>>>> 2af8af657a41031cd27b9e5212e85b1953db85ea
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

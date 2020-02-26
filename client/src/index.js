import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Chat from './components/Chat'
import "./main.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Chat />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

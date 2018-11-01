import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null
    };
    this.fetch = this.fetch.bind(this);
  }

  fetch() {
    fetch("http://localhost:3000/stuff")
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({ response: myJson.response });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <button onClick={this.fetch}>Fetch</button>
          {this.state.response ? (
            <div>Response from server: {this.state.response}</div>
          ) : (
            <div>No response yet</div>
          )}
        </div>
      </div>
    );
  }
}

export default App;

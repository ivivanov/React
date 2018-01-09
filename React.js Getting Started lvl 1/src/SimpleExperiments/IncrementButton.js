import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { counter: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter = function (incrementorVal) {
    this.setState(function (prevState) {
      return {
        counter: prevState.counter + incrementorVal
      };
    });
  }

  render() {
    return (
      <div>
        <IncrementBtn incrementorVal={1} onClickFunction={this.incrementCounter} />
        <IncrementBtn incrementorVal={3} onClickFunction={this.incrementCounter} />
        <IncrementBtn incrementorVal={5} onClickFunction={this.incrementCounter} />
        <ResultTb counter={this.state.counter}/>
      </div>
    );
  }
}

class IncrementBtn extends Component {
  constructor(props){
    super(props);

    this.onClickHandler = this.onClickHandler.bind(this);
  }


  onClickHandler = function(){
    this.props.onClickFunction(this.props.incrementorVal);
  }

  render() {
    return (
      <button onClick={this.onClickHandler}>
        +{this.props.incrementorVal}
      </button>
    );
  }
}

const ResultTb = function (props) {
  return (
    <span>{props.counter}</span>
  );
}

export default App;

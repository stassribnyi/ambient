import React, { Component } from 'react';

import store from '../Store';
import * as Actions from '../Actions';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 0
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(this.updateState);
  }

  componentDidUnmount() {
    this.unsubscribe();
  }

  handleDecrement = () => { 
      Actions.decrement();
  };

  handleIncrement = () => {
    Actions.increment();
  };

  render() {
    return (
      <div>
        <h1>{this.state.number}</h1>
        <button onClick={this.handleIncrement}>Increment</button>
        <button onClick={this.handleDecrement}>Decrement</button>
      </div>
    );
  }

  updateState = () =>  {      
      this.setState({
          number: store.getState()
      });
  }
}

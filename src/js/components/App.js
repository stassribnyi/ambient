import React, { Component } from 'react';

import store from '../Store';
import * as Actions from '../Actions';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      info: null
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(this.updateState);
  }

  componentDidUnmount() {
    this.unsubscribe();
  }

  handleSetRandomInfo = () => { 
      Actions.setRandomInfo();
  };

  handleSetRandomName = () => {
    Actions.setRandomName();
  };

  render() {
    return (
      <div>
        <h1>{this.state.user && this.state.user.name}</h1>
        <h1>{this.state.info && this.state.info.details}</h1>
        <button onClick={this.handleSetRandomName}>Set random name</button>
        <button onClick={this.handleSetRandomInfo}>Set random info</button>
      </div>
    );
  }

  updateState = () =>  {      
      this.setState({
          user: store.getState().user,
          info: store.getState().info,
      });
  }
}

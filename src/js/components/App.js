import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setRandomInfo, setRandomName } from '../actions';

@connect(store => {
  return {
    user: store.user,
    info: store.info
  };
})
export default class App extends Component {
  handleSetRandomInfo = () => {
    this.props.dispatch(setRandomInfo());
  };

  handleSetRandomName = () => {
    this.props.dispatch(setRandomName());
  };

  render() {
    return (
      <div>
        <h1>{this.props.user && this.props.user.name}</h1>
        <h1>{this.props.info && this.props.info.details}</h1>
        <button onClick={this.handleSetRandomName}>Set random name</button>
        <button onClick={this.handleSetRandomInfo}>Set random info</button>
      </div>
    );
  }
}

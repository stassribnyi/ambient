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
    const randomName =
      (this.props.user && this.props.user.name) ||
      'The magic name will be here!';

    const randomInfo =
      (this.props.info && this.props.info.details) ||
      'The magic info will be here!';

    return (
      <div className="magic-container">
        <h1>Magic App (Redux)</h1>
        <div className="random-text-container">
          <span className="random-text">{randomName}</span>
          <span className="random-text">{randomInfo}</span>
        </div>
        <div className="btn-container">
          <button className="magic-btn" onClick={this.handleSetRandomName}>
            Get magic name
          </button>
          <button className="magic-btn" onClick={this.handleSetRandomInfo}>
            Get magic info
          </button>
        </div>
      </div>
    );
  }
}

import { createStore } from 'redux';
import ActionConstants from './ActionConstants';

const reducer = function(state, action) {
  switch (action.type) {
    case ActionConstants.INCREMENT:
      return state + 1;
    case ActionConstants.DECREMENT:
      return state - 1;
    default:
      return state;
  }
};


const store = createStore(reducer, 0);

export default store;
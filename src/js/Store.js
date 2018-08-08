import { combineReducers, createStore } from 'redux';
import ActionConstants from './ActionConstants';

const randomize = text => {
  return `${text}: ${new Date().getSeconds()}`;
};

const userReducer = function(state = {}, action) {
  switch (action.type) {
    case ActionConstants.SET_RANDOM_NAME:
      state = { ...state, name: randomize('My name is') };
      break;
    default:
      break;
  }

  return state;
};

const infoReducer = function(state = {}, action) {
  switch (action.type) {
    case ActionConstants.SET_RANDOM_INFO:
      state = { ...state, details: randomize('My info is') };
      break;
    default:
      break;
  }

  return state;
};

const reducers = combineReducers({
  user: userReducer,
  info: infoReducer
});

const store = createStore(reducers);

export default store;

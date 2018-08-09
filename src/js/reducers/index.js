import { combineReducers } from 'redux';

import userReducer from './userReducer';
import infoReducer from './infoReducer';

export default combineReducers({
  user: userReducer,
  info: infoReducer,
});

import actionConstants from '../actionConstants';
import randomize from './randomize';

export default (state = {}, action) => {
  switch (action.type) {
    case actionConstants.SET_RANDOM_INFO:
      return { ...state, details: randomize('My info is') };
    default:
      return state;
  }
}

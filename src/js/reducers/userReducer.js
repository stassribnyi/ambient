import actionConstants from '../actionConstants';
import randomize from './randomize';

export default (state = {}, action) => {
  switch (action.type) {
    case actionConstants.SET_RANDOM_NAME:
      return { ...state, name: randomize('My name is') };
    default:
      return state;
  }
}

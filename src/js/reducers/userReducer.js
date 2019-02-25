import actionConstants from '../actionConstants';
import { randomizeFirstName } from './randomize';

export default (state = {}, action) => {
  switch (action.type) {
    case actionConstants.SET_RANDOM_NAME:
      return { ...state, name: `My first name is: ${randomizeFirstName()}` };
    default:
      return state;
  }
};

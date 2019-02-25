import actionConstants from '../actionConstants';
import { randomizeLastName } from './randomize';

export default (state = {}, action) => {
  switch (action.type) {
    case actionConstants.SET_RANDOM_INFO:
      return {
        ...state,
        details: `My last name is: ${randomizeLastName()}`
      };
    default:
      return state;
  }
};

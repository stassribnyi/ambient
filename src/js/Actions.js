import actionConstants from './actionConstants';

export function setRandomName() {
  return {
    type: actionConstants.SET_RANDOM_NAME
  };
}

export function setRandomInfo() {
  return {
    type: actionConstants.SET_RANDOM_INFO
  };
}

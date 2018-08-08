
import store from './Store';
import ActionConstants from './ActionConstants';

export function setRandomName() {
    store.dispatch({type: ActionConstants.SET_RANDOM_NAME});
}

export function setRandomInfo() {
    store.dispatch({type: ActionConstants.SET_RANDOM_INFO});
}
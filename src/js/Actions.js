
import store from './Store';
import ActionConstants from './ActionConstants';

export function increment() {
    store.dispatch({type: ActionConstants.INCREMENT});
}

export function decrement() {
    store.dispatch({type: ActionConstants.DECREMENT});
}
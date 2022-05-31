import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducers from './reducers';

const rootReducer = combineReducers({userReducers});

export const Store = createStore(rootReducer, applyMiddleware(thunk));



import {createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import initialState from "./initialState";
import usersReducer from './usersReducer';
import adReducer from './adReducer';

const subreducers = {
	user: usersReducer,
	ad: adReducer
};

const reducer = combineReducers(subreducers);

const store = createStore(
	reducer,
	initialState,
	compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	),
	
);

export default store;
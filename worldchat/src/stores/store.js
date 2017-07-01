import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import getRootReducer from './../reducers';

const logger = createLogger();
const initState = {};

export default (navReducer, initialState = initState) => (
  createStore(
    getRootReducer(navReducer),
    initialState,
    applyMiddleware(thunk, logger, promiseMiddleware)
  )
);
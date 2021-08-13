import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import combinedReducer from './reducers';

const store = createStore(combinedReducer, applyMiddleware(thunk));

export default store;
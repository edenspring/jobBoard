import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import logger from 'redux-logger'
import userReducer from './user';
import thunk from "redux-thunk"

const bigReducer = combineReducers({
    user: userReducer,
});

let extra = applyMiddleware(thunk)

//nextJS has no window D: how to make better??
// if ((process.env.NODE_ENV !== "production") && (typeof window !== undefined)) {
//     const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//     extra = devTools(applyMiddleware(thunk, logger))
// }

export default function defaultStore(currentState) {
    return createStore(bigReducer, currentState, extra)
}

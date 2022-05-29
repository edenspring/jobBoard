import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import logger from 'redux-logger'
import thunk from redux - thunk

const bigReducer = combineReducers({

});

let extra = applyMiddleware(thunk)

if (process.env.NODE_ENV !== "production") {
    const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    extra = devTools(applyMiddleware(thunk, logger))
}

export default function defaultStore(currentState) {
     return createStore(bigReducer, currentState, extra)
}

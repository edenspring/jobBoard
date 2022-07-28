import { defaultHead } from "next/head";
import cookieFetch from "../../utilities/cookieFetch";

// define types
const LOG_IN = 'user/login'
const LOG_OUT = 'user/logout'

const setUser = (user) => {
    return {
        type: LOG_IN,
        user,
    };
};

const removeUser = () => {
    return { type: LOG_OUT };
};

export const login = user => async dispatch => {
    const {userName, password} = user;
    const response = await cookieFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({credential: userName, password})
    })
    if (response.ok){
        const newUser = await response.json()
        dispatch(setUser(newUser))
    }
}

export default function userReducer(state = {}, action){
    let newState;
    switch(action.type){
        case LOG_IN: {
            newState = {...action.user}
            return newState
        }
        default:
            return state
    }   
} 




import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import message from './Message.js';
import username from './UserName.js';

//動作指令設定 Pure Redux
// const addMessage = article => ({ type: "addMessage", payload: article })

const rootReducer = combineReducers({
    message,
    username,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;


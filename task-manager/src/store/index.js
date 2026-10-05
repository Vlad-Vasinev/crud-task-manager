import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import { combineReducers } from "redux";
import { ListReducer } from "./taskReducer";

import thunk from "redux-thunk";

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers( {
  list: ListReducer,
} )

const persistedReducer = persistReducer(persistConfig, reducer);
const composedEnhancer = composeWithDevTools(
  applyMiddleware(thunk)
);

export const store = createStore(persistedReducer, composedEnhancer);

export const persistor = persistStore(store);
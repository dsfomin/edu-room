import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {combineReducers} from "redux"; 
import thunk from 'redux-thunk'

const reducers = combineReducers({
    user: userReducer
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

const Persistor = persistStore(store);

export {Persistor}
export default store;
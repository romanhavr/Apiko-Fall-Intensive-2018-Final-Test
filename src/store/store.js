import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reduxThunk from 'redux-thunk';
import rootModule from '../modules/rootModule';

let store = null;

let initialState = {};

const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootModule);


try {
    const json = window.localStorage.getItem('redux');
    if (json) {
        initialState = JSON.parse(json);
    }
} catch(err) {
    console.warn('Cannot read or parse Initial State!')
}

    if (process.env.NODE_ENV === 'development') {
        store = createStore(
            persistedReducer,
            initialState,
            composeWithDevTools(applyMiddleware(reduxThunk))
            );
    } else {
        store = createStore(
            rootModule,
            initialState,
            composeWithDevTools(applyMiddleware(reduxThunk))
            );
    };

export const persistor = persistStore(store);

export default store;
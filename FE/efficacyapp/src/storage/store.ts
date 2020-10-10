import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers';

const middlewares = [thunk, logger];
const middlewareEnhancer = applyMiddleware(...middlewares);

const persistConfig = persistReducer({
  key: 'root',
  storage: AsyncStorage
}, rootReducer);

export const store = createStore(persistConfig, middlewareEnhancer);
export const persistor = persistStore(store);
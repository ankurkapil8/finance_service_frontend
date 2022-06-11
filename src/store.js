import { applyMiddleware, createStore } from 'redux';
import reducer from './reducer';
import { persistStore, persistReducer } from 'redux-persist';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import storage from 'redux-persist/lib/storage/session';
const persistConfig = {
  key: 'authType',
  storage: storage,
  whitelist: ['auth'] // which reducer want to store
};
const pReducer = persistReducer(persistConfig, reducer);
const getMiddleware = () => {
      return applyMiddleware( promiseMiddleware, localStorageMiddleware);
  };
const store = createStore(pReducer,composeWithDevTools(getMiddleware()));
const persistor = persistStore(store);
export { persistor, store };
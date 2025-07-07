import AsyncStorage from '@react-native-async-storage/async-storage';
import {Action, combineReducers, configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PersistConfig,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import {authReducer} from './auth/slice';
import {RootState} from './helpers';

export const rootReducer = combineReducers({
  auth: authReducer,
});

const appReducer = (state: RootState | undefined, action: Action): RootState => {
  // clear redux state
  if (action.type === 'reduxClear') return rootReducer(undefined, action);

  return rootReducer(state, action);
};

/// is used to store the data for auth and user reducer in AsyncStorage so that when we open the app a second time after we are logged we store the auth data
const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

/// logger middleware is used for debugging when he open chrome dev tools
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Optional: ignore specific state paths if needed
        // ignoredPaths: ['auth.token'],
      },
    }).concat(logger),
});

const persistedStore = persistStore(store);

export {store, persistedStore};

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import logger from 'redux-logger';
import { userAPI } from '../services/UserService';

const rootReducer = combineReducers({
  [userAPI.reducerPath]: userAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false })
        .concat(userAPI.middleware)
        .concat(logger),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispath = AppStore['dispatch'];

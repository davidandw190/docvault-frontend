import { combineReducers, configureStore } from '@reduxjs/toolkit';

import logger from 'redux-logger';
import { userAPI } from '../services/UserService';

/**
 * Combines all the reducers into a single root reducer.
 *
 * @constant
 * @type {ReturnType<typeof combineReducers>}
 */
const rootReducer = combineReducers({
  [userAPI.reducerPath]: userAPI.reducer,
});

/**
 * Configures and returns the Redux store with middleware and reducers.
 *
 * @returns {ReturnType<typeof configureStore>} Configured Redux store.
 */
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

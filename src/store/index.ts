import { persistStore } from 'redux-persist';

import { configureStore } from '@reduxjs/toolkit';

import { persistedReducer } from './pesrsist.config';

export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
